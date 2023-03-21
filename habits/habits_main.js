
var dataArrays = {};
var googleToken = '';
var applicationToken = '';
var loggedIn = false;
var maxForNonLoggedIn = 2000;
var updateQueue = [];
var updateAPIQueue = [];
var apiUser;
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
/* test merge from new branch*/



function handleCredentialResponse(response) {

    /*console.log("Encoded JWT ID token: " + response.credential);*/
    googleToken=response.credential;
   
    sendToken(response.credential).then(value => {
        loggedIn = true;
        applicationToken = value.applicationJwtToken;
        readQueueAPI();
        refreshDOM();  
        document.getElementById('api-refresh').style.display='flex';
        /*showLoginBoxes();   */ 
    }, reason => {
        console.log(reason );
      })

}

function showLoginBoxes(){
    document.getElementById('google-container-progress').style.display = 'block';
    document.getElementById('google-container').style.display = 'block';
}

async function sendToken(token) {

   /* var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.vince.com/api/discipline/auth');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in information: ' + xhr.responseText);
      document.getElementById("google-image").setAttribute("src", xhr.responseText);
      return xhr.responseText
    };
    xhr.send('token=' + token);*/

    try{
        var response = await fetch
            ('https://www.vince.com/api/discipline/auth',{
                method: "POST",
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                body: 'token=' + token
                });
        } catch (e) {
            console.log('could not connect to the server');
            console.log(e);
            response = null;
        } 
    if (response.status == '200'){
        var apiResponse = await response.json();

        reactOnLogin(apiResponse);


        /* todo : apiResponse._id must update the id of the element if it is has been created from scratch*/
        return apiResponse;
    } else {
        console.log('status of the api call:'+response.status);
    }

}



onload = function(){
/*var runAppRendering = function(){*/
    "use strict";
/* tests of service worker must be done on http://localhost:5000/ */



    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') == "true"){
        document.getElementById("debug-section").style.display = "block";
    }
    apiUser = urlParams.get('user');
    console.log('user:'+apiUser);
    if (urlParams.get('nouser') == 'true'){
        loggedIn=false;
    }

    hideStartProgressButtonOnHabits();

    document.getElementById("date-filter").value=currentDate;
    createRadialProgressBar(radialProgressParameters);

    renderApplication()
    .then(value => {
        setTimeout(placeSVGIcons,5);
        setTimeout(showLoginBoxes,7000);
        setTimeout(renderPastProgressBoxes,10); 
        setTimeout(showSummariesTab,15); 
        setTimeout(loadAudio,25);
      }, reason => {
        console.log(reason );
      })


    
};

var renderApplication = async function(){
    dataArrays=await getHabitProgressJournal(); /* todo: this function should only extract and not also create divs */
 
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
            addProgressDOMElement(progressElement);
        }
    }
 
    if (dataArrays.habitsArray){
        for (const habitsElement of dataArrays.habitsArray){
            addHabitDOMElement(habitsElement);
        }
    }
    /* TODO : should be based on arrays and not on DOM */
    addEmptyProgressBoxesOnNewDay(currentDate, currentDateTime);
}

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

    var firstInterval = setInterval(readQueueStorage, 1000);
    var secondInterval = setInterval(readQueueAPI, 4000);

}

var reloadHabitProgressJournal = async function(){
    dataArrays=await getHabitProgressJournal();
}



var placeSVGIcons = function(){

    document.getElementById('daily-journal-icon').innerHTML = writeIcon;
    document.getElementById('daily-journal-icon-small').innerHTML = writeIconSmall;
    document.getElementById('week-link-icon').innerHTML=calendarIcon;
    document.getElementById('small-graph-icon').innerHTML=graphIconSmall;
    document.getElementById('small-graph-journal').innerHTML=writeIconSmall;
    document.getElementById('save-icon').innerHTML=saveIcon;
    document.getElementById('start-icon').innerHTML=startIcon;
    document.getElementById('trophy-icon-positive').innerHTML=trophyIconBig;
    document.getElementById('trophy-icon-super-positive').innerHTML=trophyIconBig;
    document.getElementById('start-icon').innerHTML=startIcon; 
    document.getElementById('login-icon').innerHTML=personIcon; 
    document.getElementById('login-icon-progress').innerHTML=personIcon; 
    
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
    document.getElementById('refresh-icon').innerHTML = refreshIconBig;
    document.getElementById('sick-icon').innerHTML = sickIconBig;
    document.getElementById('special-day-icon').innerHTML = specialDayIconBig;
    
    

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

var loadAudio = function(videoUrl){
    /*
    <video
    title="Advertisement"
    webkit-playsinline="true"
    playsinline="true"
    style="background-color: rgb(0, 0, 0); position: absolute; width: 640px; height: 360px;"
    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    autoplay=""></video>


    <video
    title="Advertisement"
    style="background-color: rgb(0, 0, 0); position: absolute; width: 640px; height: 360px;"
    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    autoplay="true"
    muted="muted"></video>

    <audio>
    <source src="file_name" type="audio_file_type">
    </audio>
    https://www.geeksforgeeks.org/how-to-embed-audio-and-video-in-html/
    */
    /*var audio = new Audio();
    audio.src = "resources/crowd_cheering.wav";
    audio.addEventListener('loadeddata',function(){
        audio.play();
    });
    
    
    var audioDiv = new Audio(url);
    document.body.appendChild(audioDiv);

    myAudioElement.addEventListener("canplaythrough", event => {
  myAudioElement.play();
});

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio


  <audio  src="resources/crowd_cheering.wav" id="cheering-audio"></audio>
    */

    const audioDiv = document.createElement("audio");
    audioDiv.setAttribute('src','resources/crowd_cheering_6seconds.mp3');
    audioDiv.setAttribute('id','cheering-audio');
    document.body.appendChild(audioDiv);

}

var playCheers = function(){
    var audioDiv = document.getElementById("cheering-audio");
    audioDiv.play();
}
var hideJournalBox = function(){
    document.getElementById("journal-container").innerHTML = "<div class='journal-container-day'>No journal entry yet.</div>";
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
    if (dataArrays.habitsArray && dataArrays.habitsArray.length >= 1){
        document.getElementById("graphs-menu").style.display = "block"; 
        document.getElementById("go-to-summaries-button").style.display = "flex";
    }
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

    if ( currentDiv.getAttribute("iscritical") !=null && currentDiv.getAttribute("iscritical") == 'true'){
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


/*var extractElementsForUpdateLoggedIn = function(progressElements){
    var outputElements = [];
    var progressElementsLength = progressElements.length;
    for (var i=0; i<progressElementsLength   && i < maxForNonLoggedIn; i++){
        var currentOutput = progressDOMToJson(progressElements[i]);
        outputElements.push(currentOutput);
    }

    console.log(outputElements);
};*/

/* Read habit from the dom and put it in json ( then it can be saved ) */
var habitDOMToJson = function(elementToRead){
    var outputJson = {};
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.isNegative = elementToRead.getAttribute("isNegative");
    outputJson.order = elementToRead.getAttribute("order");
    outputJson.status = elementToRead.getAttribute("status");
    outputJson.habitDescription = elementToRead.getElementsByClassName('habit-description-definition')[0].value;
    outputJson.target = parseInt(elementToRead.getElementsByClassName('habit-target-definition')[0].value);
    outputJson.weekDay = elementToRead.getElementsByClassName("week-day-selection")[0].getAttribute("weekDay");
    // outputJson.isCritical = elementToRead.getElementsByClassName("simple-checkbox")[1].checked.toString();
    // outputJson.isSuspendableDuringSickness = elementToRead.getElementsByClassName("simple-checkbox")[2].checked.toString();
    // outputJson.isSuspendableDuringOtherCases = elementToRead.getElementsByClassName("simple-checkbox")[3].checked.toString();
    // outputJson.isTimerNecessary = elementToRead.getElementsByClassName("simple-checkbox")[0].checked.toString();
    outputJson.isTimerNecessary = document.getElementById("is-timer-necessary-"+outputJson.habitId.toString()).checked;
    outputJson.isSuspendableDuringOtherCases = document.getElementById("is-suspendable-in-other-cases-"+outputJson.habitId.toString()).checked;
    outputJson.isSuspendableDuringSickness = document.getElementById("is-suspendable-during-sickness-"+outputJson.habitId.toString()).checked;
    outputJson.isCritical = document.getElementById("is-critical-"+outputJson.habitId.toString()).checked;
    var timerInitialNumberOfMinutes = document.getElementById("initial-time"+outputJson.habitId.toString()).value;
    try {
        timerInitialNumberOfMinutes = parseInt(timerInitialNumberOfMinutes)
        if (timerInitialNumberOfMinutes >=0 ){
            outputJson.timerInitialNumberOfMinutes = timerInitialNumberOfMinutes;
        } else {
            outputJson.timerInitialNumberOfMinutes = 0;
        }
    } catch(e){
        outputJson.timerInitialNumberOfMinutes = 0;
    }
    
    return outputJson;
};

/* Read progress from the dom and put it in json ( then it can be saved ) */
var progressDOMToJson = function(elementToRead){
    var outputJson = {};
    outputJson.id = elementToRead.getAttribute("id");
    outputJson.progressId = elementToRead.getAttribute("id");
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.status = elementToRead.getAttribute("status");
    outputJson.habitDescription = elementToRead.getAttribute("habitDescription");
    outputJson.target = parseInt(elementToRead.getAttribute("target"));
    outputJson.progressDate = elementToRead.getAttribute("progressDate");
    outputJson.isNew = elementToRead.getAttribute("isNew");
    outputJson.isNegative = elementToRead.getAttribute("isNegative");
    outputJson.isCritical = elementToRead.getAttribute("isCritical");
    outputJson.isSuspendableDuringSickness = elementToRead.getAttribute("isSuspendableDuringSickness");
    outputJson.isSuspendableDuringOtherCases = elementToRead.getAttribute("isSuspendableDuringOtherCases");
    
    outputJson.timerInitialNumberOfMinutes = elementToRead.getAttribute("timerInitialNumberOfMinutes");
    /*todo: duplicate with function above*/
    try {
        timerInitialNumberOfMinutes = parseInt(timerInitialNumberOfMinutes)
        if (timerInitialNumberOfMinutes >=0 ){
            outputJson.timerInitialNumberOfMinutes = timerInitialNumberOfMinutes;
        } else {
            outputJson.timerInitialNumberOfMinutes = 0;
        }
    } catch(e){
        outputJson.timerInitialNumberOfMinutes = 0;
    }
    
    outputJson.order = elementToRead.getAttribute("order")?elementToRead.getAttribute("order"):80;
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
    /*document.getElementById('new-description').focus();*/
}

var changeTabToSummaries = function(){
 
    reloadHabitProgressJournal().then(value => {
        prepareSummaries();
        launchAllWeekTables(dataArrays.progressArray,dataArrays.habitsArray);
        document.getElementById("habits-section").style.display = "none";
        document.getElementById("progress-section").style.display = "none";
        document.getElementById("graphs-section").style.display = "block";
        document.getElementById("progress-menu").classList.remove("active");
        document.getElementById("habits-menu").classList.remove("active");
        document.getElementById("graphs-menu").classList.add("active");
        subMenuGo('week-link');
        }, reason => {
        console.log(reason );
        })
    
    
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



    if ( j < 0){
        return false;
    }

    var numberOfDays=0;

    if (j >= 0 && dataToShow[j] && dataToShow[j].x){
        debugWrite("Launching Chart");
        debugWrite(dataToShow[j].x.getDay());

        numberOfDays = (dataToShow[j].x - dataToShow[0].x)/1000/60/60/24;
        if (numberOfDays>0){
            unitPerMonth=Math.round(unitAccumulation*30/numberOfDays);
        }
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
        if (dataItem.habitId == habitObject.habitId && dataItem.status=='active'){
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