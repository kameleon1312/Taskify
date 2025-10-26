// ============================================================
//  TASKINER™ ENTRY POINT v4.2
//  Autor: Szymon Pochopień
//  Cel: React init + Global Styles + PWA auto-update (mobile ready)
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

// 🔹 DEV: usuń starego SW lokalnie
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

// 🔹 PROD: rejestracja SW
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker zarejestrowany:", registration.scope);

        // 🔁 Monitorowanie aktualizacji
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("🔄 Nowa wersja Taskiner dostępna!");
                showUpdateBanner(registration);
              }
            };
          }
        };

        // 🕐 Sprawdzaj aktualizacje co 1 minutę (działa też w PWA)
        setInterval(() => {
          registration.update();
        }, 60000);
      })
      .catch((err) => console.error("❌ Błąd rejestracji SW:", err));
  });
}

// ============================================================
//  🔔 FUNKCJA: BANNER AKTUALIZACJI
// ============================================================

function showUpdateBanner(registration) {
  const banner = document.createElement("div");
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
      font-family: Inter, sans-serif;
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

  // Odśwież po aktywacji nowego SW
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}
