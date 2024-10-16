const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Weather Monitoring logic
const API_KEY = "f617fe3305b7e0b05adffd6009fa6479";

let cachedWeatherData = {};
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

async function getWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await axios.get(url);
  const data = response.data;

  return {
    city,
    main: data.weather[0].main,
    temp: data.main.temp - 273.15,
    feels_like: data.main.feels_like - 273.15,
    dt: data.dt,
    serverTime: new Date().toISOString(), // Include current server time
  };
}

async function fetchWeatherData(city) {
  try {
    const weatherData = await getWeatherData(city);
    cachedWeatherData[city] = weatherData;
  } catch (error) {
    console.error(`Failed to fetch weather data for ${city}`, error);
  }
}

// Weather Monitoring API endpoint
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (city) {
    if (!cachedWeatherData[city]) {
      await fetchWeatherData(city);
    }
    const weatherData = cachedWeatherData[city];
    if (weatherData) {
      res.json(weatherData);
    } else {
      res.status(404).json({ error: "City not found in cached data" });
    }
  } else {
    res.status(400).json({ error: "City query parameter is required" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
