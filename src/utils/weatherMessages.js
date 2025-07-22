export function getWeatherMessage(weatherData) {
  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return "No se pudo obtener el clima... Pero ponete lo que te haga sentir bien y salí con actitud.";
  }

  const temp = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const description = weatherData.weather[0].main.toLowerCase();

  // Condiciones especiales
  if (description.includes("thunderstorm")) {
    return "Se viene la tormenta con todo ⚡. Mejor quedate en casa si podés, poné música tranqui o una peli buena.";
  }

  if (description.includes("snow")) {
    return "¡Está nevando, qué locura! Sacate una foto, abrigate hasta las orejas y disfrutá como nene con juguete nuevo.";
  }

  if (description.includes("fog") || description.includes("mist")) {
    return "Hay niebla como para perderse en los pensamientos ☁️. Andá con cuidado si salís, y abrí bien los ojos.";
  }

  if (description.includes("rain")) {
    return "Lluvia, lluvia y más lluvia ☔. Ideal para quedarse en casa con un mate, una manta y charlas profundas.";
  }

  if (description.includes("cloud")) {
    if (windSpeed > 5) {
      return "Nublado y con viento. Clásico día para reflexionar sobre la vida con un café en la mano.";
    }
    return "Día gris pero tranqui. Perfecto para caminar sin apuro y pensar en tus cosas.";
  }

  // Rangos de temperatura
  if (temp >= 35) {
    return "¡Un horno mal! Evitá salir en horas pico, hidratate como si estuvieras en el Sahara.";
  }

  if (temp >= 30) {
    return "Calorón infernal 🥵. Ropa liviana, agua y sombra. No seas cabeza dura, cuidate.";
  }

  if (temp >= 25) {
    return "Día caluroso. Ideal para helado, short, y si podés, pisar el pasto descalzo.";
  }

  if (temp >= 18 && temp < 25) {
    return "Temperatura piola. Aprovechá para salir, moverte un poco o juntarte con alguien que te haga bien.";
  }

  if (temp >= 12 && temp < 18) {
    return "Está fresco lindo. Una camperita liviana y salís como campeón.";
  }

  if (temp >= 5 && temp < 12) {
    return "Hace frío de verdad. Gorrito, bufanda y ganas de abrazar. Ideal para caminatas rápidas y refugios cálidos.";
  }

  if (temp < -50) {
    return "Frío polar 🧊. Abrigate bien, con varias capas. Y si podés quedarte en casa, mejor.";
  }

  // Por si no entra en nada anterior
  return "Día tranqui. Sea como sea el clima, lo importante es cómo te lo tomás vos 😉.";
}
