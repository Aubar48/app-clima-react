import React from "react";
import { useNavigate } from "react-router-dom";
import teamMembers from "../data/teamMembers";

export default function AboutButtonAndCards() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="about-heading" className="p-4">
      <button
        onClick={() => navigate("/about")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Ir a la página Sobre Nosotros"
      >
        Sobre Nosotros
      </button>

      <h2 id="about-heading" className="sr-only">
        Miembros del equipo
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {teamMembers.map(({ name, photo, portfolio, github, linkedin }) => (
          <article
            key={name}
            className="w-64 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow hover:shadow-lg transition"
            aria-label={`Información del miembro del equipo ${name}`}
          >
            <img
              src={photo}
              alt={`Foto de ${name}`}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold mb-2 text-center">{name}</h3>
            <div className="flex justify-center gap-4">
              {portfolio && (
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={`Ver portfolio de ${name}`}
                >
                  Portfolio
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={`Ver perfil de GitHub de ${name}`}
                >
                  GitHub
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={`Ver perfil de LinkedIn de ${name}`}
                >
                  LinkedIn
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
