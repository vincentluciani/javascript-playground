var versionNumber = '2023121511';

var CACHE_STATIC = 'static_'+versionNumber;
var CACHE_DYNAMIC = 'dynamic_'+versionNumber;

var listOfStaticFilesToCache = [
    '/pwa_test',
    '/pwa_test/',
    '/pwa_test/index.html',
    '/pwa_test/images/man_victory_stadium.jpeg',
    'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3j6zbXWjgeg.woff2'
   ]

self.addEventListener('install', function(event){
    console.log('{Service worker} installing service worker...',event);
    /* Make sure the cache is prepared */
    event.waitUntil(
        caches.open(CACHE_STATIC)
        .then( function(cache){
            console.log('{Service worker} Precaching App shell');
            cache.addAll(listOfStaticFilesToCache);
        })
        .catch(function(e){
            console.log('cache problem',e);
        })
    );
    self.skipWaiting();
})

function isInArray(string, array){
    var cachePath;
  if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log('matched ', string);
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener('activate', function(event){
    console.log('{Service worker} activating service worker...',event);
    event.waitUntil(
        caches.keys()
        .then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC){
                    console.log('{Service worker} removing old cache',key);
                    return caches.delete(key);
                }
            }))
        })
    )
    return self.clients.claim(); /*makes stuff more robust...*/
});
/*
self.addEventListener('fetch',function(event){

   if (isInArray(event.request.url, listOfStaticFilesToCache)){
        event.respondWith(
            caches.match(event.request.url)
        );
    }

});*/