// src/pages/About.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import teamMembers from "../data/teamMembers";
import { useDarkModeMenu } from "../hooks/useDarkModeMenu";

export default function About() {
  const { darkMode, toggleDarkMode, menuOpen, toggleMenu, setMenuOpen } =
    useDarkModeMenu();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-[Outfit]">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          setMenuOpen={setMenuOpen}
        />

        <main
          className="flex-grow max-w-7xl mx-auto p-6"
          role="main"
          aria-labelledby="main-heading"
        >
          <h1 id="main-heading" className="text-3xl font-bold mb-6">
            Sobre Nosotros
          </h1>

          <p className="mb-8 max-w-3xl">
            Somos estudiantes del <strong>ISPC</strong> cursando la materia{" "}
            <strong>Estadística y Probabilidad Aplicadas</strong> en el ciclo
            2024. Este proyecto fue desarrollado con el objetivo de ofrecer una
            herramienta accesible y visualmente amigable que brinde información
            meteorológica confiable para la toma de decisiones cotidianas.
          </p>

          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-2xl font-semibold mb-4">
              Foro 1: Miembros
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {teamMembers.map(({ name, photo, portfolio, github, linkedin }) => (
                <article
                  key={name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
                  aria-label={`Perfil de ${name}`}
                >
                  <img
                    src={photo}
                    alt={`Foto de perfil de ${name}`}
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  <nav aria-label={`Enlaces de ${name}`}>
                    <ul className="flex gap-4 text-sm underline hover:text-yellow-400">
                      {portfolio && (
                        <li>
                          <a href={portfolio} target="_blank" rel="noreferrer">
                            Ver portfolio
                          </a>
                        </li>
                      )}
                      {github && (
                        <li>
                          <a href={github} target="_blank" rel="noreferrer">
                            GitHub
                          </a>
                        </li>
                      )}
                      {linkedin && (
                        <li>
                          <a href={linkedin} target="_blank" rel="noreferrer">
                            LinkedIn
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </article>
              ))}
            </div>
          </section>

          <section className="my-10" aria-labelledby="problematic-heading">
            <h2 id="problematic-heading" className="text-2xl font-semibold mb-4">
              Foro 2: Problemáticas
            </h2>
            <p>
              Muchas personas toman decisiones cotidianas sin contar con
              información climática clara o accesible. Existe una necesidad de
              contar con una herramienta simple que facilite decisiones
              informadas basadas en datos del clima.
            </p>
          </section>

          <section className="mb-10" aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="text-2xl font-semibold mb-4">
              Foro 3: Acciones
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>1.</strong> Recopilar datos climáticos de fuentes
                confiables (API).
              </li>
              <li>
                <strong>2.</strong> Analizar variables meteorológicas usando
                herramientas estadísticas.
              </li>
              <li>
                <strong>3.</strong> Representar visualmente los datos (gráficas
                de temperatura, lluvia, humedad, etc.).
              </li>
              <li>
                <strong>4.</strong> Evaluar patrones climáticos y realizar
                predicciones simples.
              </li>
              <li>
                <strong>5.</strong> Integrar visualización de datos y diseño
                responsivo para facilitar la experiencia del usuario.
              </li>
            </ul>

            <div className="mt-6 overflow-x-auto">
              <h3 className="text-xl font-medium mb-2">
                Selección de acciones
              </h3>
              <table
                className="w-full border border-gray-300 dark:border-gray-700 text-sm"
                aria-label="Tabla de objetivos y acciones"
              >
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="border px-2 py-1 text-left font-semibold"
                    >
                      Objetivo específico
                    </th>
                    <th
                      scope="col"
                      className="border px-2 py-1 text-left font-semibold"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">1</td>
                    <td className="border px-2 py-1">
                      Investigar y conectar una API de clima (como OpenWeather)
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">2</td>
                    <td className="border px-2 py-1">
                      Recolectar datos diarios y tabularlos
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">3</td>
                    <td className="border px-2 py-1">
                      Graficar variables (líneas, barras, etc.) con herramientas
                      como Chart.js
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">4</td>
                    <td className="border px-2 py-1">
                      Calcular promedios, medianas y probabilidades básicas
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">5</td>
                    <td className="border px-2 py-1">
                      Diseñar e implementar la app con interfaz accesible y
                      clara
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
