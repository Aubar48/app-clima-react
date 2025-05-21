import React, { useEffect, useState } from "react";

const API_KEY = "6dd4b35b009900090c6ae6a063297fb1";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Córdoba,AR"); // valor inicial
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (searchCity = city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=es`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener el clima");
      }

      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener el clima:", err);
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener el clima");
      }

      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getSunTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDayLength = (sunrise, sunset) => {
    const duration = sunset - sunrise;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours} h ${minutes} m`;
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => setError("No se pudo obtener la ubicación")
    );
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className=" flex flex-col items-center p-4 ">
      
      {/* Input de búsqueda */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ej: Santiago,CL"
          className="px-4 py-2 rounded-lg outline-none border border-white/20 text-sm bg-white/10 text-white placeholder-white/50"
        />
        <button
          onClick={() => fetchWeather()}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Buscar
        </button>
        <button
          onClick={handleGeolocation}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          📍 Actual
        </button>
      </div>

      {/* Estado de carga / error */}
      {error && <div className="text-red-400 mb-4">Error: {error}</div>}
      {loading && <div className="text-white mb-4">Cargando clima...</div>}

      {!loading && weather && (
        <div className="relative w-full max-w-sm sm:max-w-md">
          <div className="relative text-white bg-gradient-to-br from-purple-700/70 via-indigo-800/60 to-blue-900/70 backdrop-blur-lg shadow-2xl rounded-3xl p-6 overflow-hidden border border-white/10">
            {/* Fecha */}
            <div className="text-sm opacity-80 mb-2">
              {new Date().toLocaleString("es-AR", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Clima Actual */}
            <div className="flex items-center mb-3">
              <div className="text-5xl mr-3">🌤️</div>
              <div className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                {Math.round(weather.main.temp)}°C
              </div>
            </div>

            {/* Ubicación */}
            <div className="text-lg opacity-90 mb-4">
              {weather.name}, {weather.sys.country}
            </div>

            {/* Amanecer / Atardecer */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 flex justify-between items-center mb-4 border border-white/10 shadow-md text-sm">
              <div className="text-center">
                <div className="text-xl mb-1">☀️</div>
                <div>Amanecer: {getSunTime(weather.sys.sunrise)}</div>
              </div>
              <div className="text-center px-4">
                <div>Duración:</div>
                <div>{getDayLength(weather.sys.sunrise, weather.sys.sunset)}</div>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">🌙</div>
                <div>Atardecer: {getSunTime(weather.sys.sunset)}</div>
              </div>
            </div>

            {/* Humedad / Viento */}
            <div className="flex justify-between text-sm opacity-90 mb-4">
              <div>Humedad: {weather.main.humidity}%</div>
              <div>Viento: {Math.round(weather.wind.speed * 3.6)} km/h</div>
            </div>

            {/* Pronóstico Estático */}
            <div className="flex justify-between gap-2">
              {[{ day: "Hoy", icon: "⛅", max: 28, min: 19 },
                { day: "Vie", icon: "🌧️", max: 25, min: 18 },
                { day: "Sáb", icon: "🌦️", max: 22, min: 17 },
                { day: "Dom", icon: "☀️", max: 29, min: 20 },
              ].map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-3 w-20 text-center border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="text-xs font-medium mb-1 opacity-80">{f.day}</div>
                  <div className="text-2xl my-1 drop-shadow-md">{f.icon}</div>
                  <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                    {f.max}°
                  </div>
                  <div className="text-xs opacity-70">{f.min}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
