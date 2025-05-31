import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.svg";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather__card-temp">75&deg;F</p>
      <img src={sunnyDay} alt="Sun" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
