let newWorker;

    // The click event on the notification
    document.getElementById('reload').addEventListener('click', function(){
    newWorker.postMessage({ action: 'skipWaiting' });
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw-min.js").then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            if (registration.installing) {
                console.log("Service worker installing");
              } else if (registration.waiting) {
                console.log("Service worker installed");
              } else if (registration.active) {
                console.log("Service worker active");
              }
            /* No controller for this page, nothing to do for now.*/
            if (!navigator.serviceWorker.controller) {
                console.log('No service worker controlling this page.');
            }    

            if (registration.waiting) {
                console.log('Service working in skipwaiting state.');
            }

            registration.addEventListener('updatefound', () => 
            {
                /* A wild service worker has appeared in reg.installing! */
                newWorker = registration.installing;
                
                if (newWorker){
                newWorker.addEventListener('statechange', () => {
                    /* Has network.state changed? */
                        switch (newWorker.state) {
                            case 'installed':
                            if (navigator.serviceWorker.controller) {
                            /* new update available */
                                let notification = document.getElementById('notification ');
                                notification.className = 'show';
                            }
                            /* No update available */
                            break;
                        }
                    });
                }
                console.log('Updating service worker.');
                registration.update();
            });
        })/*.catch(function(err) {
              console.log('ServiceWorker registration failed: ', err);
        })*/;
    }


    //   if ('serviceWorker' in navigator) {

    //     navigator.serviceWorker.register('/sw-min.js').then(reg => {
    //         console.log('ServiceWorker registration successful with scope: ', reg.scope);

    //       reg.addEventListener('updatefound', () => {
    //         /* A wild service worker has appeared in reg.installing! */
    //         newWorker = reg.installing;
    
    //         newWorker.addEventListener('statechange', () => {
    //           /* Has network.state changed? */
    //           switch (newWorker.state) {
    //             case 'installed':
    //               if (navigator.serviceWorker.controller) {
    //                /* new update available */
    //                 showUpdateBar();
    //               }
    //               /* No update available */
    //               break;
    //           }
    //         });
    //       });
    //     }).catch(function(err) {
    //         console.log('ServiceWorker registration failed: ', err);
    //       });

    //       let refreshing;
    //       navigator.serviceWorker.addEventListener('controllerchange', function () {
    //         if (refreshing) return;
    //         window.location.reload();
    //         refreshing = true;
    //       });