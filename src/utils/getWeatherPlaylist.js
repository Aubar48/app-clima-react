export function getWeatherPlaylist(weatherData) {
  if (!weatherData || !weatherData.weather) {
    return "🎵 Escuchá lo que te haga bien.";
  }

  const description = weatherData.weather[0].main.toLowerCase();

  if (description.includes("thunderstorm")) return "🎧 Indie melancólico o jazz suave";
  if (description.includes("snow")) return "🎶 Instrumental suave o pop nostálgico";
  if (description.includes("rain")) return "🎼 Lo-fi beats o baladas acústicas";
  if (description.includes("fog") || description.includes("mist")) return "🎵 Dream pop o electrónica chill";
  if (description.includes("cloud")) return "🎧 Rock alternativo";
  if (description.includes("clear")) return "🌞 Funk, cumbia pop o rock nacional alegre";

  return "🎵 Algo que te saque una sonrisa. Vos sabés cuál.";
}
