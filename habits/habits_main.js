
var dataArrays = {}
var loggedIn = false;
var maxForNonLoggedIn = 2000;
var updateQueue = [];
var radialProgressParameters = {    
    strokeWidth : 6,
    containerHeight : 80,
    fontSize:  15,
    textLeftAdjustment: -5,
    textTopAdjustment: 7,
    progressColor: "rgb(245 184 1)",
    emptyColor: "rgb(240 221 165)",
    anchorDivId: "daily-summary",
    suffixForIds: "12345"
}

var currentDateTime = new Date();
console.log("starting javascript:"+currentDateTime.toString());

var currentDate = formatDate(currentDateTime);
  
/*
runApp = function(){

}

document.addEventListener("DOMContentLoaded", function(event) { 
    runAppRendering();
  });*/

function handleCredentialResponse(response) {
    document.getElementById('signin_status').innerHTML = "Signed in";
    console.log("Encoded JWT ID token: " + response.credential);
}

function initializeGoogleButton(){
/*
    google.accounts.id.initialize({
        client_id: "YOURGOOGLE_CLIENT_ID",
        callback: "https://www.vince.com/discipline/"
      });

    google.accounts.id.prompt();
    */

    var clientId = document.getElementById('g_id_onload').getAttribute('data-client_id');

    /*
    google.accounts.id.initialize({
        client_id: "YOURGOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
      });

      google.accounts.id.prompt();*/

    /*  google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      // also display the One Tap dialog

      const googleSignOutButton = document.getElementById("g_id_signout");
      googleSignOutButton.onclick = () => {
            google.accounts.id.disableAutoSelect();
            document.getElementById('signin_status').innerHTML = "Signed out";
          }*/
  
}




onload = function(){
/*var runAppRendering = function(){*/
    "use strict";
/*
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw-min.js").then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
              console.log('ServiceWorker registration failed: ', err);
            });
      }
*/

   /* addGoogleLoginSection();   */ 

    

/* test merge*/

    initializeGoogleButton();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') == "true"){
        document.getElementById("debug-section").style.display = "block";
    }

    hideStartProgressButtonOnHabits();

    document.getElementById("date-filter").value=currentDate;
    createRadialProgressBar(radialProgressParameters);

    getHabitProgressJournal();
 
    if (dataArrays.progressArray && dataArrays.progressArray.length >= 1){
        changeTabToProgress();
        showProgressTab();
        
    }
    else {
        hideProgressTab();
        changeTabToHabits();
    }
    if (dataArrays.journalArray && dataArrays.journalArray.length < 1){
        hideJournalBox();
    }

    if (dataArrays.todaysProgressArray){
        for (const progressElement of dataArrays.todaysProgressArray){
            addProgressElement(progressElement);
        }
    }
 
    if (dataArrays.habitsArray){
        for (const habitsElement of dataArrays.habitsArray){
            addHabitElement(habitsElement);
        }
    }
    /* TODO : should be based on arrays and not on DOM */
    addEmptyProgressBoxesOnNewDay(currentDate, currentDateTime);

    setTimeout(placeSVGIcons,5);
    setTimeout(renderPastProgressBoxes,10); 
    setTimeout(showSummariesTab,15); 
    setTimeout(prepareSummaries,20);
};


function prepareSummaries(){

    readJournal(dataArrays.journalArray);

    /*todo refactor with promise*/
    loadScriptForGraphs(showGraphsTabIfGoodLength);
}
function showGraphsTabIfGoodLength(){
    if (dataArrays.habitsArray && dataArrays.habitsArray.length >= 1){
        showGraphTab();
    }
}
var saveLoop = function(){

    setInterval(readQueueProgress, 1000);

}


var placeSVGIcons = function(){

    document.getElementById('daily-journal-icon').innerHTML = writeIcon;
    document.getElementById('daily-journal-icon-small').innerHTML = writeIconSmall;
    document.getElementById('week-link-icon').innerHTML=calendarIcon;
    document.getElementById('small-graph-icon').innerHTML=graphIconSmall;
    document.getElementById('small-graph-journal').innerHTML=writeIconSmall;
    document.getElementById('small-task-icon').innerHTML=taskIcon;
    document.getElementById('save-icon').innerHTML=saveIcon;
    document.getElementById('start-icon').innerHTML=startIcon;
    document.getElementById('trophy-icon-positive').innerHTML=trophyIconBig;
    document.getElementById('trophy-icon-super-positive').innerHTML=trophyIconBig;
    document.getElementById('start-icon').innerHTML=startIcon; 
    
    var trophyIconDivs = document.getElementsByClassName('trophy-icon');
    for ( var iconDiv of trophyIconDivs){
        iconDiv.innerHTML = trophyIcon;
    }
    var trophyIconBigDivs = document.getElementsByClassName('trophy-icon-big');
    for ( var iconBigDiv of trophyIconBigDivs){
        iconBigDiv.innerHTML = trophyIconBig;
    }
    document.getElementById('week-table-icon').innerHTML = calendarIconBig;
    document.getElementById('plus-icon-button').innerHTML = plusIconBig;
    
    

    /*loadScript("https://use.fontawesome.com/372afdc18b.js");*/
}
var loadScript = async function(scriptUrl){
    return new Promise(
        function (resolve, reject) {
            let myScript = document.createElement("script");
            let head = document.head || document.getElementsByTagName('head')[0];
            myScript.setAttribute("src", scriptUrl);
            myScript.setAttribute("async", false);
            myScript.addEventListener('load',function(){resolve('success');});
            myScript.addEventListener('error', function(event){reject(event.error);});
            head.insertBefore(myScript, head.firstChild);
        }
    );


}
var hideJournalBox = function(){
    document.getElementById("journal-container").innerHTML = "no entry yet";
}
var hideProgressTab = function(){
    document.getElementById("progress-menu").style.display = "none";
}
var showProgressTab = function(){
    document.getElementById("progress-menu").style.display = "block";
}
var hideSummariesTab = function(){
    document.getElementById("graphs-menu").style.display = "none"; 
    document.getElementById("go-to-summaries-button").style.display = "none";
}
var showSummariesTab = function(){
    document.getElementById("graphs-menu").style.display = "block"; 
    document.getElementById("go-to-summaries-button").style.display = "flex";
}

var showGraphTab = function(){
    document.getElementById("streaks-link").style.display = "block"; 
}
var hideGraphTab = function(){
    document.getElementById("streaks-link").style.display = "block"; 
}

var hideStartProgressButtonOnHabits = function(){
    document.getElementById("go-to-progress-button").style.display = "none";
}
var showStartProgressButtonOnHabits = function(){
    document.getElementById("go-to-progress-button").style.display = "flex";
}


var filterDivs = function(testElements, filterType, filterValue, exactMatch){
    if (filterValue != null && filterValue != '' ){
        for (const testElement of testElements){
            var valueOfElementToTest = testElement.getAttribute(filterType);
            if (!( (valueOfElementToTest == filterValue && exactMatch) || (valueOfElementToTest.indexOf(filterValue) >= 0 && !exactMatch)) ){
                testElement.style.display =  'none'; 
            }
        }
    }
};




var setDivAppearanceBasedOnCompletion = function(currentDiv,newCompletionPercentage){

    putBorderBackgroundOrderBasedOnCompletion(currentDiv,newCompletionPercentage);

    if ( currentDiv.getAttribute("iscritical") !=null && currentDiv.getAttribute("iscritical") == "true"){
        setDivAppearanceForCritical(currentDiv,newCompletionPercentage);
    }
}


var applyFilters = function(){
    var testElements = resetElementsOnNewHabitForm();
    var filterTitle = document.getElementById("text-filter").value;
    var filterDate = document.getElementById("date-filter").value;

    filterDivs(testElements,"progressDate",filterDate,true);
    filterDivs(testElements,"habitDescription",filterTitle,false);
};


var dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('input', function () {
    applyFilters();
    createMissingElementsForDate(this.value);
});

var textFilter = document.getElementById('text-filter')
textFilter.addEventListener('input', function () {
    applyFilters();
});

var createMissingElementsForDate = function(inputDate){
    var dateElements = inputDate.split("-");
    var inputDateTime = new Date(dateElements[0], (parseInt(dateElements[1])-1).toString(), dateElements[2], 0, 0, 0, 0);
    debugWrite("Creating missing progress elements for date:"+inputDate.toString()+ " time:"+inputDateTime.toString());
    addEmptyProgressBoxesOnNewDay(inputDate,inputDateTime);    
}

var minusOneToProgress = function(divElement){
    console.log("minus one");

    if (parseInt(divElement.value) > 0){
        divElement.value = (parseInt(divElement.value) - 1).toString();
    }
}

var addOneToProgress = function(divElement){
    console.log("plus one");

    divElement.value = (parseInt(divElement.value) + 1).toString();
}

/* Get information from the form to add new habits and add a PROGRESS (dom+memory for both)*/
/* CAREFUL elementToAdd has data to build A PROGRESS */ 
/* both habit and progress are added with this function */
var addNewHabitFromForm = function(){

    var elementToAdd={};
    var newId = Date.now();
    elementToAdd.id = newId.toString();
    elementToAdd.habitId = (newId * 10).toString();
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = parseInt(document.getElementById('new-target').value);
    elementToAdd.isNegative = document.getElementById('new-is-negative-flag').checked;
    elementToAdd.progressDate = currentDate;
    elementToAdd.numberOfCompletions = 0;
    elementToAdd.isNew = true;
    elementToAdd.isCritical = "false";
    var weekDaySelector = document.getElementById('week-day-selection');
    
    elementToAdd.weekDay = weekDaySelector.getAttribute('weekDay');
    if ( elementToAdd.weekDay == ""){
        elementToAdd.weekDay ='monday tuesday wednesday thursday friday saturday sunday';
    }

    var isDayOK;
    if (elementToAdd.weekDay){
        isDayOK = isDayOfWeekInHabitWeeks(currentDateTime, elementToAdd.weekDay);
    } else {
        isDayOK = true;
    }
    if (isDayOK != null && isDayOK)
    {
        addProgressElement(elementToAdd);
        pushProgressArrayToQueue(elementToAdd);
    }
    addHabitElement(elementToAdd);
    
    document.getElementById('new-description').value = null;
    document.getElementById('new-target').value = 1;
    document.getElementById('new-is-negative-flag').checked = false;
    resetWeekDaySelector(weekDaySelector);

    showProgressTab();

    showStartProgressButtonOnHabits();

    saveChangesInHabitFromObject(elementToAdd);

    confirmAddition(elementToAdd.habitId);
};

var saveChangesInHabit = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = readHabitElement(habitDiv);
    pushHabitArrayToQueue(habitJSON);
    confirmSave();

}
var setHabitAsCritical = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = readHabitElement(habitDiv);
    habitJSON.isCritical="true";
    pushHabitArrayToQueue(habitJSON);
};
var unsetHabitAsCritical = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = readHabitElement(habitDiv);
    habitJSON.isCritical="false";
    pushHabitArrayToQueue(habitJSON);
};

var saveChangesInHabitFromObject = function(habitElement){

    var habitJSON = {};
    habitJSON.habitId = habitElement.habitId;
    habitJSON.isNegative = habitElement.isNegative;
    habitJSON.habitDescription = habitElement.habitDescription;
    habitJSON.target = habitElement.target;
    habitJSON.weekDay = habitElement.weekDay;

    pushHabitArrayToQueue(habitJSON);
    
};


var closeAdditionConfirmation = function(){
    document.getElementById("addition-message").style.display="none";
};

var confirmAddition = function(habitId){
    document.getElementById("addition-message").style.display="flex";

    var checkHabitButton = document.getElementById("check-habit-button");

    var onClickString = "closeAdditionConfirmation();document.getElementById(" + habitId + ").scrollIntoView();"
    checkHabitButton.setAttribute('onclick',onClickString);

};

var confirmSave = function(){
    document.getElementById("save-message").style.display="flex";
};


var extractElementsForUpdateLoggedIn = function(progressElements){
    var outputElements = [];
    var progressElementsLength = progressElements.length;
    for (var i=0; i<progressElementsLength   && i < maxForNonLoggedIn; i++){
        var currentOutput = progressDOMToJson(progressElements[i]);
        outputElements.push(currentOutput);
    }

    console.log(outputElements);
};

var readHabitElement = function(elementToRead){
    var outputJson = {};
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.isNegative = elementToRead.getAttribute("isNegative");
    outputJson.habitDescription = elementToRead.getElementsByClassName('habit-description-definition')[0].value;
    outputJson.target = parseInt(elementToRead.getElementsByClassName('habit-target-definition')[0].value);
    outputJson.weekDay = elementToRead.getElementsByClassName("week-day-selection")[0].getAttribute("weekDay");
    outputJson.isCritical = elementToRead.getElementsByClassName("simple-checkbox")[0].checked.toString();
    return outputJson;
};

/* Read progress from the dom and put it in json ( then it can be saved ) */
var progressDOMToJson = function(elementToRead){
    var outputJson = {};
    outputJson.id = elementToRead.getAttribute("id");
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.habitDescription = elementToRead.getAttribute("habitDescription");
    outputJson.target = parseInt(elementToRead.getAttribute("target"));
    outputJson.progressDate = elementToRead.getAttribute("progressDate");
    outputJson.isNew = elementToRead.getAttribute("isNew");
    outputJson.isNegative = elementToRead.getAttribute("isNegative");
    outputJson.isCritical = elementToRead.getAttribute("isCritical");
    outputJson.numberOfCompletions = parseInt(elementToRead.getElementsByClassName("number-of-completion")[0].value);

    return outputJson;
};



var launchAllWeekTables = function(fullData,habitsArray){
    document.getElementById("streaks-container").innerHTML='<div id="no-streak">Graphs will be shown after adding at least one habit.</div>';
    document.getElementById("no-streak").style.display = "none";
    document.getElementById("week-summary-container").innerHTML='<div id="no-week-summary">Week summary will be shown after adding at least one habit.</div>';
    document.getElementById("no-week-summary").style.display = "none";
    for ( let habit of habitsArray){
        launchHabitWeekTable(fullData,habit)
    }

}

var launchAllCharts = function(fullData,habitsArray){
    document.getElementById("streaks-container").innerHTML='<div id="no-streak">Graphs will be shown after adding at least one habit.</div>';
    document.getElementById("no-streak").style.display = "none";

    for ( let habit of habitsArray){
        launchHabitChart(fullData,habit)
    }

}

var changeTabToProgress = function(){
    document.getElementById("habits-section").style.display = "none";
    document.getElementById("progress-section").style.display = "block";
    document.getElementById("graphs-section").style.display = "none"; 
    document.getElementById("progress-menu").classList.add("active");
    document.getElementById("habits-menu").classList.remove("active");
    document.getElementById("graphs-menu").classList.remove("active");
}

var changeTabToHabits = function(){
    document.getElementById("habits-section").style.display = "block";
    document.getElementById("progress-section").style.display = "none";
    document.getElementById("graphs-section").style.display = "none";
    document.getElementById("progress-menu").classList.remove("active");
    document.getElementById("habits-menu").classList.add("active");
    document.getElementById("graphs-menu").classList.remove("active");
    document.getElementById('new-description').focus();
}

var changeTabToSummaries = function(){
    launchAllWeekTables(dataArrays.progressArray,dataArrays.habitsArray);
    document.getElementById("habits-section").style.display = "none";
    document.getElementById("progress-section").style.display = "none";
    document.getElementById("graphs-section").style.display = "block";
    document.getElementById("progress-menu").classList.remove("active");
    document.getElementById("habits-menu").classList.remove("active");
    document.getElementById("graphs-menu").classList.add("active");
    subMenuGo('week-link');
}

var changeTabToGraph = function(){
    changeTabToSummaries();
    subMenuGo('streak-links');
}

var launchHabitWeekTable = function(fullData,habitObject){

    var progressByDay = prepareDataForHabitWeekTable(fullData,habitObject);
    var weekTableObject = {};
    weekTableObject = weekTable(progressByDay);

    buildWeekTableBox(weekTableObject,habitObject);

}

var launchHabitChart = function(fullData,habitObject){

    var dataForGraphs = prepareDataForHabitGraph(fullData,habitObject);
    var dataToShow = dataForGraphs.dataToShow;
    var unitAccumulation= dataForGraphs.unitAccumulation;
    var baseline = dataForGraphs.baseline;

    if ( dataToShow.length >= 1){
        showGraphTab();
    }

    var unitPerMonth=0;

    /* Analysis */
    var completionAccumulation = getNumberOfStreaks(dataToShow,baseline);

    var j = dataToShow.length-1;

    var numberOfDays = (dataToShow[j].x - dataToShow[0].x)/1000/60/60/24;
    if (numberOfDays>0){
        unitPerMonth=Math.round(unitAccumulation*30/numberOfDays);
    }

    if ( j < 0){
        return false;
    }

    if (j >= 0 && dataToShow[j] && dataToShow[j].x){
        debugWrite("Launching Chart");
        debugWrite(dataToShow[j].x.getDay());
    } else {
        return false;
    }

    /* Graph */
    buildGraphBox(unitPerMonth,unitAccumulation,completionAccumulation,habitObject,dataToShow);

}

var prepareDataForHabitGraph = function(fullData,habitObject){
    var dataToShow = [];
    var baseline = [];

    var unitAccumulation = 0;

    for ( var dataItem of fullData){
        if (dataItem.habitId == habitObject.habitId){
            unitAccumulation+=dataItem.numberOfCompletions;
            dataToShow.push({
                x: new Date(dataItem.progressDate),y:dataItem.numberOfCompletions
            });
            baseline.push({
                x: new Date(dataItem.progressDate),y:dataItem.target
            })
        }
    }

    dataToShow.sort(function(a, b){
    return (a.x - b.x)
    });	
    baseline.sort(function(a, b){
        return (a.x - b.x)
    });	

    return {dataToShow,baseline,unitAccumulation};
}

var prepareDataForHabitWeekTable = function(fullData,habitObject){
    var progressByDay = [];

    for ( var dataItem of fullData){
        if (dataItem.habitId == habitObject.habitId){
            progressByDay[dataItem.progressDate]=dataItem.numberOfCompletions-dataItem.target;
        }
    }

    return progressByDay;
}


var getNumberOfStreaks = function(dataToShow,baseline){
    var completionAccumulation=0;

    for (var i =  dataToShow.length - 1 ; i>=0; i--){
        var dataDate = dataToShow[i].x;
        if (
            dataDate.getFullYear() === currentDateTime.getFullYear() &&
            dataDate.getMonth() === currentDateTime.getMonth() &&
            dataDate.getDate() === currentDateTime.getDate()
          ) 
        {
            if ( dataToShow[i].y >= baseline[i].y ){
                completionAccumulation++;
            } 
            continue;
        }

        if ( dataToShow[i].y < baseline[i].y ) {
            break;
        } else {
            completionAccumulation++;
        }

    }
    return completionAccumulation;
}


var subMenuGo = function( targetLink){

    window.scrollTo(0, 0);

    var journalLink = document.getElementById('journal-link');
    var streaksLink = document.getElementById('streaks-link');
    var weekLink = document.getElementById('week-link');
    var graphContainer = document.getElementById('week-summary-container');
    var streaksContainer = document.getElementById('streaks-container');
    var journalContainer = document.getElementById('journal-container-wrapper');

    switch (targetLink) {
        case 'week-link':
            weekLink.classList.add("selected-underline");
            journalLink.classList.remove("selected-underline");
            streaksLink.classList.remove("selected-underline");
            graphContainer.style.display='flex';
            streaksContainer.style.display='none';
            journalContainer.style.display='none';
          break;
        case 'streaks-link':
            launchAllCharts(dataArrays.progressArray,dataArrays.habitsArray);
            weekLink.classList.remove("selected-underline");
            journalLink.classList.remove("selected-underline");
            streaksLink.classList.add("selected-underline");
            graphContainer.style.display='none';
            streaksContainer.style.display='flex';
            journalContainer.style.display='none';
          break;
        case 'journal-link':
            weekLink.classList.remove("selected-underline");
            journalLink.classList.add("selected-underline");
            streaksLink.classList.remove("selected-underline");
            graphContainer.style.display='none';
            streaksContainer.style.display='none';
            journalContainer.style.display='flex';
          break;
      }

}

/*runApp();*/