// ============================================================
//  TASKINER™ ENTRY POINT v4.3
//  Autor: Szymon Pochopień
//  Cel: React Init + Global Styles + PWA Auto-Update (Stable Build)
// ============================================================

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

// ============================================================
//  RENDER APP
// ============================================================
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ============================================================
//  SERVICE WORKER LOGIKA
// ============================================================

// 🔹 DEV: usuń stare SW lokalnie
if (import.meta.env.MODE === "development" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      reg.unregister().then(() => console.log("🧹 SW usunięty (dev mode)"));
    });
  });
  console.log("🧩 Service Worker pominięty w trybie deweloperskim");
}

// 🔹 PROD: rejestracja SW (działa w Vercel + mobilne PWA)
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { updateViaCache: "none" })
      .then((registration) => {
        console.log("✅ SW zarejestrowany:", registration.scope);

        // 🔁 Monitoruj aktualizacje
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.onstatechange = () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("🔄 Nowa wersja Taskiner dostępna!");
              showUpdateBanner(registration);
            }
          };
        };

        // 🕐 Co 1 minutę sprawdzaj aktualizację
        setInterval(() => registration.update(), 60000);

        // 📱 Auto-refresh w tle po zmianie kontrolera
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      })
      .catch((err) => console.error("❌ Błąd rejestracji SW:", err));
  });
}

// ============================================================
//  🔔 FUNKCJA: BANNER AKTUALIZACJI
// ============================================================

function showUpdateBanner(registration) {
  // Usuń stary baner, jeśli istnieje
  const oldBanner = document.querySelector(".update-banner");
  if (oldBanner) oldBanner.remove();

  const banner = document.createElement("div");
  banner.className = "update-banner";
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #4D9FFF, #37D67A);
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      cursor: pointer;
      z-index: 9999;
      animation: fadeIn 0.4s ease;
    ">
      🔄 Nowa wersja Taskiner dostępna — kliknij, by odświeżyć
    </div>
  `;
  document.body.appendChild(banner);

  banner.addEventListener("click", () => {
    banner.textContent = "⏳ Aktualizuję...";
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  });
}
