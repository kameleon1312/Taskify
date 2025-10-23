// ============================================================
//  TASKIFY™ ENTRY POINT v3.1
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
//  PWA SERVICE WORKER (opcjonalnie)
// ============================================================
// Jeżeli chcesz aktywować tryb offline, odkomentuj poniższy blok
// i dodaj `service-worker.js` w katalogu głównym projektu.
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker zarejestrowany:', reg.scope))
      .catch((err) => console.error('❌ Błąd rejestracji SW:', err));
  });
}
*/
