import React from "react";
import "./WeatherComponent.css";

const DailySummary = ({ dailySummaries, isCelsius, displayTemperature }) => {
  return (
    <div className="daily-summary">
      <h2>Daily Summaries</h2>
      {dailySummaries.map((summary) => (
        <div key={summary.date} className="summary-item">
          <h3>{summary.date}</h3>
          <p>Average Temperature: {displayTemperature(summary.avgTemp)}</p>
          <p>Maximum Temperature: {displayTemperature(summary.maxTemp)}</p>
          <p>Minimum Temperature: {displayTemperature(summary.minTemp)}</p>
          <p>Dominant Condition: {summary.dominantCondition}</p>
        </div>
      ))}
    </div>
  );
};

export default DailySummary;
