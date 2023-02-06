"use strict";


/* TODO PUT FAILED UPDATES THROUGH APIS IN A QUEUE ON LOCAL STORAGE OR COOKIES */

var getHabitProgressJournal = async function() {


    if (loggedIn){
        var url = `https://www.vince.com/api/discipline/habits/getall`;
        var response;
        var input = {
            token: googleToken
        }
        try {
            response = await fetch
            (url,{
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(input)
                });
        } catch (e) {
            console.log('could not connect to the server');
            console.log(e);
            return getHabitProgressJournalFromStorage();
        } 
        if (response.status == '200'){
            var apiResponse = await response.json();
            return apiResponse;
        } else {
            console.log('status of the api call:'+response.status);
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
        if ( currentKey.indexOf("progress-") >= 0){
            var progressValue = JSON.parse(localStorage.getItem(currentKey));
            if ( progressValue.progressDate == formattedTodaysDate()){
                todaysProgressArray.push(progressValue);
            } else if (daysSinceToday(progressValue.progressDate)<=30) {
                pastProgressArray.push(progressValue);
            }
            progressArray.push(progressValue);
        } else if ( currentKey.indexOf("habit-") >= 0){
            habitsArray.push(JSON.parse(localStorage.getItem(currentKey)));
        } else if ( currentKey.indexOf("journal-") >= 0){
            journalArray.push({'key':currentKey,'text':JSON.parse(localStorage.getItem(currentKey))});
        }
    }
    return {progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray};
}

var removeItemByKey = async function(keyName) {

        window.localStorage.removeItem(keyName);

        if (loggedIn){
            var APIcallParameters = {
                method: "GET",
                url: `http://localhost:5000/removeItemByKey?keyName=${keyName}&user="${apiUser}"`
            };

            var response;
            try {
                response = await APICall(APIcallParameters);
            } catch (e) {
                console.log(e);
            } 
        }
        console.log('item removed');
        return response

}
var getItemByKey = async function(keyName) {

    if (loggedIn){
        var APIcallParameters = {
            method: "GET",
            url: `http://localhost:5000/getItemByKey?keyName=${keyName}&user="${apiUser}"`
        };

        var response;
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
            return window.localStorage.getItem(keyName);
        } 
        return response

    } else {
        var itemValue = window.localStorage.getItem(keyName);
        console.log('item got from memory:'+itemValue);
        return itemValue;
    }

}
var setItem = async function(keyName, value) {
    var url=""
    window.localStorage.setItem(keyName, value);
    var jsonValue = JSON.parse(value);
    jsonValue.token = googleToken;

    if (loggedIn){
        var keyNameParts = keyName.split("-")
        if (keyNameParts[0] == "progress"){
            url = "https://www.vince.com/api/discipline/progress/add";
        } else if  (keyNameParts[0] == "habit"){
            url = "https://www.vince.com/api/discipline/habits/add";
        }
        try{
            var response = await fetch
                (url,{
                    method: "POST",
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonValue)
                    });
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
    console.log('item set:'+keyName+":"+value);
    return response

}
var updateParameterInItemValue = async function(keyName, parameterName, value){

    var jsonValue;
    var objectValue;

    var response = await getItemByKey(keyName);

    if (typeof response === 'string' || response instanceof String){
        jsonValue = JSON.parse(response);
    } else {
        jsonValue = response;
    }
    jsonValue[parameterName]=value;

    objectValue = JSON.stringify(jsonValue);
    console.log("object got from memory before update");
    console.log(objectValue);
    var status = await setItem(keyName,objectValue);
    console.log("update executed");
       
    if (loggedIn){
        var APIcallParameters = {
        method: "GET",
        url: `https://www.vince.com/api/discipline/habits/get?keyName=${keyName}&parameterName=${parameterName}&value=${value}&user="${apiUser}"`
        };

        response='';
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
        } 
    }
     console.log('item set:'+keyName+":"+value);
     return response

}

