"use strict";
var loggedIn = true;

var getHabitProgressJournal = async function() {

    if (loggedIn){
        var APIcallParameters = {
            method: "GET",
            url: "http://localhost:5000/get-habit-progress-journal"
        };
        var response;
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
        } 

        return response

    } else {

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
    
}
var removeItemByKey = async function(keyName) {

        window.localStorage.removeItem(keyName);

        var APIcallParameters = {
            method: "GET",
            url: `http://localhost:5000/removeItemByKey?keyName=${keyName}`
        };

        var response;
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
        } 
        console.log('item removed');
        return response

}
var getItemByKey = async function(keyName) {

    if (loggedIn){
        var APIcallParameters = {
            method: "GET",
            url: `http://localhost:5000/getItemByKey?keyName=${keyName}`
        };

        var response;
        try {
            response = await APICall(APIcallParameters);
        } catch (e) {
            console.log(e);
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

    var APIcallParameters = {
        method: "GET",
        url: `http://localhost:5000/setItemValue?keyName=${keyName}&value=${value}`
    };

    var response;
    try {
        response = await APICall(APIcallParameters);
    } catch (e) {
        console.log(e);
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
       

    /* CAREFULL TO REMOVE THE RESOLVE CALL ABOVE */
    var APIcallParameters = {
    method: "GET",
    url: `http://localhost:5000/updateParamInItem?keyName=${keyName}&parameterName=${parameterName}&value=${value}`
     };

     response='';
     try {
         response = await APICall(APIcallParameters);
     } catch (e) {
         console.log(e);
     } 
     console.log('item set:'+keyName+":"+value);
     return response


}



var asyncTestRunner = async function(){
    var response = await getHabitProgressJournal();
    console.log('test: response from getHabitProgressJournal');
    console.log(response);
    var response2 = await getItemByKey('progress-164655054444102');
    console.log('test: content of progress-164655054444102');
    console.log(response2); 
    var response3 = await setItem('test-1','{"param1":"test11","param2":"test12"}');
    var response4 = await setItem('test-2','{"param1":"test21","param2":"test22"}');
    var response5 = await getItemByKey('test-1');
    console.log('test:test-1 after insertion');
    console.log(response5); 
    var response6 = await getItemByKey('test-2');
    console.log('test:test-2 after insertion');
    console.log(response6); 
    var response7 = await removeItemByKey('test-2');
    var response8 = await getItemByKey('test-1');
    console.log('test:test-1 after deletion of test-2');
    console.log(response8); 
    var response9 = await getItemByKey('test-2');
    console.log('test:test-2 after deletion');
    console.log(response9); 
    
    var response9b = await updateParameterInItemValue("test-1", "param2", "abc");
    var response10 = await getItemByKey('test-1');
    console.log('test:test-1 after update');
    console.log(response10); 

}

var test = function(){
    asyncTestRunner()            
    .then(function(response){
        console.log("test completed");
    }    )    
    .catch(function(error) {
        console.log(error);
    })
}
test();


