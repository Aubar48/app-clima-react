// src/api/weatherService.js
import { getWindDirection } from "../utils/getWatherDirection"; // corregí el typo acá

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchFiveDayForecast = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es&units=metric`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener el pronóstico");
  }

  const data = await res.json();

  return data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .map((item) => ({
      day: new Date(item.dt_txt).toLocaleDateString("es-ES", {
        weekday: "short",
      }),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      wind: {
        speed: Math.round(item.wind.speed * 3.6), // m/s a km/h
        direction: getWindDirection(item.wind.deg),
      },
      icon: item.weather[0].icon,
    }));
};

export const fetchWeatherByCity = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener el clima");
  return data;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener el clima");
  return data;
};
