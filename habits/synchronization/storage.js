"use strict";


/* TODO PUT FAILED UPDATES THROUGH APIS IN A QUEUE ON LOCAL STORAGE OR COOKIES */

var getHabitProgressJournal = async function() {


    if (loggedIn){
        var url = `http://localhost:5000/get-habit-progress-journal?user="${apiUser}"`;
        var response;
        try {
            response = await fetch(url);
        } catch (e) {
            console.log('could not connect to the server');
            console.log(e);
            return getHabitProgressJournalFromStorage();
        } 
        if (response.status == '200'){
            return response.json();
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
    window.localStorage.setItem(keyName, value)

    if (loggedIn){
        var APIcallParameters = {
            method: "GET",
            url: `http://localhost:5000/setItemValue?keyName=${keyName}&value=${value}&user="${apiUser}"`
        };

        var response;
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
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
        url: `http://localhost:5000/updateParamInItem?keyName=${keyName}&parameterName=${parameterName}&value=${value}&user="${apiUser}"`
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

