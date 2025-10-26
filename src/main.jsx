// ============================================================
//  TASKINER™ ENTRY POINT v4.0
// Autor: Szymon Pochopień
// Cel: Inicjalizacja aplikacji React + styl globalny + PWA-ready
// ============================================================

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

// ============================================================
//  CREATE ROOT & RENDER APP
// ============================================================

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ============================================================
//  SERVICE WORKER LOGIKA
// ============================================================

// 🔹 1. DEV HELPER — usuń starego SW w trybie deweloperskim
if (import.meta.env.MODE === "development" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister().then(() => {
        console.log("🧹 Stary Service Worker został usunięty (dev mode)");
      });
    });
  });
  console.log("🧩 Service Worker pominięty w trybie deweloperskim");
}

// 🔹 2. PRODUKCJA — rejestracja SW tylko po buildzie (Vercel / serve dist)
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) =>
        console.log("✅ Service Worker zarejestrowany:", reg.scope)
      )
      .catch((err) =>
        console.error("❌ Błąd rejestracji SW:", err)
      );
  });
}