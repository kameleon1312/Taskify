import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Zmień motyw"
      title="Zmień motyw"
    >
      {theme === "dark" ? "🌙 Tryb ciemny" : "☀️ Tryb jasny"}
    </button>
  );
}

export default ThemeToggle;