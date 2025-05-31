import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p>Today is 75 &deg; F / You may want to wear:</p>
      </section>
    </main>
  );
}

export default Main;
