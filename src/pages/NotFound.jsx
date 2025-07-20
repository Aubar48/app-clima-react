// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-red-800 via-purple-800 to-indigo-900">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Página no encontrada</p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
