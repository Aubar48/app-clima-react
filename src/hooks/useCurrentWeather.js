/* eslint-disable react-hooks/exhaustive-deps */
// src/hooks/useCurrentWeather.js
import { useState, useEffect } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/weatherService";

export const useCurrentWeather = (initialCity = "Córdoba,AR", setCoords) => {
  const [city, setCity] = useState(initialCity);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchByCity = async (customCity = city) => {
    try {
      setLoading(true);
      const data = await fetchWeatherByCity(customCity);
      setWeather(data);
      setCoords?.({ lat: data.coord.lat, lon: data.coord.lon });
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          setLoading(true);
          const data = await fetchWeatherByCoords(coords.latitude, coords.longitude);
          setWeather(data);
          setCoords?.({ lat: data.coord.lat, lon: data.coord.lon });
          setError(null);
        } catch (err) {
          setError(err.message);
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      () => setError("No se pudo obtener la ubicación")
    );
  };

  useEffect(() => {
    fetchByCity();
  }, []);

  return {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchByCity,
    fetchByGeolocation,
  };
};
