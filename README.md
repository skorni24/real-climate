# Real-Time Weather Monitoring System

## Description

This project is a real-time data processing system designed to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves weather data from the OpenWeatherMap API and processes it to generate daily summaries and alerts based on user-defined thresholds.

## Features

- Continuous retrieval of weather data from the OpenWeatherMap API.
- Conversion of temperature values from Kelvin to Celsius.
- Daily weather summaries with average, maximum, and minimum temperatures, and dominant weather conditions.
- User-configurable alert thresholds for temperature and specific weather conditions.
- Real-time alerting when thresholds are breached.
- Visualizations for daily weather summaries, historical trends, and triggered alerts.

## Build Instructions

To build and run this project, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/skorni24/real-climate.git
   cd real-climate
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the application:**

   ```sh
   npm start
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

## Design Choices

- **Component Structure:** The project follows a component-based architecture. Each component is located in the `src/components` directory.
- **Styling:** CSS files are used for styling components. For example, `WeatherComponent.css` styles the `WeatherComponent.js`.
- **State Management:** Describe how state is managed in your application (e.g., using React's `useState` or `useReducer`).

## Dependencies

List of dependencies required to set up and run the application:

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Docker:** If you are using Docker for any services, ensure Docker is installed. You can download it from [docker.com](https://www.docker.com/).
