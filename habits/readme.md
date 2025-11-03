

On onload in habit_main.js:
- the application is calling checkPWA();
    - checkPWA is updating the version number on html with the version in pwa.js, and the last-current-date on html with the current date and hour calculated on pwa.js (as soon as pwa is loaded). It is then going in checkForDay, which : 
        - gets the current date and hour again. If different (will not be different when called from checkPWA, which gets the current data and hour before calling checkForDay), then we call refreshPageUnregisterIfNewVersion, which:
            - checks if new version, and if new version, it uninstalls the service workers and reloads the page 
        - if the day is different, we reload the page
    - after that, just in case, checkPWA is checking if new version, and if yes, displays a page to ask the user if he wants a new version

    checkForDay is called independently every 10 minutes (interval kicked off in saveLoop)
    Checking if there is new version is done by calling an API /version.

    If version 1 is cached and the application is offline, I refresh:
    service worker version 1 takes the version 1 cache, including html page, js, resources
    Checkforday is doing nothing because there is no date difference. No new version is there because I am offline.
    Every 10 minutes, checkforday is called. On top of the hour, refreshPageUnregisterIfNewVersion is called but the api cannot be called, so there is no new version. Nothing is done.
    If application is online and a new version is available (new version returned by backend on api call), without refreshing:
    on the top of the hour, checkforday is launched, sees there is a new version from the API, so deletes the service worker and reloads the page. As the service worker is deleted, the cached cannot be fetched, so upon refresh of the page, all new elements are fetched and put in a cache with the new version number when the service worker is installing. The old cache is removed upon service worker activation. 

    There is a difference between static cache and dynamic cache in the service worker, but it seems only the static cache is in place.

- the application is calling renderApplication
    renderApplication is calling getHabitProgressJournalFromStorage as on the first step, the user is not logged in yet and so we cannot (and do not want to) make a call to the API. We prefer to wait for the login to be confirmed, to make things in the right order
    Then renderApplication based on the result is building the DOM.
    If it is the first time of the day that the refresh of the page is done, it will create new progress bricks for the day.

    If once the DOM is built and before the login happens, the user enters progress, or progress bricks are created as indicated above, then the additions or updates are sent to the api queue

    Once the login is done (with google), handleCredentialResponse is called, which will:
    - put the login (to the discipline server) at the beginning of the queue
    - read the queue to make the appropriate calls to the server (including the additions and update introduced earlier)
    When reading the queue with a login entry, setItemWithAPI is adding new progresses and refreshing the dom, which erases everything and puts entries from the database

check:
- if before that the queue has the addition of new progresses
- refreshDOM is indeed calling getall, indeed getting results from it for today and indeed adding the elements

==> for some strange reason getall is pulling only 4 elements out of 6 (when debugging). it seems that if getall is happening too early, it is missing updates that you make .

TODO: check if necessary to add everything.
-  ON HOLD: call in a delayed manner refreshDOM to give the time to make the updates


handleCredentialResponse is pushing in the queue the login + the refresh
handleCredentialResponse is called as a callback when the google login is successful




