var versionNumber = '38';

var CACHE_STATIC = 'static_'+versionNumber;
var CACHE_DYNAMIC = 'dynamic_'+versionNumber;

var sendNotification = function(message){
    var options = {
        body: '{Service worker} message from the service worker ...',
        icon:'http://localhost:3000/images/icons/app-icon-96x96.png',
        //image: '/pwa_test/images/man_victory_stadium.jpg',//big image
        dir:'ltr',
        lang:'en-US',
        vibrate: [100,50,200],
        badge: 'http://localhost:3000/images/icons/app-icon-96x96.png',
        tag: 'service-worker',// two notifications with the same tag replace each other
        renotify: true, // do not vibrate if next notification of same tag
    }
    self.registration.showNotification('Push Notification from service worker', options)
 
}
var listOfStaticFilesToCache = [
    "http://localhost:3000/components/full.css",
    "http://localhost:3000/language/general.js",
    "http://localhost:3000/language/english.js",
    "http://localhost:3000/libraries/date.js",
    "http://localhost:3000/libraries/random.js",
    "http://localhost:3000/libraries/http.js",
    "http://localhost:3000/libraries/loadDOMAndWait.js",
    "http://localhost:3000/libraries/pwa.js",
    "http://localhost:3000/habits_main.js",
    "http://localhost:3000/components/checkboxWithTitle.js",
    "http://localhost:3000/components/weekTable.js",
    "http://localhost:3000/components/weekDaySelector.js",
    "http://localhost:3000/components/habit.js",
    "http://localhost:3000/components/journal.js",
    "http://localhost:3000/components/progress.js",
    "http://localhost:3000/components/graph.js",
    "http://localhost:3000/components/dailySummary.js",
    "http://localhost:3000/components/radialprogress.js",
    "http://localhost:3000/components/encourage.js",
    "http://localhost:3000/components/countdown.js",
    "http://localhost:3000/synchronization/pushProgressToQueue.js", 
    "http://localhost:3000/synchronization/storage.js",
    "http://localhost:3000/synchronization/sendPost.js",
    "http://localhost:3000/synchronization/debugTools.js",
    "http://localhost:3000/components/icons.js",
    "http://localhost:3000/components/authentication.js",
    "http://localhost:3000/synchronization/readQueue.js", 
    'http://localhost:3000/',
    'http://localhost:3000/index.html',
    'http://localhost:3000/victory-big-2.webp',
    'http://localhost:3000/manifest.json',
    'http://localhost:3000/resources/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3j6zbXWjgeg.woff2',
    'http://localhost:3000/resources/crowd_cheering_6seconds.mp3',
    'http://localhost:3000/resources/muted-blank.mp4',
    'http://localhost:3000/resources/muted-blank.ogg'
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
   /* var cachePath;
  if (string.indexOf(self.origin) === 0) { 
    cachePath = string.substring(self.origin.length); 
  } else {
    cachePath = string; 
  }
  console.log('{Service Worker} cachePath:',cachePath);
  return array.indexOf(cachePath) > -1;*/
  return array.indexOf(string) > -1;
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
    return self.clients.claim(); 
    });

self.addEventListener('fetch',function(event){

   console.log('{Service worker} looking for url in cache ...',event.request.url);
    
   if (isInArray(event.request.url, listOfStaticFilesToCache)){
        console.log('matched, trying to respond with cache, url: ', event.request.url);
        event.respondWith(
            caches.match(event.request.url)
            .then(
                function(response){
                    if (response){
                        return response;
                    } else {
                        return fetch(event.request)
                        .then(function(res){
                            return caches.open(CACHE_DYNAMIC)
                            .then(function(cache){
                                trimCache(CACHE_DYNAMIC,10);
                                cache.put(event.request.url,res.clone());
                                return res;
                            })
                        })
                        .catch(function(err){
                            return caches.open(CACHE_STATIC)
                                    .then(function(cache){
                                        if (event.request.headers.get('accept').includes('text/html')){
                                            return cache.match('/offline.html');
                                        }
                                    })
                        })
                    } 
                }
            )
        );
    }

});
