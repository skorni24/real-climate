import React from "react";
import "./WeatherComponent.css";

const Alerts = ({ alerts }) => {
  return (
    <div className="alerts">
      <h2>Alerts</h2>
      {alerts.map((alert, index) => (
        <p key={index} className="alert-item">
          {alert}
        </p>
      ))}
    </div>
  );
};

export default Alerts;
