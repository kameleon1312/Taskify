// ============================================================
//  TASKINER™ ENTRY POINT v3.1
// Autor: Szymon Pochopień
// Cel: Inicjalizacja aplikacji React + styl globalny + PWA-ready
// ============================================================

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("✅ Service Worker zarejestrowany:", reg))
      .catch((err) => console.log("❌ Błąd rejestracji SW:", err));
  });
}

// ============================================================
//  CREATE ROOT & RENDER APP
// ============================================================
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker zarejestrowany:', reg.scope))
      .catch((err) => console.error('❌ Błąd rejestracji SW:', err));
  });
}


if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("✅ Service Worker zarejestrowany:", reg.scope))
      .catch((err) => console.error("❌ Błąd rejestracji SW:", err));
  });
}