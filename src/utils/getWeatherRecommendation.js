export function getWeatherRecommendation(weatherData) {
  if (!weatherData || !weatherData.weather || !weatherData.main) {
    return "Respirá hondo y hacé algo que te haga bien.";
  }

  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].main.toLowerCase();

  if (description.includes("thunderstorm")) return "Ideal para leer, mirar una peli o hacer journaling bajo techo.";
  if (description.includes("snow")) return "Jugá con la nieve o sacá fotos lindas. Si no, manta y chocolate caliente.";
  if (description.includes("rain")) return "Mate, libro y playlists tranquilas. Momento de introspección.";
  if (description.includes("fog") || description.includes("mist")) return "Una caminata lenta por la ciudad puede ser mágica hoy.";
  if (description.includes("cloud")) return "Salí a caminar o escuchá música con auris. Día para pensar.";
  if (description.includes("clear") && temp >= 28) return "Piscina, río, sombra y helado. No te pases con el sol.";
  if (description.includes("clear") && temp >= 15) return "Juntada al aire libre, picnic o bici. Día para compartir.";
  if (description.includes("clear")) return "Salí aunque sea un ratito. Aire fresco y buena vibra.";

  return "Movete un poco, conectá con vos o con alguien más.";
}
