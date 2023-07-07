

On onload in habit_main.js, the application is calling renderApplication
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