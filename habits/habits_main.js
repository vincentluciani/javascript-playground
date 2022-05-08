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
/*var currentDate = currentDateTime.getFullYear().toString().padStart(2,'0')+'-'+(currentDateTime.getMonth()+1).toString().padStart(2,'0')+'-'+currentDateTime.getDate().toString().padStart(2,'0');*/
var currentDate = formatDate(currentDateTime);

var plusButtonInAddDiv = document.getElementById("plus-in-add-div");
var minusButtonInAddDiv = document.getElementById("minus-in-add-div");
                     
var newTargetDiv = document.getElementById("new-target");

onload = function(){
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
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isDebug = urlParams.get('debug');
    if (isDebug == "true"){
        document.getElementById("debug-section").style.display = "block";
    }

    document.getElementById("date-filter").value=currentDate;
    /*ingestElements();*/
    createProgressElements(radialProgressParameters);
    getHabitProgress();
    addEmptyProgressOnNewDay(currentDate, currentDateTime);

    saveLoop();

};

var saveLoop = function(){

    setInterval(extractElementsForUpdate, 1000);

}

plusButtonInAddDiv.addEventListener('click', function(newTargetDiv) {
    return function(){
        addOneToProgress(newTargetDiv);
    }
    }(newTargetDiv));

minusButtonInAddDiv.addEventListener('click', function(newTargetDiv) {
        return function(){
            minusOneToProgress(newTargetDiv);
        }
        }(newTargetDiv));


var getHabitProgress = function(){

    if (loggedIn){
        getHabitProgressWhenLoggedIn();
    } else {
        getHabitProgressWhenNotLoggedIn();
    }
};

var getHabitProgressWhenLoggedIn = function(){
    var APIcallParameters = {
        method: "GET",
        url: "http://localhost:5000/get-habit-progress"
    };
    var apiCaller = new APICaller(APIcallParameters,ingestElements,getHabitProgressWhenNotLoggedIn);

    apiCaller.executeCall(APIcallParameters.url, {});

};

var getHabitProgressWhenNotLoggedIn = function(){
    var progressArray=[];
    var habitsArray=[];
    var journalArray = [];

    for (var i = 0; i < localStorage.length && i < maxForNonLoggedIn; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf("progress-") >= 0){
            progressArray.push(JSON.parse(localStorage.getItem(currentKey)));
        } else if ( currentKey.indexOf("habit-") >= 0){
            habitsArray.push(JSON.parse(localStorage.getItem(currentKey)));
        } else if ( currentKey.indexOf("journal-") >= 0){
            journalArray.push({'key':currentKey,'text':JSON.parse(localStorage.getItem(currentKey))});
        }
    }

    if (habitsArray.length > 1){
        changeTabToProgress();
    }
    else if (habitsArray.length > 0){
        changeTabToProgress();
        hideGraphsTab();
    } else {
        changeTabToHabits();
        hideProgressTab();
        hideGraphsTab();
        hideSaveButtonOnHabits();
        hideStartProgressButtonOnHabits();
    }

    if (journalArray.length < 1){
        hideJournalBox();
    }

    ingestElements(progressArray,habitsArray,journalArray);
};
var hideJournalBox = function(){
    document.getElementById("journal-container").innerHTML = "no entry yet";
}
var hideProgressTab = function(){
    document.getElementById("progress-menu").style.display = "none";
}
var showProgressTab = function(){
    document.getElementById("progress-menu").style.display = "block";
}
var hideGraphsTab = function(){
    document.getElementById("graphs-menu").style.display = "none"; 
}
var showGraphsTab = function(){
    document.getElementById("graphs-menu").style.display = "block"; 
}
var hideSaveButtonOnHabits = function(){
 /*document.getElementById("save-button-in-habits").style.display = "none";*/
}
var showSaveButtonOnHabits = function(){
   /* document.getElementById("save-button-in-habits").style.display = "flex";*/
}
var hideStartProgressButtonOnHabits = function(){
    document.getElementById("go-to-progress-button").style.display = "none";
}
var showStartProgressButtonOnHabits = function(){
    document.getElementById("go-to-progress-button").style.display = "flex";
}
var ingestElements = function(inputData,habitsArray,journalArray,urlDetails){
   /* var inputData = getHabitProgress();*/
    for ( var i=0; i < inputData.length;i++){
        addElement(inputData[i]);
    }
    for ( var i=0; i < habitsArray.length;i++){
        addHabitElement(habitsArray[i]);
    }
    applyFilters();
    launchCharts(inputData,habitsArray);
    readJournal(journalArray);
}


var filterDivs = function(testElements, filterType, filterValue, exactMatch){
    if (filterValue != null && filterValue != '' ){
        for (var i=0; i<testElements.length; i++){
            var valueOfElementToTest = testElements[i].getAttribute(filterType);
            if (!( (valueOfElementToTest == filterValue && exactMatch) || (valueOfElementToTest.indexOf(filterValue) >= 0 && !exactMatch)) ){
                testElements[i].style.display =  'none'; 
            }
        }
    }
};
var resetElements = function(){
    var testElements = document.getElementsByClassName('habit-update');
    for (var i=0; i< testElements.length; i++){
        testElements[i].style.display =  'block';
        var currentDiv = testElements[i];
        var progressClasses = currentDiv.getElementsByClassName("number-of-completion");
        var progressDiv = progressClasses[0];

        if (progressDiv != null){
            refreshProgress(currentDiv);
            progressDiv.addEventListener('change', function(currentDiv) {
                return function(){
                    refreshProgress(currentDiv);
                    
                }
             }(currentDiv));
        }
        
        /* javascript feature known as closure */
        
    }
    return testElements;
};

var refreshProgress = function(currentDiv){
    var newCompletion = currentDiv.getElementsByClassName("number-of-completion")[0];
    var newCompletionPercentage = 0;

    var isNegative = currentDiv.getAttribute("isNegative"); 
    if (isNegative != null && isNegative == "true"){
        if ( newCompletion.value <= parseInt(currentDiv.getAttribute("target")) ){
            newCompletionPercentage = 100;
        } 
    } else {
        newCompletionPercentage = Math.round(newCompletion.value * 100 / parseInt(currentDiv.getAttribute("target")));
    }

    currentDiv.getElementsByClassName("percentage-completion")[0].innerHTML = newCompletionPercentage;

    
    putColorBasedOnCompletion(currentDiv,newCompletionPercentage);

    updateDailyProgress();

}

var putColorBasedOnCompletion = function(currentDiv,newCompletionPercentage){

    if (newCompletionPercentage>=100){
        currentDiv.style.border="1px solid rgb(167 211 162)"/*"#f7fff6"*/;
        currentDiv.style.order="95";
        currentDiv.style.background="#daffd9";
        /*currentDiv.style.boxShadow="rgb(168 218 179) -1px 2px 10px 5px"*//*"rgb(55 110 57 / 20%) 1px 4px 16px 5px"*/;
    } else if (newCompletionPercentage>=50){
        currentDiv.style.border="1px solid rgb(246 223 35)"/*"#fffded"*/;
        currentDiv.style.background="rgb(255 251 234)";
        currentDiv.style.order="70";
        /*currentDiv.style.boxShadow="rgb(198 198 197) -1px 2px 17px 0px"*//*"rgb(219 213 191) -1px 2px 17px 0px"*/;
    } else if (newCompletionPercentage<50){
        currentDiv.style.border="1px solid lightgrey"/*"#fffded"*/;
        currentDiv.style.background="white"/*"#fff6f9"*/;
        currentDiv.style.order="70";
    }
    if (currentDiv.id && currentDiv.id == "daily-summary-container"){
        currentDiv.style.order = "90";
    }
    if ( currentDiv.getAttribute("iscritical") !=null && currentDiv.getAttribute("iscritical") == "true"&& newCompletionPercentage <100 ){
        currentDiv.style.border="3px solid red"/*"#f7fff6"*/; 
        var taskIconDiv = currentDiv.getElementsByClassName("fa fa-tasks")[0];
        if (taskIconDiv){
            currentDiv.getElementsByClassName("fa fa-tasks")[0].classList.remove("fa-tasks");
            currentDiv.getElementsByClassName("fa")[0].classList.add("fa-warning");
            currentDiv.getElementsByClassName("habit-description")[0].classList.add("red");
            currentDiv.style.order = "60";
        }

    }
}

var updateDailyProgress = function(){
    
    var progressDivs = document.getElementsByClassName("percentage-completion");
    var currentDate = document.getElementById("date-filter").value;


    var fullScore = 0;
    var numberOfDivs = 0;
    for ( var i=0; i< progressDivs.length; i++){
        var progressDate = progressDivs[i].getAttribute("progressDate");
        if (progressDate==currentDate){
            var currentScore = parseInt(progressDivs[i].innerHTML);
            currentScore = (currentScore > 100) ? 100 : currentScore;
            fullScore += currentScore;
            numberOfDivs++;
        }
    }

    var dailyPercentage = Math.round(fullScore / numberOfDivs);
    var dailySummaryDiv = document.getElementById("daily-summary");
    var dailySummaryBox = document.getElementById("daily-summary-container");
    var dailyCommentBox = document.getElementById("daily-summary-comment");

    if (dailyPercentage && dailyPercentage>0){

        /*dailySummaryDiv.innerHTML = dailyPercentage.toString();*/
        /*dailySummaryDiv.innerHTML = "";*/

        if (dailyPercentage >= 100){
            radialProgressParameters.progressColor = "rgb(167, 211, 162)";
            radialProgressParameters.emptyColor = "rgb(193 236 205)";
            dailyCommentBox.innerHTML="Awesome Achievement !"
        } else if ( dailyPercentage >= 50 ){
            radialProgressParameters.progressColor = "rgb(238 230 168)";
            radialProgressParameters.emptyColor = "rgb(228 228 228)";
            dailyCommentBox.innerHTML="You are almost there !"
        } else {
            radialProgressParameters.progressColor = "#b657af";
            radialProgressParameters.emptyColor = "rgb(255 217 235)";
            dailyCommentBox.innerHTML="Good Start<br>Keep it up !"
        }

        if ( dailyPercentage >= 100){
            radialProgressParameters.textLeftAdjustment = -9;
        }
        else if ( dailyPercentage >= 10){
            radialProgressParameters.textLeftAdjustment = -5;
        } else {
            radialProgressParameters.textLeftAdjustment = -2;
        }

       updateProgressOnRadial(dailyPercentage, radialProgressParameters);

        dailySummaryBox.style.display = "block";
    } else {
        var dailyPercentage = 0;
        dailySummaryBox.style.display = "none";
    }
    putColorBasedOnCompletion(dailySummaryDiv.parentNode,dailyPercentage);

}

var applyFilters = function(){
    var testElements = resetElements();
    var filterTitle = document.getElementById("text-filter").value;
    var filterDate = document.getElementById("date-filter").value;

    filterDivs(testElements,"progressDate",filterDate,true);
    filterDivs(testElements,"habitDescription",filterTitle,false);
};


var dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('input', function (evt) {
    applyFilters();
    createMissingElementsForDate(this.value);
});

var textFilter = document.getElementById('text-filter')
textFilter.addEventListener('input', function (evt) {
    applyFilters();
});

var createMissingElementsForDate = function(inputDate){
    var dateElements = inputDate.split("-");
    var inputDateTime = new Date(dateElements[0], (parseInt(dateElements[1])-1).toString(), dateElements[2], 0, 0, 0, 0);
    debugWrite("Creating missing progress elements for date:"+inputDate.toString()+ " time:"+inputDateTime.toString());
    addEmptyProgressOnNewDay(inputDate,inputDateTime);

    
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
var addElementFromForm = function(){

    var elementToAdd={};
    elementToAdd.id = Date.now();
    elementToAdd.habitId = elementToAdd.id * 10;
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = parseInt(document.getElementById('new-target').value);
    elementToAdd.isNegative = document.getElementById('new-is-negative-flag').checked;
    elementToAdd.progressDate = currentDate;
    elementToAdd.numberOfCompletions = 0;
    elementToAdd.isNew = true;
    elementToAdd.isCritical = false;
    var weekDaySelector = document.getElementById('week-day-selection');
    
    elementToAdd.weekDay = weekDaySelector.getAttribute('weekDay');

    if (elementToAdd.weekDay){
        var isDayOK = isDayOfWeekInHabitWeeks(currentDateTime, elementToAdd.weekDay);
    } else {
        var isDayOK = true;
    }
    if (isDayOK != null && isDayOK == true)
    {
        /* add progress */
        addElement(elementToAdd);
    }
    addHabitElement(elementToAdd);
    
    pushProgressArrayToQueue(elementToAdd);

    document.getElementById('new-description').value = null;
    document.getElementById('new-target').value = 1;
    document.getElementById('new-is-negative-flag').checked = false;
    resetWeekDaySelector(weekDaySelector);

    showProgressTab();

    showSaveButtonOnHabits();
    showStartProgressButtonOnHabits();

    saveChangesInHabitFromObject(elementToAdd);

    confirmAddition(elementToAdd.habitId);
};

var saveChangesInHabit = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = readHabitElement(habitDiv);
    pushHabitArrayToQueue(habitJSON);

}
var setHabitAsCritical = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = readHabitElement(habitDiv);
    habitJSON.isCritical=true;
    pushHabitArrayToQueue(habitJSON);
}


var saveChangesInHabitFromObject = function(habitElement){

    var habitJSON = {};
    habitJSON.habitId = habitElement.habitId;
    habitJSON.isNegative = habitElement.isNegative;
    habitJSON.habitDescription = habitElement.habitDescription;
    habitJSON.target = habitElement.target;
    habitJSON.weekDay = habitElement.weekDay;

    pushHabitArrayToQueue(habitJSON);
    
}


var closeAdditionConfirmation = function(){
    document.getElementById("addition-message").style.display="none";
}

var confirmAddition = function(habitId){
    document.getElementById("addition-message").style.display="flex";

    var checkHabitButton = document.getElementById("check-habit-button");

    var onClickString = "closeAdditionConfirmation();document.getElementById(" + habitId + ").scrollIntoView();"
    checkHabitButton.setAttribute('onclick',onClickString);

}
var displayAllElements = function(elementList){
    for (var i=0; i< elementList.length; i++) {
        const newDivision = document.createElement("div");
        document.body.appendChild(newDivision);
    }
};

/* get information from all progress and habits boxes (calls functions to do it)*/
var extractElementsForUpdate = function(){

    console.log("saving");
    var progressElements = document.getElementsByClassName('habit-update');
    var habitsElements = document.getElementsByClassName('habit-setting');
    if (loggedIn){
        extractElementsForUpdateLoggedIn(progressElements, habitsElements);
    } else {
        extractElementsForUpdateNoneLoggedIn(progressElements, habitsElements);
    }
};


var extractElementsForUpdateLoggedIn = function(progressElements, habitsElements){
    var outputElements = [];

    for (var i=0; i< progressElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(progressElements[i]);
        outputElements.push(currentOutput);
    }

    console.log(outputElements);
};




var extractElementsForUpdateNoneLoggedIn = function(progressElements, habitsElements){

    readQueueProgress();

   /* for ( var j=0; j< habitsElements.length;j++){
        var currentOutput = readHabitElement(habitsElements[j]);
        window.localStorage.setItem('habit-'+currentOutput.habitId,JSON.stringify(currentOutput));
    }*/

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
var readElement = function(elementToRead){
    var outputJson = {};
    outputJson.id = elementToRead.getAttribute("id");
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.habitDescription = elementToRead.getAttribute("habitDescription");
    outputJson.target = parseInt(elementToRead.getAttribute("target"));
    outputJson.progressDate = elementToRead.getAttribute("progressDate");
    outputJson.isNew = elementToRead.getAttribute("isNew");
    outputJson.isNegative = elementToRead.getAttribute("isNegative");
    outputJson.numberOfCompletions = parseInt(elementToRead.getElementsByClassName("number-of-completion")[0].value);

    return outputJson;
};

function APICaller(parameters,callback,callbackOnFailure){
	
	this.parameters = parameters;
	this.callback = callback;
	
	this.executeCall = function(url,urlDetails)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				callback(JSON.parse(this.responseText),urlDetails);
			} else {
                callbackOnFailure();
            }
		};
		xhttp.open(parameters.method, url, true);
		xhttp.send();
	};
	
};




var addEmptyProgressOnNewDay = function(inputDate, inputDateTime){

    var newCurrentDateTime = new Date();

    var currentDateTimeMidnight = newCurrentDateTime.setHours(0,0,0,0);
    var inputDateTimeMidnight = inputDateTime.setHours(0,0,0,0);
    
    if ( inputDateTimeMidnight > currentDateTimeMidnight){
        return;
    }

    var progressElements = document.getElementsByClassName('habit-update');
    var habitsElements = document.getElementsByClassName('habit-setting');

    /*var dailySummaryDiv = document.getElementById("daily-summary");
    dailySummaryDiv.innerHTML = ""*/

    for (var i=0; i< habitsElements.length;i++){

        var isHabitProgressExisting = false;

        for (var j=0; j< progressElements.length;j++){
            if ( habitsElements[i].getAttribute("habitId") == progressElements[j].getAttribute("habitId") && progressElements[j].getAttribute("progressdate") == inputDate){
                isHabitProgressExisting = true;
            }
        }

        if ( isHabitProgressExisting == false){

            if (habitsElements[i].getAttribute("weekDay")){
                debugWrite("Comparing currrent date time with habit week day");
                debugWrite("Current date time:");
                debugWrite(inputDateTime);
                debugWrite("Habit week day:");
                debugWrite(habitsElements[i].getAttribute("weekDay"));
                
                var isDayOK = isDayOfWeekInHabitWeeks(inputDateTime, habitsElements[i].getAttribute("weekDay"));
            } else {
                var isDayOK = true;
            }
            if (isDayOK != null && isDayOK == true) {
                newProgressObject = {
                    id: Date.now()*100+i,
                    habitId: habitsElements[i].getAttribute("habitId"),
                    habitDescription: habitsElements[i].getAttribute("habitDescription"),
                    target: habitsElements[i].getAttribute("target"),
                    progressDate: inputDate,
                    isNew: true,
                    isCritical: habitsElements[i].getAttribute("isCritical"),
                    numberOfCompletions:0,
                }
                addElement(newProgressObject);
                console.log("added progress");
                console.log(newProgressObject);
                pushProgressArrayToQueue(newProgressObject);
            }
        }
    }
    /* go through all elements, if nothing with today's date, go through all habits and add new element with this habit id*/
}

var launchCharts = function(fullData,habitsArray){
    for ( var i=0;i<habitsArray.length;i++){
        launchChart(fullData,habitsArray[i])
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

var changeTabToGraphs = function(){
    document.getElementById("habits-section").style.display = "none";
    document.getElementById("progress-section").style.display = "none";
    document.getElementById("graphs-section").style.display = "block";
    document.getElementById("progress-menu").classList.remove("active");
    document.getElementById("habits-menu").classList.remove("active");
    document.getElementById("graphs-menu").classList.add("active");
}


var launchChart = function(fullData,habitObject){

    var dataToShow = [];
    var baseline = [];
    var progressByDay = {};
    var unitAccumulation=0;
    var unitPerMonth=0;

    for ( var i=0; i< fullData.length;i++){
        if (fullData[i].habitId == habitObject.habitId){
            unitAccumulation+=fullData[i].numberOfCompletions;
            dataToShow.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].numberOfCompletions
            })
            baseline.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].target
            })
            progressByDay[fullData[i].progressDate]=fullData[i].numberOfCompletions-fullData[i].target;
        }
    }


  /*  var test = weekTable(progressByDay);*/

		dataToShow.sort(function(a, b){
		return (a.x - b.x)
		});	

        if ( dataToShow.length >= 1){
            showGraphsTab();
        }
        baseline.sort(function(a, b){
            return (a.x - b.x)
            });	


    /* Analysis */
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

    var tableData = {};
    var numberOfMissesInWeek=0;
    var j = dataToShow.length-1;

    var numberOfDays = (dataToShow[j].x - dataToShow[0].x)/1000/60/60/24;
    if (numberOfDays>0){
        unitPerMonth=Math.round(unitAccumulation*30/numberOfDays);
    }


    if ( j < 0){
        return false;
    };
    var isTargetOK;
    if (j >= 0 && dataToShow[j] && dataToShow[j].x){
        debugWrite("Launching Chart");
        debugWrite(dataToShow[j].x.getDay());
  /*      var todayWeekDay = dataToShow[j].x.getDay();
        if ( dataToShow[j].y >= baseline[j].y){
            isTargetOK = "<i class='fa fa-circle icon'></i>";
        } else {
            dataDate = dataToShow[j].x;
            if (
                dataDate.getFullYear() != currentDateTime.getFullYear() ||
                dataDate.getMonth() != currentDateTime.getMonth() ||
                dataDate.getDate() != currentDateTime.getDate()
            ) {
                isTargetOK = "x";
                numberOfMissesInWeek++;
            }
        }
        tableData[todayWeekDay]= (isTargetOK != null)?isTargetOK:" ";*/
/*
        do  {
            j--;

            if (j < 0){
                break;
            }
            if (j >= 0 && dataToShow[j] && dataToShow[j].x){
                var currentWeekDay = dataToShow[j].x.getDay();

                if ( todayWeekDay != 0){
                    if ( currentWeekDay > todayWeekDay || currentWeekDay == 0){
                        break;
                    }
                } else {
                    if ( currentWeekDay == 0){
                        break;
                    }
                }
                if ( dataToShow[j].y >= baseline[j].y){
                    isTargetOK = "<i class='fa fa-circle icon'></i>";
                } else {
                    isTargetOK = "x";
                    numberOfMissesInWeek++;
                }
                if (tableData[currentWeekDay]==null){
                    tableData[currentWeekDay]= (isTargetOK != null)?isTargetOK:" ";
                }
            }
        } while (currentWeekDay > 1)*/
    } else {
        return false;
    }

  /*  var tableCode = "<table><tr><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr>"; 
    tableCode += "<tr><td>"+getElementToPutOnTable(tableData[1])+"</td>"+"<td>"+getElementToPutOnTable(tableData[2])+"</td>"+"<td>"+getElementToPutOnTable(tableData[3])+"</td>"+"<td>"+getElementToPutOnTable(tableData[4])+"</td>"+"<td>"+getElementToPutOnTable(tableData[5])+"</td>"+"<td>"+getElementToPutOnTable(tableData[6])+"</td>"+"<td>"+getElementToPutOnTable(tableData[0])+"</td></tr></table>";
*/
    var weekTableObject = {};
    weekTableObject = weekTable(progressByDay);
    tableCode = weekTableObject.tableCode
    numberOfMissesInWeek = weekTableObject.numberOfMissesInWeek

    /*<canvas id="myChart"></canvas>*/
    var newCanva = document.createElement("canvas");
    var newCanvaWrapper = document.createElement("div");
    var streaksWrapper = document.createElement("div");
    var brDiv = document.createElement("br");
    const grapTitle = document.createTextNode(habitObject.habitDescription);
    const grapTitleDiv = document.createElement("div");
    const grapTitleStreaks = document.createTextNode(habitObject.habitDescription);
    const grapTitleDivStreaks = document.createElement("div");

    const weekSummaryTable = document.createElement("div");
    var graphIcon = document.createElement("i");
    graphIcon.setAttribute("class","fa fa-calendar");
    var graphIconStreaks = document.createElement("i");
    graphIconStreaks.setAttribute("class","fa fa-bar-chart");

    const streaksTitleDiv = document.createElement("div");
    streaksTitleDiv.innerHTML = "Number of streaks: "+ completionAccumulation.toString();
    streaksTitleDiv.setAttribute("class","subtitle");

    const accumulationTitleDiv = document.createElement("div");
    accumulationTitleDiv.innerHTML = "Number of units: "+ unitAccumulation.toString()+" ("+unitPerMonth+" per month)";
    accumulationTitleDiv.setAttribute("class","subtitle");

    grapTitleDiv.setAttribute("class","graph-title");
    grapTitleDiv.appendChild(graphIcon);
    grapTitleDiv.appendChild(grapTitle);

    grapTitleDivStreaks.setAttribute("class","graph-title");
    grapTitleDivStreaks.appendChild(graphIconStreaks);
    grapTitleDivStreaks.appendChild(grapTitleStreaks);

    const weekSummaryTableTitle = document.createElement("div");
    weekSummaryTableTitle.innerHTML = "This week summary:";
    weekSummaryTableTitle.setAttribute("class","subtitle");
    const markAsCriticalDiv = document.createElement("div");
    markAsCriticalDiv.innerHTML = "Mark as critical";
    markAsCriticalDiv.setAttribute("class","critical-link");
    markAsCriticalDiv.setAttribute("onclick","setHabitAsCritical("+ habitObject.habitId +");");

    weekSummaryTable.setAttribute("class","table-summary");
    weekSummaryTable.innerHTML = tableCode;

    const graphTitle = document.createElement("div");
    graphTitle.innerHTML = "Graph:";
    graphTitle.setAttribute("class","subtitle");

    newCanva.setAttribute("id","graph-"+habitObject.habitId);
    newCanvaWrapper.appendChild(grapTitleDiv); 
    streaksWrapper.appendChild(grapTitleDivStreaks);
    streaksWrapper.setAttribute("id","streaks-"+habitObject.habitId);
    /*newCanvaWrapper.appendChild(weekSummaryTableTitle);*/
    newCanvaWrapper.appendChild(weekSummaryTable);
    newCanvaWrapper.appendChild(markAsCriticalDiv);
    newCanvaWrapper.appendChild(brDiv);
    streaksWrapper.appendChild(streaksTitleDiv);
    streaksWrapper.appendChild(accumulationTitleDiv);
    streaksWrapper.appendChild(graphTitle); 
    streaksWrapper.append(newCanva);

    newCanvaWrapper.setAttribute("class","box canva-wrapper week-box");
    streaksWrapper.setAttribute("class","box canva-wrapper streak-box");

    if (numberOfMissesInWeek==0){
        newCanvaWrapper.style.background="#daffd9"/*"#f7fff6"*/;
        newCanvaWrapper.style.border="1px solid rgb(167 211 162)"
    } else if (numberOfMissesInWeek==1){
        newCanvaWrapper.style.background="rgb(255 252 238)"/*"#fffded"*/;
        newCanvaWrapper.style.border="1px solid rgb(246 223 35)"
    } else if (numberOfMissesInWeek>1){
        newCanvaWrapper.style.background="white"/*"#fff6f9"*/;
    }

    if (completionAccumulation >= 10){
        streaksWrapper.style.background="#daffd9"/*"#f7fff6"*/;
        streaksWrapper.style.border="1px solid rgb(167 211 162)"
    } else if (completionAccumulation >=5 ) {
        streaksWrapper.style.background="rgb(255 252 238)"/*"#fffded"*/;
        streaksWrapper.style.border="1px solid rgb(246 223 35)"
    } else {
        streaksWrapper.style.background="white"/*"#fff6f9"*/;
    }

    document.getElementById("no-graph").style.display = "none";
    document.getElementById("no-streak").style.display = "none";
    document.getElementById("graph-container").appendChild(newCanvaWrapper);
    document.getElementById("streaks-container").appendChild(streaksWrapper);

    var ctx = document.getElementById("graph-"+habitObject.habitId).getContext('2d');


    let options = {
        responsive: true,
        legend: {
            position: 'bottom',
            display: false
        },
        scales: {
        xAxes: [{type: 'time', time: {parser: 'YYYY-MM-DD', unit: 'day'}}],
        yAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Progress',
            type: 'line',
            suggestedMin: 0,
            beginAtZero: true
            }
        }]
    },
    };

    
    if (completionAccumulation >= 10){
        graphBackgroundColor = "#b5f7b1";
        graphColor = "#3ce132";
    } else if (completionAccumulation >=5 ) {
        graphBackgroundColor = "rgb(255 249 202)";
        graphColor = "rgb(235 209 0)";
    } else {
        graphBackgroundColor = "rgb(224 224 224)";
        graphColor = "rgb(174 174 174)";
    }
    let chartData = {


    datasets: [
                  /*  {
                        label: 'Your target',
                        data: baseline,
                        fill: false,
                        order: 2
                    }, */
                    {
                        label: 'Your daily score',
                        data: dataToShow,
                        backgroundColor: graphBackgroundColor,
                        borderColor: graphColor,
                        color:'blue',
                        order: 1
                    }
    ]
    };

    var chart = new Chart(ctx, {
    data: chartData,
    options: options,
    type:'line',
    });

}

/*var getElementToPutOnTable = function (value) {
    if ( value ) {
        return value;
    } else {
        return " ";
    }

}*/


var subMenuGo = function( targetLink){

    window.scrollTo(0, 0);

    var journalLink = document.getElementById('journal-link');
    var streaksLink = document.getElementById('streaks-link');
    var weekLink = document.getElementById('week-link');
    var graphContainer = document.getElementById('graph-container');
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