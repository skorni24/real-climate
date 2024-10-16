import React, { useState, useEffect } from "react";
import DailySummary from "./DailySummary";
import Alerts from "./Alerts";
import "./WeatherComponent.css";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
  const [isCelsius, setIsCelsius] = useState(true);
  const [dailySummaries, setDailySummaries] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showDailySummaries, setShowDailySummaries] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const temperatureThreshold = 35; // Example threshold
  const API_KEY = "f617fe3305b7e0b05adffd6009fa6479"; // Replace with your actual API key

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        const tempCelsius = data.main.temp - 273.15;
        const feelsLikeCelsius = data.main.feels_like - 273.15;
        const newWeatherData = {
          city: data.name,
          main: data.weather[0].main,
          temp: tempCelsius,
          feels_like: feelsLikeCelsius,
          timestamp: data.dt,
        };
        setWeatherData(newWeatherData);
        updateDailySummary(newWeatherData);
        checkAlertThreshold(newWeatherData);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const updateDailySummary = (newWeatherData) => {
    const date = new Date(newWeatherData.timestamp * 1000).toDateString();
    const existingSummary = dailySummaries.find(
      (summary) => summary.date === date
    );

    if (existingSummary) {
      existingSummary.temperatures.push(newWeatherData.temp);
      existingSummary.conditions.push(newWeatherData.main);
      existingSummary.maxTemp = Math.max(
        existingSummary.maxTemp,
        newWeatherData.temp
      );
      existingSummary.minTemp = Math.min(
        existingSummary.minTemp,
        newWeatherData.temp
      );
      existingSummary.avgTemp =
        existingSummary.temperatures.reduce((a, b) => a + b, 0) /
        existingSummary.temperatures.length;
      existingSummary.dominantCondition = getDominantCondition(
        existingSummary.conditions
      );
    } else {
      const newSummary = {
        date: date,
        temperatures: [newWeatherData.temp],
        conditions: [newWeatherData.main],
        maxTemp: newWeatherData.temp,
        minTemp: newWeatherData.temp,
        avgTemp: newWeatherData.temp,
        dominantCondition: newWeatherData.main,
      };
      setDailySummaries([...dailySummaries, newSummary]);
    }
  };

  const getDominantCondition = (conditions) => {
    const conditionCounts = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(conditionCounts).reduce((a, b) =>
      conditionCounts[a] > conditionCounts[b] ? a : b
    );
  };

  const checkAlertThreshold = (newWeatherData) => {
    if (newWeatherData.temp > temperatureThreshold) {
      setAlerts([
        ...alerts,
        `Alert: Temperature exceeded ${temperatureThreshold}°C`,
      ]);
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const displayTemperature = (temp) => {
    return isCelsius
      ? `${temp.toFixed(2)}°C`
      : `${celsiusToFahrenheit(temp).toFixed(2)}°F`;
  };

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Returns a CSS class name based on the given weather condition.
   * The classes are:
   * - "sunny" for clear and sunny conditions
   * - "cloudy" for cloudy conditions
   * - "rainy" for rainy conditions
   * - "snowy" for snowy conditions
   * - "stormy" for thunderstorm conditions
   * - "" for all other conditions
   * @param {string} main - The weather condition
   * @return {string} A CSS class name
   */
  /******  7979675a-eb0a-48b4-9294-0b2f7f07cc17  *******/
  const getWeatherClass = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
      case "sunny":
        return "sunny";
      case "clouds":
        return "cloudy";
      case "rain":
      case "drizzle":
        return "rainy";
      case "snow":
        return "snowy";
      case "thunderstorm":
        return "stormy";
      default:
        return "";
    }
  };

  return (
    <div
      className={`container ${
        weatherData ? getWeatherClass(weatherData.main) : ""
      }`}
    >
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter City Name:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.city}</h2>
          <p>Main: {weatherData.main}</p>
          <p>
            Temperature: {displayTemperature(weatherData.temp)}
            <button
              onClick={toggleTemperatureUnit}
              style={{ marginLeft: "10px", fontSize: "small" }}
            >
              Switch to {isCelsius ? "°F" : "°C"}
            </button>
          </p>
          <p>Feels Like: {displayTemperature(weatherData.feels_like)}</p>
          {/* <p>Timestamp (Unix): {weatherData.timestamp}</p> */}
          <p>Current Time (Unix): {currentTime}</p>
        </div>
      )}
      <button onClick={() => setShowDailySummaries(!showDailySummaries)}>
        {showDailySummaries ? "Hide Daily Summaries" : "Show Daily Summaries"}
      </button>
      <button onClick={() => setShowAlerts(!showAlerts)}>
        {showAlerts ? "Hide Alerts" : "Show Alerts"}
      </button>
      {showDailySummaries && (
        <DailySummary
          dailySummaries={dailySummaries}
          isCelsius={isCelsius}
          displayTemperature={displayTemperature}
        />
      )}
      {showAlerts && <Alerts alerts={alerts} />}
    </div>
  );
};

export default WeatherComponent;
