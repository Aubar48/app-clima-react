export function getWeatherMessage(weatherData) {
  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return "No se pudo obtener el clima... Pero ponete lo que te haga sentir bien y salí con actitud.";
  }

  const temp = weatherData.main.temp;
  const windSpeed = weatherData.wind.speed;
  const description = weatherData.weather[0].main.toLowerCase();

  // Mensajes de ropa sugerida según temperatura
  let ropaSugerida = "";
  if (temp >= 35) {
    ropaSugerida = "Ropa súper liviana: remera sin mangas, shorts y mucha hidratación.";
  } else if (temp >= 30) {
    ropaSugerida = "Usá remera liviana y pantalones cortos.";
  } else if (temp >= 25) {
    ropaSugerida = "Ideal una camiseta fresca y algo cómodo para el calor.";
  } else if (temp >= 18) {
    ropaSugerida = "Un pantalón cómodo y una camisa ligera están perfectos.";
  } else if (temp >= 12) {
    ropaSugerida = "Una camperita liviana es ideal para esta temperatura.";
  } else if (temp >= 5) {
    ropaSugerida = "Un abrigo o camperón térmico te va a venir genial.";
  } else if (temp >= -10) {
    ropaSugerida = "Abrigate con varias capas: camperón térmico, gorro y bufanda.";
  } else {
    ropaSugerida = "Frío polar: abrigo grueso, guantes, bufanda y gorro obligatorios.";
  }

  // Condiciones especiales
  if (description.includes("thunderstorm")) {
    return `Se viene la tormenta con todo ⚡. Mejor quedate en casa si podés, poné música tranqui o una peli buena. ${ropaSugerida}`;
  }

  if (description.includes("snow")) {
    return `¡Está nevando, qué locura! Sacate una foto, abrigate hasta las orejas y disfrutá como nene con juguete nuevo. ${ropaSugerida}`;
  }

  if (description.includes("fog") || description.includes("mist")) {
    return `Hay niebla como para perderse en los pensamientos ☁️. Andá con cuidado si salís, y abrí bien los ojos. ${ropaSugerida}`;
  }

  if (description.includes("rain")) {
    return `Lluvia, lluvia y más lluvia ☔. Ideal para quedarse en casa con un mate, una manta y charlas profundas. ${ropaSugerida}`;
  }

  if (description.includes("cloud")) {
    if (windSpeed > 5) {
      return `Nublado y con viento. Clásico día para reflexionar sobre la vida con un café en la mano. ${ropaSugerida}`;
    }
    return `Día gris pero tranqui. Perfecto para caminar sin apuro y pensar en tus cosas. ${ropaSugerida}`;
  }

  // Rangos de temperatura - mensajes generales
  if (temp >= 35) {
    return `¡Un horno mal! Evitá salir en horas pico, hidratate como si estuvieras en el Sahara. ${ropaSugerida}`;
  }

  if (temp >= 30) {
    return `Calorón infernal 🥵. Ropa liviana, agua y sombra. No seas cabeza dura, cuidate. ${ropaSugerida}`;
  }

  if (temp >= 25) {
    return `Día caluroso. Ideal para helado, short, y si podés, pisar el pasto descalzo. ${ropaSugerida}`;
  }

  if (temp >= 18 && temp < 25) {
    return `Temperatura piola. Aprovechá para salir, moverte un poco o juntarte con alguien que te haga bien. ${ropaSugerida}`;
  }

  if (temp >= 12 && temp < 18) {
    return `Está fresco lindo. Una camperita liviana y salís como campeón. ${ropaSugerida}`;
  }

  if (temp >= 5 && temp < 12) {
    return `Hace frío de verdad. Gorrito, bufanda y ganas de abrazar. Ideal para caminatas rápidas y refugios cálidos. ${ropaSugerida}`;
  }

  if (temp < -10) {
    return `Frío polar 🧊. Abrigate bien, con varias capas. Y si podés quedarte en casa, mejor. ${ropaSugerida}`;
  }

  // Por si no entra en nada anterior
  return `Día tranqui. Sea como sea el clima, lo importante es cómo te lo tomás vos 😉. ${ropaSugerida}`;
}
