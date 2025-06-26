import { coordinates, weatherApiKey } from "./constants";
import { checkResponse } from "./api";

export const getWeatherData = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${weatherApiKey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  result.type = getWeatherType(result.temp.F);
  result.time = data.dt;
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
