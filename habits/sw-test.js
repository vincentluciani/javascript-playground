let version = 38;
let cacheName = "pwa-test-v"+version.toString();
let mainCachedFile = "./poc_pwa.html";

let filesToCache = [mainCachedFile,
                    "https://fonts.googleapis.com/css?family=Nunito"];

const broadcast = new BroadcastChannel('count-channel');

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  console.log("sending a message  from the service worker");
  sendMessage('Service worker speaking: I am going to cache:'+mainCachedFile);
  e.waitUntil(
    // caches.open(cacheName).then(function (cache) {
    //   return cache.addAll(filesToCache.map(function(urlToPrefetch) {
    //     return new Request(urlToPrefetch, { mode: 'no-cors' });
    //  }));
    // })
    caches.open(cacheName)
    .then(
      cache => cache.addAll(
        [mainCachedFile]
      )
    )
  )
});
/* https://lightmap.dev/how-to-invalidate-service-worker-cache-on-every-update*/


/* Serve cached content when offline */
self.addEventListener('fetch', (event) => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith((async () => {
    // Try to get the response from a cache.
    const cachedResponse = await caches.match(event.request);
    // Return it if we found one.
    if (cachedResponse) return cachedResponse;
    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  })());
});


var sendMessage = function(message){
    broadcast.postMessage({ payload: message });
}
   
broadcast.onmessage = (event) => {
  if (event.data & event.data.type === 'INCREASE_COUNT') {
    broadcast.postMessage({ payload: 'test' });
  }
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
    caches.keys().then(function(names) {
      for (let name of names)
        if (name != cacheName){
          caches.delete(name);
        }
  });
  }
};


