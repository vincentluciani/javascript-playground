let cacheName = "discipline-pwa-v6";
let filesToCache = ["./index.html",
                    "https://fonts.googleapis.com/css?family=Nunito"];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    // caches.open(cacheName).then(function (cache) {
    //   return cache.addAll(filesToCache.map(function(urlToPrefetch) {
    //     return new Request(urlToPrefetch, { mode: 'no-cors' });
    //  }));
    // })
    caches.open(cacheName)
    .then(cache => cache.addAll([
      './index.html'
    ]))
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

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
