let cacheName = "discipline-pwa";
let filesToCache = ["/",
                    "/index.html",
                    "https://fonts.googleapis.com/css?family=Nunito",
                    "https://use.fontawesome.com/372afdc18b.js"];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache.map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, { mode: 'no-cors' });
     }));
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});