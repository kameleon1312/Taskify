// ============================================================
//  ThemeToggle – Przełącznik motywu (Dark / Light)
// Opis: Zmienia motyw aplikacji, zapisując preferencję
//       w localStorage i na elemencie <body>.
// ============================================================

import React, { useEffect, useState } from "react";

function ThemeToggle() {
  // ==========================================================
  //  Stan motywu (domyślnie: dark lub zapisany w localStorage)
  // ==========================================================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // ==========================================================
  //  Efekt: aktualizuje motyw w DOM i zapisuje w localStorage
  // ==========================================================
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ==========================================================
  //  Zmiana motywu
  // ==========================================================
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Zmień motyw"
      title={theme === "dark" ? "Przełącz na jasny motyw" : "Przełącz na ciemny motyw"}
    >
      {theme === "dark" ? "🌙 Tryb ciemny" : "☀️ Tryb jasny"}
    </button>
  );
}

export default ThemeToggle;
