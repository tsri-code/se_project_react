import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather__card-temp">{weatherData.temp.F}&deg;F</p>
      <img src={sunnyDay} alt="Sun" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
