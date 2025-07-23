// components/AccessibilityMenu.jsx
import React, { useState } from "react";
import { useAccessibilityOptions } from "../hooks/useAccessibilityOptions";

const OPTIONS = [
  { key: "contrast", label: "Contraste +" },
  { key: "blur", label: "Astigmatismo" },
  { key: "grayscale", label: "Sin color" },
  { key: "text-lg", label: "Texto grande" },
  { key: "letter-space", label: "Espaciado texto" },
  { key: "no-animations", label: "Detener animaciones" },
  { key: "highlight-links", label: "Resaltar enlaces" },
  { key: "hide-images", label: "Ocultar imágenes" },
  { key: "line-height", label: "Altura de línea" },
  { key: "speak", label: "Leer texto" },
  { key: "daltonismo-deuteranopia", label: "Daltonismo Deuteranopía" },
  { key: "daltonismo-protanopia", label: "Daltonismo Protanopía" },
  { key: "daltonismo-tritanopia", label: "Daltonismo Tritanopía" },
];

export const AccessibilityMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeOptions, toggleOption, restore } = useAccessibilityOptions();

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-white pl-2 pr-2 rounded-full bg-white hover:bg-gray-600 focus:outline-none"
        aria-label="Accesibilidad"
      >
        👤
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-60 bg-white text-black shadow-lg rounded-lg p-2 text-sm space-y-1">
          {OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleOption(key)}
              className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                activeOptions.includes(key) ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {label}
            </button>
          ))}

          <hr className="my-1" />
          <button
            onClick={restore}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
          >
            Restaurar todo
          </button>
        </div>
      )}
    </div>
  );
};
