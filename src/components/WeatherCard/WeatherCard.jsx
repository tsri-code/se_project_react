import { useContext } from "react";
import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.svg";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather__card-temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img src={sunnyDay} alt="Sun" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
