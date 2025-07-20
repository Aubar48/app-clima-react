// src/hooks/useForecast.js
import { useEffect, useState } from "react";
import { fetchFiveDayForecast } from "../services/weatherService";

export const useForecast = (lat, lon) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!lat || !lon) return;
    const fetchData = async () => {
      try {
        const result = await fetchFiveDayForecast(lat, lon);
        setForecast(result);
      } catch (error) {
        console.error("Error al obtener el pronóstico:", error);
      }
    };
    fetchData();
  }, [lat, lon]);

  return forecast;
};
