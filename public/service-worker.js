// ==============================
// Taskiner Service Worker (v3)
// ==============================

const CACHE_NAME = "taskiner-cache-v3";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
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
  // ⬇️ natychmiastowa aktywacja nowej wersji
  self.skipWaiting();
});

// Aktywacja – usuń stare cache
self.addEventListener("activate", (event) => {
  if (isLocalhost) return;
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      // ⬇️ od razu przejmij kontrolę nad wszystkimi otwartymi klientami
      await self.clients.claim();
      console.log("♻️ Nowy Service Worker aktywowany i cache wyczyszczony");
    })()
  );
});

// Obsługa fetch – cache-first
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