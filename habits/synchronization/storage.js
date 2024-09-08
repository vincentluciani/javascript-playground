"use strict";

/* TODO PUT FAILED UPDATES THROUGH APIS IN A QUEUE ON LOCAL STORAGE OR COOKIES */
var getPreviousElements = async function(){
    if (loggedIn){
        var currentDateTime = new Date();

        const localDateTimeObject = {
            year: currentDateTime.getFullYear(),
            month: currentDateTime.getMonth() + 1,
            day: currentDateTime.getDate(),
            dayOfWeek: currentDateTime.getDay(),
            hours: currentDateTime.getHours(),
            minutes: currentDateTime.getMinutes(),
            seconds: currentDateTime.getSeconds(),
            milliseconds: currentDateTime.getMilliseconds(),
            timeZoneOffset: currentDateTime.getTimezoneOffset,
          };

        var url = `habits/getall`;
        var response;
        var input = {
            /*token: applicationToken,*/
            requestDateTime: localDateTimeObject
        }

        response = await fetchPost(url,input);

        if (null != response && response != false){
            return response;
        } else {
            return getHabitProgressJournalFromStorage();
        }

    } else {

        return getHabitProgressJournalFromStorage();
    }
}
var getHabitProgressJournal = async function() {

    if (loggedIn){

        var currentDateTime = new Date();

        const localDateTimeObject = {
            year: currentDateTime.getFullYear(),
            month: currentDateTime.getMonth() + 1,
            day: currentDateTime.getDate(),
            dayOfWeek: currentDateTime.getDay(),
            hours: currentDateTime.getHours(),
            minutes: currentDateTime.getMinutes(),
            seconds: currentDateTime.getSeconds(),
            milliseconds: currentDateTime.getMilliseconds(),
            timeZoneOffset: currentDateTime.getTimezoneOffset()
          };

        var url = `habits/getalltoday`;
        var response;
        var input = {
            /*token: applicationToken,*/
            requestDateTime: localDateTimeObject
        }

        response = await fetchPost(url,input);

        if (null != response){
            return response;
        } else {
            return getHabitProgressJournalFromStorage();
        }
 
    } else {

        return getHabitProgressJournalFromStorage();
    }
    
}

var getHabitProgressJournalFromStorage = function(){
    var progressArray=[];
    var habitsArray=[];
    var journalArray = [];
    var todaysProgressArray=[];
    var pastProgressArray=[];
    var localStorageLength = localStorage.length;

    for (var i = 0; i < localStorageLength; i++){
        var currentKey = localStorage.key(i);

        if (    currentKey.indexOf("progress-") < 0 && 
                currentKey.indexOf("habit-") < 0 &&
                currentKey.indexOf("journal-") < 0){
                    continue
        }

        var progressValueString = localStorage.getItem(currentKey);
        var progressValue = JSON.parse(progressValueString);

        if ( currentKey.indexOf("progress-") >= 0){

            if ( progressValue.progressDate == formattedTodaysDate()){
                todaysProgressArray.push(progressValue);
            } else if (daysSinceToday(progressValue.progressDate)<=30) {
                pastProgressArray.push(progressValue);
            }
            progressArray.push(progressValue);
        } else if ( currentKey.indexOf("habit-") >= 0){
            habitsArray.push(progressValue);
        } else if ( currentKey.indexOf("journal-") >= 0){
            journalArray.push({'key':currentKey,'text':progressValue.text, 'journalDate':progressValue.journalDate});
        }
    }
    return {progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray};
}

var removeItemByKey = async function(keyName) {

        window.localStorage.removeItem(keyName);
        var keyNameParts = keyName.split("-");
        
        var storageType = keyNameParts[0];
        if (storageType=='habit'){
            storageType='habits';
        }
        var url=`${storageType}/delete`;
        var id = keyNameParts[1];

        if (loggedIn){
            var response;
                var input = {
                    /*token: applicationToken,*/
                    id: id
                }
        
            response = await fetchPost(url,input);

            return response
        } else {
            return null;
        }

}


/* format of keyName is informationtype-YYYY-MM-DD. For example journal-2024-09-01. */
var getItemByKey = async function(keyName) {
    var keyNameParts = keyName.split("-");
    if (loggedIn && keyNameParts.length >= 4){
        var url = keyNameParts[0]+"/get";
        var response;
        var input = {
            requestDate: keyNameParts[1]+"-"+keyNameParts[2]+"-"+keyNameParts[3]
        }

        response = await fetchPost(url,input);

        if (null != response){
            return response;
        } else {
            return window.localStorage.getItem(keyName);
        }

    } else {
        var itemValue = window.localStorage.getItem(keyName);

        if (null != itemValue){
            console.log('item got from memory:'+itemValue);
        }
        return JSON.parse(itemValue);
    }

}


var setItemWithAPI = async function(keyName, jsonValue) {

    var url="";
    var refreshResponse;
    
    /*var jsonValue = JSON.parse(value);*/

    var keyNameParts = keyName.split("-");

    if (loggedIn || keyNameParts[0] == "login"){
        
        if ( (null == jsonValue.token || jsonValue.token == "")){
            jsonValue.token = applicationToken;
    
            var currentDateObject = new Date();
            var expiryDateObject = new Date(tokenExpiry);
            var differenceInMillisecond = expiryDateObject.getTime() - currentDateObject.getTime();
            if (!differenceInMillisecond || differenceInMillisecond <= 500){
                refreshResponse = await refreshToken();
            }
        }
        
        /*var ulrStart = 'https://www.vince.com/api/discipline';*/
        /*var urlStart = 'http://localhost:3000';*/

        if (keyNameParts[0] == "progress"){
           url = "progress/add";

        } else if  (keyNameParts[0] == "habit"){
            url = "habits/add";
        } else if (keyNameParts[0] == "journal"){
            url = "journal/add";
        } else if (keyNameParts[0] == "login"){
            var response = await sendToken(jsonValue.token);

            tokenExpiry = response.tokenExpiry;

            await storeUserInformation(response);



            if ( null != response && null != response.authenticated){
                /*applicationToken = response.applicationJwtToken;*/
                /*setUpRegularRefresh(tokenExpiry);*/
                setUpRegularRefresh();
                loggedIn = true;
                /*readQueueAPI();*/
                document.getElementById('api-refresh').style.display='flex';
                
                return response;
            }
             
        }
        try{
            var response =  response = await fetchPost(url,jsonValue);
            
            /*await fetch
                (url,{
                    method: "POST",
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonValue)
                    });*/
            } catch (e) {
                console.log('could not connect to the server');
                console.log(e);
                response = null;
            } 
        if (response.status == '200'){
            var apiResponse = await response.json();
            /* todo : apiResponse._id must update the id of the element if it is has been created from scratch*/
            return apiResponse;
        } else {
            console.log('status of the api call:'+response.status);
        }
    }
    console.log('item set:'+keyName+":"+jsonValue.toString());
    return response;

}
/*
async function setUpRegularRefresh(expiryDate) {
    var currentDateObject = new Date();
    var expiryDateObject = new Date(expiryDate);
    var differenceInMillisecond = expiryDateObject.getTime() - currentDateObject.getTime();
    if (differenceInMillisecond && differenceInMillisecond > 0){
        var interval = setInterval(launchRefresh, differenceInMillisecond - 1000);
    } else {
        await refreshToken();
    }
}*/
async function setUpRegularRefresh() {
    var intervalTime = 10*60*1000;
    setInterval(launchRefresh, intervalTime);

}

var launchRefresh = function(){
    refreshToken().then(value=>{
        console.log(value);
    }, reason=>{
        console.error(reason);
    })
}


async function getDataById(id) {
    try {
      /* Open a database connection.*/
      const db = await openDB();
  
      /* Create a transaction and get the object store.*/
      const transaction = db.transaction(["informationStore"], "readonly");
      const objectStore = transaction.objectStore("informationStore");
  
      /* Use the get method to retrieve data by key (id).*/
      const request = objectStore.get(id);
  
      /* Handle the result or error using await.*/
      const data = await new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        }
      });
  
      /* Close the database connection. */
      db.close();
  
      if (data) {
        console.log("Data found:", data);
        return data
      } else {
        console.log("Data not found for id:", id);
        return null
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null
    }
  }
  
  async function deleteEntry(id) {
    try {
      /* Open a database connection.*/
      const db = await openDB();
  
      /* Create a transaction and get the object store.*/
      const transaction = db.transaction(["informationStore"], "readwrite");
      const objectStore = transaction.objectStore("informationStore");
  
      /* Use the get method to retrieve data by key (id).*/
      const request = objectStore.delete(id);
  
      /* Handle the result or error using await.*/
      await new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve(id);
        };
        request.onerror = () => {
            reject(request.error);
        }
      });
  
      /* Close the database connection. */
      db.close();
  
    } catch (error) {
      console.error("Error deleting data:", error);
      return null
    }
  }

var storeUserInformation = async function(information) {

    try {
        /* Open a database connection.*/
        var db = await openDB();
    
        /* Create a transaction and get the object store.*/
        var transaction = db.transaction(["informationStore"], "readwrite");

        var objectStore = transaction.objectStore("informationStore");
    
        /* Define the data you want to insert.*/
        var data = {    "key": "retain",
                        /*"picture": information.picture, 
                        "givenName": information.givenName,*/
                        "refreshTokenExpiry": information.refreshTokenExpiry,
                        "tokenExpiry": information.tokenExpiry };
    
        /* Use the add method to insert the data.*/
        await new Promise((resolve, reject) => {
        var request = objectStore.put(data);
        request.onsuccess = () => {
            resolve();
        }
        request.onerror = () => {
            reject(request.error);
        }
        });
    
        /* Close the database connection.*/
        db.close();
    
        console.log("Data inserted successfully");
    } catch(e){
        console.error(e);
    }
  }
  
  function openDB() {
    return new Promise((resolve, reject) => {
        /* increment the version number each time you change the schema
        if you open x while there is y > x in the user browser, it will crash */
      const request = window.indexedDB.open("myDatabase", 8); 
      /* Specify the database name and version */
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("informationStore")) {
          db.createObjectStore("informationStore", { keyPath: "key" });
        }
      };    
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
  

    
// var updateParameterInItemValue = async function(keyName, parameterName, value){

//     var jsonValue;
//     var objectValue;

//     var response = await getItemByKey(keyName);

//     if (typeof response === 'string' || response instanceof String){
//         jsonValue = JSON.parse(response);
//     } else {
//         jsonValue = response;
//     }
//     jsonValue[parameterName]=value;

//     objectValue = JSON.stringify(jsonValue);
//     console.log("object got from memory before update");
//     console.log(objectValue);
//     var status = await setItem(keyName,objectValue);
//     console.log("update executed");
       
//     if (loggedIn){
//         var APIcallParameters = {
//         method: "GET",
//         url: `https://www.vince.com/api/discipline/habits/get?keyName=${keyName}&parameterName=${parameterName}&value=${value}&user="${apiUser}"`
//         };

//         response='';
//         try {
//             response = await APICall(APIcallParameters);
//         } catch (e) {
//             console.log(e);
//         } 
//     }
//      console.log('item set:'+keyName+":"+value);
//      return response

// }

var resetStorage = function(){
    window.localStorage.clear();
}


/*
var resetMemory = function(){
    resetHabits();
    resetProgress();
}


var resetElement = function(elementType){
    for (var i = 0; i < localStorage.length; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf(elementType+"-") >= 0){
            window.localStorage.removeItem(currentKey);
        } 
    }
}

var resetProgress = function(){
    var progressElements = document.getElementsByClassName("habit-update");

    for ( var progressElement of progressElements){
        progressElement.parentNode.removeChild(progressElement);
    }

    resetElement("progress");

}

var resetHabits = function(){
    var progressElements = document.getElementsByClassName("habit-setting");

    for ( var progressElement of progressElements){
        progressElement.parentNode.removeChild(progressElement);
    }

    resetElement("habit");

}

*/