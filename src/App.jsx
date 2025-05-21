import React, { useState, useEffect } from "react";

import "./App.css";
import WeatherWidget from "./components/WeatherWidget";
import WeatherCharts from "./components/WeatherCharts";

function App() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="font-[Outfit] bg-gradient-to-br from-[#3a3897] via-[#2c2a72] to-[#1a1a4e] dark:from-[#0f0f2f] dark:via-[#1a1a4e] dark:to-[#0d0d25] text-white dark:text-gray-200 min-h-screen transition-colors duration-300">

        {/* Botón para subir arriba */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            ⬆️
          </button>
        )}

        {/* Header */}
        <header className="sticky top-0 bg-[#1f1d4a]/80 dark:bg-[#0f0f2f]/80 backdrop-blur-md z-40 border-b border-white/10 dark:border-white/20">
          <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              🌤️ Clima Global
            </h1>

            {/* Botón Hamburguesa - Solo visible en mobile */}
            <button
              className="md:hidden text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>

            {/* Navegación en desktop */}
            <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
              <label className="switch">
                <input
                  type="checkbox"
                  id="modo-desktop"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider">
                  <span className="icon sun">☀️</span>
                  <span className="icon moon">🌙</span>
                </span>
              </label>
              <a
                href="https://taupe-mandazi-46506c.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-4 py-1.5 rounded-full hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
              >
                Mi Portafolio
              </a>
            </nav>
          </div>

          {/* Menú desplegable para mobile */}
          {menuOpen && (
            <div className="md:hidden px-6 py-4 bg-[#1f1d4a]/90 dark:bg-[#0f0f2f]/90 text-white flex flex-col gap-4 border-t border-white/10 dark:border-white/20">
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded-full font-semibold bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800 transition"
              >
                {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
              </button>
              <a
                href="https://taupe-mandazi-46506c.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-4 py-2 rounded-full text-center hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                Mi Portafolio
              </a>
            </div>
          )}
        </header>

        {/* Hero */}
        <section
          id="hero"
          className="py-20 px-6 bg-gradient-to-br from-[#3a3897] via-[#2c2a72] to-[#1a1a4e] dark:from-[#0f0f2f] dark:via-[#1a1a4e] dark:to-[#0d0d25]"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
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
                className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
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
          </div>
        </section>

        {/* Weather Widget */}
        <section id="widget" className="py-12 px-4">
          <div className="flex flex-col lg:flex-row max-w-4xl mx-auto p-6 rounded-xl items-center">
            <WeatherWidget setCoords={setCoords} />
            {coords.lat && coords.lon && (
              <div className="mt-6 w-full">
                <WeatherCharts lat={coords.lat} lon={coords.lon} />
              </div>
            )}
          </div>
        </section>

        {/* Características */}
        <section
          id="features"
          className="py-20 px-6 max-w-5xl mx-auto text-center"
        >
          <h3 className="text-3xl font-semibold mb-10">Características</h3>
          <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </section>

        {/* Sobre el proyecto */}
        <section
          id="about"
          className="py-20 px-6 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-3xl font-semibold mb-6">Sobre el proyecto</h3>
          <p className="opacity-80">
            Esta app fue construida con React y Tailwind CSS utilizando la API
            de OpenWeatherMap. El objetivo es brindar una forma visual, rápida y
            accesible de consultar el clima desde cualquier parte del mundo.
          </p>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="bg-black/20 dark:bg-black/40 py-10 text-center border-t border-white/10 dark:border-white/20"
        >
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} Clima Global. Todos los derechos
            reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
