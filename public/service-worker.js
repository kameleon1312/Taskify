// ==============================
// Taskiner Service Worker (v2)
// ==============================

const CACHE_NAME = "taskiner-cache-v2";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Czy uruchomiono lokalnie?
const isLocalhost =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1";

// Instalacja – cache tylko w produkcji
self.addEventListener("install", (event) => {
  if (isLocalhost) return;
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Aktywacja – usuń stare cache
self.addEventListener("activate", (event) => {
  if (isLocalhost) return;
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Obsługa fetch – cache-first, ale filtruj nie-HTTP
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
          // fallback offline dla widoków nawigacyjnych
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});