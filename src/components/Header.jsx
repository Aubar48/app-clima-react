import React from "react";
import { Link } from "react-router-dom";

export default function Header({
  darkMode,
  toggleDarkMode,
  menuOpen,
  toggleMenu,
  setMenuOpen,
}) {
  return (
    <header className="sticky top-0 bg-[#1f1d4a]/80 dark:bg-[#0f0f2f]/80 backdrop-blur-md z-40 border-b border-white/10 dark:border-white/20">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:underline transition">
            🌤️ Clima Global
          </Link>
        </h1>

        {/* Botón Hamburguesa - Solo visible en mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
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
          <Link
            to="/about"
            className="bg-yellow-400 text-black px-4 py-1.5 rounded-full hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            Sobre Nosotros
          </Link>
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
          <Link
            to="/about"
            className="bg-yellow-400 text-black px-4 py-2 rounded-full text-center hover:bg-yellow-300 transition dark:text-white dark:bg-yellow-500 dark:hover:bg-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Sobre Nosotros
          </Link>
        </div>
      )}
    </header>
  );
}
