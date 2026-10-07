import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  const normalizedCondition = ["clouds", "drizzle", "mist", "haze", "smoke"].includes(weatherData.condition)
    ? "clouds"
    : weatherData.condition;

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === weatherData.isDay && option.condition === normalizedCondition;
  });

  const weatherOptionUrl =
    filteredOptions[0]?.url ||
    (weatherData.isDay
      ? new URL("../../assets/Day/sunny.svg", import.meta.url).href
      : new URL("../../assets/Night/night.svg", import.meta.url).href);

  const temperature = currentTemperatureUnit === "F" 
    ? Math.round(weatherData.temp.F) 
    : Math.round(weatherData.temp.C);

  return (
    <section className="weather-card">
      <p className="weather-card__temperature">{temperature} &deg; {currentTemperatureUnit}</p>
      <img src={weatherOptionUrl} alt="weather condition" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;