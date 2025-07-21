import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black/20 dark:bg-black/40 py-10 text-center border-t border-white/10 dark:border-white/20"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <p className="text-sm opacity-80 text-white dark:text-white">
        © {new Date().getFullYear()} Clima Global. Todos los derechos reservados.
      </p>
    </footer>
  );
}
