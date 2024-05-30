var currentApplicationVersion="24";
var versionFromServer;

var currentDateTimePWA = new Date();
console.log("starting javascript:"+currentDateTimePWA.toString());

var checkPWA = function(){
    document.getElementById("application-version").innerHTML = "version: "+currentApplicationVersion;
    document.getElementById('last-current-date').innerHTML = formatDateHour(currentDateTimePWA);
    checkForDay();

    /* this is in fact just in case */
    isNewVersion().then(
        value => {
            if (value){
                document.getElementById('new-version').style.display="block";
            }
        }
    ).catch(e=>{
        document.getElementById('sw-version').innerHTML = e.toString();
        console.error(e);
    })

    if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js?version='+versionFromServer).then((registration) => {
    console.log('registerin');
    const checkForUpdates = () => {
      registration.update().then(() => {
        const newWorker = registration.installing;
        console.log('registration.installing');
      });
    };

  }).catch(errorMessage=>{
    console.error(errorMessage);
    });
};

};



document.addEventListener('visibilitychange', function (event) {
    if (document.hidden) {
        console.log('not visible');
    } else {
        checkForDay();
    }
});

window.addEventListener('focus', function (event) {
    checkForDay();
});

var clearBadge = function(){
    if (navigator.clearAppBadge) {
        navigator.clearAppBadge();
    }
};

var uninstallSw = function(){
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.getRegistrations()
        .then(function(registrations){
            for (var i=0; i< registrations.length; i++){
                registrations[i].unregister();
            }
        })
    }
};

var uninstallSwAsync = async function() {
    if ('serviceWorker' in navigator) {
        try {
            const registrations = await navigator.serviceWorker.getRegistrations();
            
            for (let i = 0; i < registrations.length; i++) {
                await registrations[i].unregister();
            }
        } catch (error) {
            console.error('Error during service worker uninstallation:', error);
        }
    }
};
var getListOfSw = function(){
    var debugDiv = document.getElementById('registrations');
    debugDiv.innerHTML = "";
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations){
        registrations.forEach(function(registration){
            debugDiv.innerHTML+=registration.active.scriptURL;
        })
    })
};

var deleteAllSw = function(){
    var debugDiv = document.getElementById('registrations');
    debugDiv.innerHTML = "";
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations){
        registrations.forEach(function(registration){
            registration.unregister();
        })
    })
};



var installApplication=function(){
    const promptEvent = window.deferredPrompt;
    if (promptEvent){
        promptEvent.prompt();
        promptEvent.userChoice.then(function(choiceResult){
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === 'dismissed'){
            console.log('user cancelled the installation');
        } else {
            console.log('user added to home screen');
        }
        window.deferredPrompt = null;
        })
    }
};

var refreshPageUnregisterIfNewVersion = function() {

    isNewVersion().then(
        value => {
            if (value){
                uninstallSwAsync().then(function(){
                window.location.reload();
                });
            } 
        }
    ).catch(e=>{
        console.error(e);
        window.location.reload();
    })
   
};


var isNewVersion = async function(){
    /*var versionFromServiceWorker = await getDataById("version");*/
    versionFromServer = await getNewVersion();

    if (versionFromServer && versionFromServer.version){
        document.getElementById('sw-version').innerHTML = "software version:"+versionFromServer.version;
        
        return (versionFromServer.version != currentApplicationVersion);
    } else {
        document.getElementById('sw-version').innerHTML = "could not find new version from server";
        
        return false;
    }   
    
};

var formatDateHour = function(dateToFormat){
    return dateToFormat.getFullYear().toString().padStart(2,'0')+'-'+(dateToFormat.getMonth()+1).toString().padStart(2,'0')+'-'+dateToFormat.getDate().toString().padStart(2,'0')+':'+dateToFormat.getHours().toString().padStart(2,'0'); 
};

var checkForDay = function(){

    /* On a new day we need to refresh anyway because a new day of habit is starting */
    /* on each new hour we check if there is a new version of the software.
       if there is we need to unregister the service worker to avoid caching and then 
       refresh the page */
    
    var newCurrentDateTimePWA = new Date();

    var newCurrentDateHour = formatDateHour(newCurrentDateTimePWA);
    var oldCurrentDateHour = formatDateHour(currentDateTimePWA);
   
    var newCurrentDate = formatDate(newCurrentDateTimePWA);
    var oldCurrentDate = formatDate(currentDateTimePWA);

    document.getElementById('current-time').innerHTML = newCurrentDateTimePWA.toString();
    document.getElementById('last-current-date').innerHTML = oldCurrentDate;
    document.getElementById('new-current-date').innerHTML = newCurrentDate;

    if (newCurrentDateHour > oldCurrentDateHour){
        refreshPageUnregisterIfNewVersion(); 
    } 
    /* If the previous statement reloaded the page then we start from scratch anyway
    and the page reloads as expected. If not then this is our second chance to reload 
    the page, if we are on a new day */ 
    if (newCurrentDate > oldCurrentDate){
        window.location.reload();
    }

};

var getNewVersion = async function(){
    try{
        var response = await fetch(apiURL+'/version',{credentials:'include'})
    } catch (e) {
            console.log('could not connect to the server to check the current version');
            console.log(e);
            response = null;
    } 
    if (response && response.status == '200'){
        var apiResponse = await response.json();
        return apiResponse;
    }

}
window.addEventListener('beforeinstallprompt',function(event){
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    window.deferredPrompt=event;
});


var sendNotification = function(title,message){
    if (navigator.setAppBadge) {
        navigator.setAppBadge(2);
    }
    if ('serviceWorker' in navigator){
        var options = {
            body: message,
            icon:'/discipline/images/icons/app-icon-96x96.png',
            image: '/discipline/images/man_victory_stadium.jpg',/*big image*/
            dir:'ltr',
            lang:'en-US',
            vibrate: [100,50,200],
            badge: '/discipline/images/icons/app-icon-96x96.png',
            tag: 'registration',/* two notifications with the same tag replace each other*/
            renotify: true, /* do not vibrate if next notification of same tag*/
            actions:[
                {action:'confirm',title:'ok',icon:'/pwa_test/images/icons/app-icon-96x96.png'},
                {action:'cancel',title:'cancel',icon:'/pwa_test/images/icons/app-icon-96x96.png'},
            ]
        }
        navigator.serviceWorker.ready
        .then(function(swreg){
            document.getElementById('test-message').innerHTML = "{"+title+"}"+"{"+options.body.toString()+"}";
            swreg.showNotification(title,options);
        })
    }
};

var askForNotificationPermission = function(){
    Notification.requestPermission(function(result){
        console.log('User choice',result);
        if (result !== 'granted'){
            console.log('not allowed');
        } else {
            sendNotification('test message','permission granted');
        }
    });
};


