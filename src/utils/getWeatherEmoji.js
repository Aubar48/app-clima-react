export function getWeatherEmoji(weatherData) {
  if (!weatherData || !weatherData.weather) return "🌈";

  const description = weatherData.weather[0].main.toLowerCase();

  if (description.includes("thunderstorm")) return "⛈️";
  if (description.includes("snow")) return "❄️";
  if (description.includes("rain")) return "🌧️";
  if (description.includes("fog") || description.includes("mist")) return "🌫️";
  if (description.includes("cloud")) return "☁️";
  if (description.includes("clear")) return "☀️";

  return "🌤️";
}
