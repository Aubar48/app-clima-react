import React from "react";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import { getWeatherMessage } from "../utils/weatherMessages";
import { getWeatherEmoji } from "../utils/getWeatherEmoji";
import { getWeatherRecommendation } from "../utils/getWeatherRecommendation";
import { getWeatherPlaylist } from "../utils/getWeatherPlaylist";

const WeatherWidget = ({ setCoords }) => {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchByCity,
    fetchByGeolocation,
  } = useCurrentWeather("Córdoba,AR", setCoords);

  const getSunTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDayLength = (sunrise, sunset) => {
    const duration = sunset - sunrise;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours} h ${minutes} m`;
  };

  // Extras personalizados
  const message = getWeatherMessage(weather);
  const emoji = getWeatherEmoji(weather);
  const recommendation = getWeatherRecommendation(weather);
  const playlist = getWeatherPlaylist(weather);

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 justify-center w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ej: Santiago,CL"
          className="flex-grow min-w-[180px] px-4 py-2 rounded-lg outline-none border border-white/20 text-sm bg-white/10 text-white placeholder-white/50"
        />
        <button
          onClick={() => fetchByCity()}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition min-w-[80px]"
        >
          Buscar
        </button>
        <button
          onClick={fetchByGeolocation}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition min-w-[80px]"
        >
          Actual
        </button>
      </div>

      {error && <div className="text-red-400 mb-4 text-center w-full">{error}</div>}
      {loading && <div className="text-white mb-4 text-center w-full">Cargando clima...</div>}

      {!loading && weather && (
        <div className="relative w-full rounded-3xl p-6 overflow-hidden border border-white/10 shadow-2xl
          bg-gradient-to-br from-purple-700/70 via-indigo-800/60 to-blue-900/70 backdrop-blur-lg
          max-w-md mx-auto"
        >
          <div className="text-sm opacity-80 mb-2 text-center">
            {new Date().toLocaleString("es-AR", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-3 gap-2 sm:gap-4">
            <div className="text-5xl">{emoji}</div>
            <div className="text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>

          <div className="text-lg opacity-90 mb-4 text-center">
            {weather.name}, {weather.sys.country}
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-3 flex flex-col sm:flex-row justify-between items-center mb-4 border border-white/10 shadow-md text-sm gap-4 sm:gap-0">
            <div className="text-center flex-1">
              <div className="text-xl mb-1">☀️</div>
              <div>Amanecer: {getSunTime(weather.sys.sunrise)}</div>
            </div>
            <div className="text-center flex-1">
              <div>Duración:</div>
              <div>{getDayLength(weather.sys.sunrise, weather.sys.sunset)}</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl mb-1">🌙</div>
              <div>Atardecer: {getSunTime(weather.sys.sunset)}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-sm opacity-90 mb-4 text-center sm:text-left gap-2 sm:gap-0">
            <div>Humedad: {weather.main.humidity}%</div>
            <div>Viento: {Math.round(weather.wind.speed * 3.6)} km/h</div>
          </div>

          {/* Mensajes personalizados */}
          <div className="mt-4 p-3 bg-purple-900/40 rounded-lg text-center text-sm italic space-y-2 break-words">
            <p>{message}</p>
            <p className="text-white/80">{recommendation}</p>
            <p className="text-white/60">🎵 {playlist}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
