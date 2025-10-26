// ============================================================
//  TASKINER™ ENTRY POINT v4.1
//  Autor: Szymon Pochopień
//  Cel: Inicjalizacja aplikacji React + styl globalny + PWA auto-update
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

// 🔹 1️⃣ DEV HELPER — usuń starego SW w trybie deweloperskim
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

// 🔹 2️⃣ PRODUKCJA — rejestracja SW po buildzie (Vercel / serve dist)
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker zarejestrowany:", registration.scope);

        // 🔁 3️⃣ SPRAWDZANIE AKTUALIZACJI
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.log("🔄 Nowa wersja Taskiner dostępna!");

                // 🔔 Wyświetl subtelny baner o aktualizacji
                showUpdateBanner(registration);
              }
            };
          }
        };
      })
      .catch((err) => console.error("❌ Błąd rejestracji SW:", err));
  });
}

// ============================================================
//  🔔 FUNKCJA: SUBTELNY BANNER AKTUALIZACJI
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

  // Odśwież stronę po aktywowaniu nowego SW
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}
