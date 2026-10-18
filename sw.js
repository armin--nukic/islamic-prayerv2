// Service Worker for offline support and caching
const CACHE_NAME = "islamic-prayer-times-v13";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./config.js",
  "./hadith-data.js",
  "./manifest.json",
  "./assets/logo.svg",
];

// Install event - cache files
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE)),
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", function (event) {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip API requests to external services
  if (
    event.request.url.includes("aladhan.com") ||
    event.request.url.includes("openstreetmap.org") ||
    event.request.url.includes("nominatim")
  ) {
    event.respondWith(
      fetch(event.request).catch(function () {
        // Return offline message for API calls
        return new Response("Offline - API not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }),
    );
    return;
  }

  // For all other requests, try cache first, then network
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function (response) {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type === "error"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(function () {
        // Return offline page or placeholder
        return new Response("Offline - Page not cached", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }),
  );
});

// Handle messages from clients
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
