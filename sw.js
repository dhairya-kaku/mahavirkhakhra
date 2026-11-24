const CACHE_NAME = "mahavir-site-v3";
const APP_SHELL = [
  "./index.html",
  "./about.html",
  "./khakhra.html",
  "./contact.html",
  "./site.css",
  "./site.js",
  "./site-config.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/header-logo.png",
  "./assets/social-preview.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache each asset independently so a missing optional image cannot make
      // the whole worker fail to install.
      await Promise.all(
        APP_SHELL.map(async (asset) => {
          try {
            const response = await fetch(asset, { cache: "reload" });
            if (response.ok) await cache.put(asset, response);
          } catch (error) {
            console.warn("Offline cache skipped:", asset, error);
          }
        }),
      );
    }),
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  )
    return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(
          async () =>
            (await caches.match(request)) || caches.match("./index.html"),
        ),
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
