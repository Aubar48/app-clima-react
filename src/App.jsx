import React from "react";

import "./App.css";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  return (
    <>

    <div className="font-[Outfit] bg-gradient-to-br from-[#3a3897] via-[#2c2a72] to-[#1a1a4e] text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">🌤️ Clima Global</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#features" className="hover:underline">Características</a>
          <a href="#forecast" className="hover:underline">Pronóstico</a>
          <a href="#about" className="hover:underline">Sobre</a>
          <a href="#contact" className="hover:underline">Contacto</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6" id="hero">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Consulta el clima mundial en segundos</h2>
        <p className="text-lg md:text-xl opacity-80 mb-8">Información actualizada, simple y visual. Busca por ciudad o próximamente desde un mapa interactivo.</p>
        <div className="flex justify-center">
          <a href="#widget" className="bg-white text-[#2c2a72] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition">Probar ahora</a>
        </div>
      </section>

      {/* Weather Widget */}
      <section id="widget" className="py-10">
        <WeatherWidget />
      </section>

      {/* Características */}
      <section id="features" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-10">Características</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-md">
            <div className="text-4xl mb-2">🌡️</div>
            <h4 className="text-xl font-medium mb-2">Clima en tiempo real</h4>
            <p className="text-sm opacity-80">Temperatura, humedad, viento y más en tu idioma y con datos precisos.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-md">
            <div className="text-4xl mb-2">📍</div>
            <h4 className="text-xl font-medium mb-2">Busca por ciudad</h4>
            <p className="text-sm opacity-80">Solo escribe el nombre de una ciudad y obtén el pronóstico al instante.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-md">
            <div className="text-4xl mb-2">🕒</div>
            <h4 className="text-xl font-medium mb-2">Amanecer y atardecer</h4>
            <p className="text-sm opacity-80">Conoce la duración del día, hora del amanecer y atardecer de cualquier ciudad.</p>
          </div>
        </div>
      </section>

      {/* Pronóstico futuro (mock) */}
      <section id="forecast" className="py-20 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">Pronóstico extendido</h3>
        <p className="mb-8 opacity-80">Próximamente agregaremos pronóstico de hasta 7 días con más detalles por hora.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center max-w-xl mx-auto">
          {["Lun", "Mar", "Mié", "Jue"].map((d, i) => (
            <div key={i} className="bg-white/10 p-4 rounded-lg shadow-md">
              <div className="text-xl font-medium mb-2">{d}</div>
              <div className="text-3xl mb-1">🌤️</div>
              <div className="text-sm">28° / 19°</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">Sobre el proyecto</h3>
        <p className="opacity-80">Esta app fue construida con React y Tailwind CSS utilizando la API de OpenWeatherMap. El objetivo es brindar una forma visual, rápida y accesible de consultar el clima desde cualquier parte del mundo.</p>
      </section>

      {/* Contacto */}
      <footer id="contact" className="bg-black/20 py-10 text-center border-t border-white/10">
        <p className="text-sm opacity-60">© {new Date().getFullYear()} Clima Global. Todos los derechos reservados.</p>
      </footer>
    </div>
    
  



    </>
  );
}

export default App;
