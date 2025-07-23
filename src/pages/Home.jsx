// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import WeatherWidget from "../components/WeatherWidget";
import WeatherCharts from "../components/WeatherCharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDarkModeMenu } from "../hooks/useDarkModeMenu";

const Home = () => {
  const { darkMode, toggleDarkMode, menuOpen, toggleMenu, setMenuOpen } =
    useDarkModeMenu();

  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="font-[Outfit] bg-gradient-to-br from-[#3a3897] via-[#2c2a72] to-[#1a1a4e] dark:from-[#0f0f2f] dark:via-[#1a1a4e] dark:to-[#0d0d25] text-white dark:text-gray-200 min-h-screen transition-colors duration-300">

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Desplazar hacia arriba"
          >
            ⬆️
          </button>
        )}

        {/* Header semántico */}
        <header>
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            setMenuOpen={setMenuOpen}
          />
        </header>

        {/* Main semántico */}
        <main id="main" className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">

          {/* Hero / Intro */}
          <section
            id="hero"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Consulta el clima mundial <br className="hidden md:block" />
                en segundos
              </h2>
              <p className="text-lg md:text-xl opacity-80 mb-8">
                Información actualizada, simple y visual. Busca por ciudad o
                desde el mapa (próximamente).
              </p>
              <a
                href="#widget"
                className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Probar ahora
              </a>
            </div>
            <div className="hidden md:block">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtWnjTAtDS5Xe1LRxzgv1Bl0AhbZ2LtMM_lA&s"
                alt="Ilustración del clima"
                className="w-full max-w-5xl mx-auto drop-shadow-xl border-2 border-white/10 rounded-lg"
              />
            </div>
          </section>

          {/* Weather Widget + Charts */}
          <section
            id="weather"
            className="flex flex-col lg:flex-row gap-8 items-start"
          >
            <div className="flex-1">
              <WeatherWidget setCoords={setCoords} />
            </div>
            {coords.lat && coords.lon && (
              <div className="flex-1">
                <WeatherCharts lat={coords.lat} lon={coords.lon} />
              </div>
            )}
          </section>

          {/* Características */}
          <section
            id="features"
            className="text-center grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white/5 dark:bg-white/10 p-6 rounded-xl border border-white/10 dark:border-white/20 shadow-md">
              <div className="text-4xl mb-2">🌡️</div>
              <h4 className="text-xl font-medium mb-2">Clima en tiempo real</h4>
              <p className="text-sm opacity-80">
                Temperatura, humedad, viento y más en tu idioma y con datos
                precisos.
              </p>
            </div>
            <div className="bg-white/5 dark:bg-white/10 p-6 rounded-xl border border-white/10 dark:border-white/20 shadow-md">
              <div className="text-4xl mb-2">📍</div>
              <h4 className="text-xl font-medium mb-2">Busca por ciudad</h4>
              <p className="text-sm opacity-80">
                Solo escribe el nombre de una ciudad y obtén el pronóstico al
                instante.
              </p>
            </div>
            <div className="bg-white/5 dark:bg-white/10 p-6 rounded-xl border border-white/10 dark:border-white/20 shadow-md">
              <div className="text-4xl mb-2">🕒</div>
              <h4 className="text-xl font-medium mb-2">Amanecer y atardecer</h4>
              <p className="text-sm opacity-80">
                Conoce la duración del día, hora del amanecer y atardecer de
                cualquier ciudad.
              </p>
            </div>
          </section>

          {/* Números de ayuda - Córdoba */}
<section id="emergency-numbers" className="max-w-3xl mx-auto text-center px-4">
  <h3 className="text-3xl font-semibold mb-6">Números de ayuda - Córdoba</h3>
  <p className="opacity-80 mb-4">
    Si estás en una situación de emergencia en la provincia de Córdoba, Argentina, podés comunicarte con los siguientes servicios:
  </p>
  <ul className="text-left inline-block mx-auto opacity-90 space-y-2">
    <li><strong>Policía:</strong> 911</li>
    <li><strong>Bomberos:</strong> 100</li>
    <li><strong>Ambulancias (Emergencias médicas):</strong> 107</li>
    <li><strong>Defensa Civil Córdoba:</strong> (0351) 103</li>
    <li><strong>Violencia de género (línea nacional):</strong> 144</li>
    <li><strong>Atención al Suicida (Centro Asistencial Vida):</strong> (0351) 426-5131 / 135 (línea gratuita desde teléfono fijo)</li>
  </ul>
</section>

        </main>

        {/* Footer semántico */}
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Home;
