// ============================================================
//  TASKINER™ SERVICE WORKER v4.3
//  Autor: Szymon Pochopień
//  Cel: Auto-update, cache control i pełne wsparcie PWA offline
// ============================================================

const CACHE_NAME = "taskiner-cache-v4.3";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// 🔧 Lokalny tryb dev — pomijamy SW, by nie zakłócać hot reload
const isLocalhost =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1";

// ============================================================
//  INSTALL — Dodaj do cache i aktywuj natychmiast nową wersję
// ============================================================
self.addEventListener("install", (event) => {
  if (isLocalhost) return;
  console.log("📦 Instalacja nowego Service Workera...");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(URLS_TO_CACHE);
      self.skipWaiting(); // ⚡ natychmiast aktywuj nową wersję
    })()
  );
});

// ============================================================
//  ACTIVATE — Usuń stare cache + przejmij kontrolę
// ============================================================
self.addEventListener("activate", (event) => {
  if (isLocalhost) return;
  console.log("♻️ Aktywacja nowego SW i czyszczenie starych cache...");

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );

      // 🔁 Automatycznie odśwież klientów (np. zainstalowane PWA)
      const clientsList = await self.clients.matchAll({ type: "window" });
      for (const client of clientsList) {
        client.navigate(client.url);
      }

      await self.clients.claim();
    })()
  );
});

// ============================================================
//  FETCH — Strategia: cache-first z fallbackiem do sieci
// ============================================================
self.addEventListener("fetch", (event) => {
  if (isLocalhost) return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// ============================================================
//  MESSAGE — Komenda z aplikacji (np. SKIP_WAITING z main.jsx)
// ============================================================
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("⚡ Otrzymano SKIP_WAITING → aktywacja nowej wersji");
    self.skipWaiting();
  }
});
