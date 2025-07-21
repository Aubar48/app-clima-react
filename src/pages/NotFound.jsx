// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main
      className="h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-red-800 via-purple-800 to-indigo-900 px-4 text-center"
      role="main"
      aria-label="Página no encontrada"
    >
      <h1 className="text-5xl font-bold mb-4" role="alert" aria-live="assertive">
        404
      </h1>
      <p className="text-xl mb-6">La página que buscas no existe.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Volver al inicio
      </Link>
    </main>
  );
};

export default NotFound;
