import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
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

  const temperature = Math.round(weatherData.temp.F);

  return (
    <section className="weather-card">
      <p className="weather-card__temperature">{temperature} &deg; F</p>
      <img src={weatherOptionUrl} alt="weather condition" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;