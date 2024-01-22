var versionNumber = '2024012218';

var CACHE_STATIC = 'static_'+versionNumber;
var CACHE_DYNAMIC = 'dynamic_'+versionNumber;

var sendNotification = function(message){
    var options = {
        body: '{Service worker} message from the service worker ...',
        icon:'/pwa_test/images/icons/app-icon-96x96.png',
        //image: '/pwa_test/images/man_victory_stadium.jpg',//big image
        dir:'ltr',
        lang:'en-US',
        vibrate: [100,50,200],
        badge: '/pwa_test/images/icons/app-icon-96x96.png',
        tag: 'service-worker',// two notifications with the same tag replace each other
        renotify: true, // do not vibrate if next notification of same tag
    }
    self.registration.showNotification('Push Notification from service worker', options)
 
}
var listOfStaticFilesToCache = [
    '/pwa_test',
    '/pwa_test/',
    '/pwa_test/index.html',
    '/pwa_test/images/man_victory_stadium.jpeg',
    'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshdTQ3j6zbXWjgeg.woff2'
   ]

self.addEventListener('install', function(event){
    console.log('{Service worker} installing service worker...',event);
    //sendNotification('installing service worker');

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
    //sendNotification('activating service worker')

 
    event.waitUntil(
        caches.keys()
        .then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC){
                    console.log('{Service worker} removing old cache',key);
                    // self.clients.matchAll().then(clients => {
                       
                    //     clients.forEach(client => {
                    //         client.postMessage({ action: 'sendInformation', information: 'new version arrived' });
                    //     });
                    // });
                    
                    return caches.delete(key);
                }
            }))
        })
        /*.then(storeVersion)*/
    )
    return self.clients.claim(); /*makes stuff more robust...*/
});

self.addEventListener('fetch',function(event){

   if (isInArray(event.request.url, listOfStaticFilesToCache)){
        event.respondWith(
            caches.match(event.request.url)
        );
    }

});

// async function getDataById(id) {
//     try {
//       /* Open a database connection.*/
//       const db = await openDB();
  
//       /* Create a transaction and get the object store.*/
//       const transaction = db.transaction(["versionStore"], "readonly");
//       const objectStore = transaction.objectStore("versionStore");
  
//       /* Use the get method to retrieve data by key (id).*/
//       const request = objectStore.get(id);
  
//       /* Handle the result or error using await.*/
//       const data = await new Promise((resolve, reject) => {
//         request.onsuccess = () => {
//             resolve(request.result);
//         };
//         request.onerror = () => {
//             reject(request.error);
//         }
//       });
  
//       /* Close the database connection. */
//       db.close();
  
//       if (data) {
//         console.log("Data found:", data);
//         return data
//       } else {
//         console.log("Data not found for id:", id);
//         return null
//       }
//     } catch (error) {
//       console.error("Error retrieving data:", error);
//       return null
//     }
//   }
  
//   async function deleteEntry(id) {
//     try {
//       /* Open a database connection.*/
//       const db = await openDB();
  
//       /* Create a transaction and get the object store.*/
//       const transaction = db.transaction(["versionStore"], "readwrite");
//       const objectStore = transaction.objectStore("versionStore");
  
//       /* Use the get method to retrieve data by key (id).*/
//       const request = objectStore.delete(id);
  
//       /* Handle the result or error using await.*/
//       await new Promise((resolve, reject) => {
//         request.onsuccess = () => {
//             resolve(id);
//         };
//         request.onerror = () => {
//             reject(request.error);
//         }
//       });
  
//       /* Close the database connection. */
//       db.close();
  
//     } catch (error) {
//       console.error("Error deleting data:", error);
//       return null
//     }
//   }

// var storeVersion = async function() {

//     try {
      
    
//         var isValueFound = getDataById("version");
//         if (isValueFound){
//           await deleteEntry("version");
//         };

//         /* Open a database connection.*/
//         var db = await openDB();
  
//         /* Create a transaction and get the object store.*/
//         var transaction = db.transaction(["versionStore"], "readwrite");

//         var objectStore = transaction.objectStore("versionStore");
    
//         /* Define the data you want to insert.*/
//         var data = {  
//             "key":"version",
//             "version":  versionNumber
//         };

//         /* Use the add method to insert the data.*/
//         await new Promise((resolve, reject) => {
//         var request = objectStore.put(data);
//         request.onsuccess = () => {
//             resolve();
//         }
//         request.onerror = () => {
//             reject(request.error);
//         }
//         });
    
//         /* Close the database connection.*/
//         db.close();
    
//         console.log("Data inserted successfully");
//     } catch(e){
//         console.error(e);
//     }
//   }
  
//   function openDB() {
//     return new Promise((resolve, reject) => {
//               /* increment the version number each time you change the schema*/
//       const request = indexedDB.open("myDatabase", 8); 
//       /* Specify the database name and version */
  
//       request.onupgradeneeded = (event) => {
//         const db = event.target.result;
//         if (!db.objectStoreNames.contains("versionStore")) {
//           db.createObjectStore("versionStore", { keyPath: "key" });
//         }
//       };
  
//       request.onsuccess = (event) => {
//         const db = event.target.result;
//         resolve(db);
//       };
  
//       request.onerror = (event) => {
//         reject(event.target.error);
//       };
//     });
//   }
  
