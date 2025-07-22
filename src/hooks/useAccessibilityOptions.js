// hooks/useAccessibilityOptions.js
import { useEffect, useState } from "react";

export const useAccessibilityOptions = () => {
  const [activeOptions, setActiveOptions] = useState([]);

  const speakText = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const text = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR"; // o "es-ES" según tu preferencia
    utterance.rate = 1;
    utterance.pitch = 1;

    synth.cancel(); // Detiene cualquier otra lectura
    synth.speak(utterance);
  };

  const toggleOption = (key) => {
    const html = document.documentElement;
    let newOptions = [...activeOptions];

    if (activeOptions.includes(key)) {
      newOptions = activeOptions.filter((opt) => opt !== key);

      if (key === "speak") {
        window.speechSynthesis.cancel(); // Detiene la lectura
      }
    } else {
      newOptions.push(key);
      if (key === "speak") {
        speakText(); // Inicia lectura
      }
    }

    // Aplicar clases visuales (excluyendo speak)
    html.classList.remove(...activeOptions.filter((k) => k !== "speak"));
    html.classList.add(...newOptions.filter((k) => k !== "speak"));

    localStorage.setItem("accessibilityOptions", JSON.stringify(newOptions));
    setActiveOptions(newOptions);
  };

  const restore = () => {
    const html = document.documentElement;
    html.classList.remove(...activeOptions.filter((k) => k !== "speak"));
    window.speechSynthesis.cancel();
    localStorage.removeItem("accessibilityOptions");
    setActiveOptions([]);
  };

  useEffect(() => {
    const saved = localStorage.getItem("accessibilityOptions");
    if (saved) {
      const parsed = JSON.parse(saved);
      document.documentElement.classList.add(...parsed.filter((k) => k !== "speak"));
      setActiveOptions(parsed);

      if (parsed.includes("speak")) {
        speakText();
      }
    }
  }, []);

  return {
    activeOptions,
    toggleOption,
    restore,
  };
};
