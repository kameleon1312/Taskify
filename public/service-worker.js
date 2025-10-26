// ============================================================
//  TASKINER™ SERVICE WORKER v4.2
//  Autor: Szymon Pochopień
//  Cel: Auto-update, cache control i pełne wsparcie PWA offline
// ============================================================

const CACHE_NAME = "taskiner-cache-v4";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

//  Lokalny tryb dev — pomijamy SW, by nie zakłócać hot reload
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
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// ============================================================
//  ACTIVATE — Usuń stare cache + przejmij kontrolę
// ============================================================
self.addEventListener("activate", (event) => {
  if (isLocalhost) return;
  console.log("♻️ Aktywacja nowego SW i czyszczenie starych cache");

  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
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
          // fallback offline — tylko dla nawigacji
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// ============================================================
//  MESSAGE — Nasłuchuj komendy z aplikacji (np. SKIP_WAITING)
// ============================================================
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("⚡ Otrzymano polecenie SKIP_WAITING → aktywacja nowej wersji");
    self.skipWaiting();
  }
});