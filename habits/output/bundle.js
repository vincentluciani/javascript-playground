var updateDailyProgress = function(){

    var dailyProgress = getDailyProgress(); 

    var dailyPercentage = Math.round(dailyProgress.fullScore / dailyProgress.numberOfDivs);
    var dailySummaryDiv = document.getElementById("daily-summary");
    var dailySummaryBox = document.getElementById("daily-summary-container");
    var dailyCommentBox = document.getElementById("daily-summary-comment");

    if (dailyPercentage && dailyPercentage>0){
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
        dailyPercentage = 0;
        dailySummaryBox.style.display = "none";
    }
    setDivAppearanceBasedOnCompletion(dailySummaryDiv.parentNode,dailyPercentage);

}

var getDailyProgress=function(){
    var progressDivs = document.getElementsByClassName("percentage-completion");
    currentDate = document.getElementById("date-filter").value;

    var fullScore = 0;
    var numberOfDivs = 0;
    for (const progressDiv of progressDivs){
        var progressDate = progressDiv.getAttribute("progressDate");
        if (progressDate==currentDate){
            var currentScore = parseInt(progressDiv.innerHTML);
            currentScore = (currentScore > 100) ? 100 : currentScore;
            fullScore += currentScore;
            numberOfDivs++;
        }
    }

    return {fullScore,numberOfDivs};
}



var giveSuperKudos = function(title,description){
        document.getElementById("super-positive-message").style.display="flex";
        document.getElementById("super-positive-message-title").innerHTML = title;
        document.getElementById("super-positive-message-subtitle").innerHTML = description ;
}

var encourageIfPassedTarget = function(result, target, isCritical){

        if ( result == target && isCritical && isCritical == "true"){
            giveSuperKudos("Special kudos to you :)","You mastered a critical habit today!");
        } else if (result == target){
            document.getElementById("positive-message").style.display="flex";
            document.getElementById("positive-message-title").innerHTML = buildCongratulationTitle('en_US')+" :)";
            document.getElementById("positive-message-subtitle").innerHTML = buildCongratulationSubTitle('en_US');
        }

}

 var closeMessage = function(){
    document.getElementById("positive-message").style.display="none";
    document.getElementById("super-positive-message").style.display="none";
}

var buildCongratulationTitle = function (locale){
    var listOfWonderfulWords = translations[locale].amazing;

    var randomNumber = getRandomNumber(0, listOfWonderfulWords.length - 1);

    return listOfWonderfulWords[randomNumber];
}

var buildCongratulationSubTitle = function (locale){
    var listOfEncouragements = translations[locale].encouraging;

    var randomNumber = getRandomNumber(0, listOfEncouragements.length - 1);

    return listOfEncouragements[randomNumber];
}
var buildGraphBox = function(unitPerMonth,unitAccumulation,completionAccumulation,habitObject,dataToShow){

    var streaksWrapper = document.createElement("div");

    const grapTitleStreaks = document.createTextNode(habitObject.habitDescription);
    const grapTitleDivStreaks = document.createElement("div");

    var graphIconStreaks = document.createElement("div");
    graphIconStreaks.setAttribute("class","task-icon-container");
    graphIconStreaks.innerHTML = graphIconSmall;

    /*var graphIconStreaks = document.createElement("i");
    graphIconStreaks.setAttribute("class","fa fa-bar-chart");*/

    const streaksTitleDiv = document.createElement("div");
    streaksTitleDiv.innerHTML = "Number of streaks: "+ completionAccumulation.toString();
    streaksTitleDiv.setAttribute("class","subtitle");

    const accumulationTitleDiv = document.createElement("div");
    accumulationTitleDiv.innerHTML = "Number of units: "+ unitAccumulation.toString()+" ("+unitPerMonth+" per month)";
    accumulationTitleDiv.setAttribute("class","subtitle");

    grapTitleDivStreaks.setAttribute("class","graph-title");
    grapTitleDivStreaks.appendChild(graphIconStreaks);
    grapTitleDivStreaks.appendChild(grapTitleStreaks);

    const graphTitle = document.createElement("div");
    graphTitle.innerHTML = "Graph:";
    graphTitle.setAttribute("class","subtitle");

    streaksWrapper.appendChild(grapTitleDivStreaks);
    streaksWrapper.setAttribute("id","streaks-"+habitObject.habitId);
    streaksWrapper.appendChild(streaksTitleDiv);
    streaksWrapper.appendChild(accumulationTitleDiv);
    streaksWrapper.appendChild(graphTitle); 

    var newCanva = document.createElement("canvas");
    newCanva.setAttribute("id","graph-"+habitObject.habitId);

    streaksWrapper.append(newCanva);

    streaksWrapper.setAttribute("class","box canva-wrapper streak-box");


    if (completionAccumulation >= 10){
        streaksWrapper.style.background="#daffd9";
        streaksWrapper.style.border="1px solid rgb(167 211 162)"
    } else if (completionAccumulation >=5 ) {
        streaksWrapper.style.background="rgb(255 252 238)";
        streaksWrapper.style.border="1px solid rgb(246 223 35)"
    } else {
        streaksWrapper.style.background="white";
    }

    document.getElementById("streaks-container").appendChild(streaksWrapper);

    var ctx = document.getElementById("graph-"+habitObject.habitId).getContext('2d');


    let options = {
        responsive: true,
        legend: {
            position: 'bottom',
            display: false
        },
        scales: {
        xAxes: [{type: 'time', time: {parser: 'MMM-DD', unit: 'day',displayFormats: {
            'day': 'MMM DD'
          }}}],
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

    var graphBackgroundColor,graphColor;

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

var loadScriptForGraphs = function(callback){

    /* var chartMinLoad = loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js",callback);
     loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",chartMinLoad);*/
 
   /*  loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js").then(value => {
         console.log(value);
         loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js");
       }, reason => {
         console.log(reason );
       }).then(value => {
         console.log(value);
         callback();
       }, reason => {
         console.log(reason );
       });*/
       /*loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js")
       .then(loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"))
       .catch((error) => {
         console.error(error);
       })
       .then(callback())
       .catch((error) => {
         console.error(error);
       });*/
       loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js")
       .catch((error) => {
        console.error(error);
      })
      .then(waitForChartLoaded())
      .catch((error) => {
        console.error(error);
      })
      .then(callback())
      .catch((error) => {
        console.error(error);
      });
 }

var waitForChartLoaded = async function(){
  return new Promise(
    function (resolve, reject) {
      checkIfChartLoaded(resolve, reject,0);
    }
  );
}

var checkIfChartLoaded = function(resolve, reject,totalWaitingTime){
  var timeIncrement = 50;
  if(typeof Chart !== "undefined"){
    resolve('loaded');
  } else if (totalWaitingTime > 3000){
    reject('timeout waiting for Chart');
  }
  else{
      totalWaitingTime+=timeIncrement;
      setTimeout(checkIfChartLoaded, 50,resolve,reject,totalWaitingTime);
  }
}


var addHabitElement = function(elementToAdd){
    const newHabitDivision = document.createElement("div");

    newHabitDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newHabitDivision.setAttribute("target", elementToAdd.target);
    newHabitDivision.setAttribute("class", "box habit-setting");
    newHabitDivision.setAttribute("id",elementToAdd.habitId.toString());
    newHabitDivision.setAttribute("habitId",elementToAdd.habitId);
    newHabitDivision.setAttribute("weekDay",elementToAdd.weekDay);
    newHabitDivision.setAttribute("isNegative",elementToAdd.isNegative);
    newHabitDivision.setAttribute("isCritical",elementToAdd.isCritical);

    const titleText = document.createTextNode("Update habit:");
    var taskIconContainer = document.createElement("div");
    taskIconContainer.setAttribute("class","task-icon-container");/*
    /*var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");
    var taskIconSvg= taskIcon;
    */
    taskIconContainer.innerHTML = taskIcon;

    const titleTextDiv = document.createElement("div");
    titleTextDiv.appendChild(taskIconContainer);
    titleTextDiv.appendChild(titleText);

    titleTextDiv.setAttribute("class", "habit-title");

    const descriptionText = document.createTextNode("Habit description:");
    const descriptionTextDiv = document.createElement("div");
    descriptionTextDiv.appendChild(descriptionText);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = elementToAdd.habitDescription;
    descriptionInput.setAttribute("class","habit-description-definition large");
    descriptionInput.setAttribute("rows",3);

    const targetText = document.createTextNode("Daily Target:");
    const targetTextDiv = document.createElement("div");
    targetTextDiv.appendChild(targetText);

    const targetValue = document.createElement("input");
    
    targetValue.setAttribute("class","habit-target-definition");
    targetValue.setAttribute("type","number");

    targetValue.value = elementToAdd.target;
    newHabitDivision.appendChild(titleTextDiv);
    newHabitDivision.appendChild(descriptionTextDiv);
    newHabitDivision.appendChild(descriptionInput);
    newHabitDivision.appendChild(targetTextDiv);
    newHabitDivision.appendChild(targetValue);

    var weekDaySelector = dynamicWeekDaySelector(elementToAdd.weekDay);
    newHabitDivision.appendChild(weekDaySelector);

    const isCriticalDivText = document.createElement("div");
    isCriticalDivText.innerHTML="Critical:";
    const isCritical = document.createElement("input");
    isCritical.setAttribute("type","checkbox");
    isCritical.setAttribute("class","simple-checkbox");
    isCritical.setAttribute("id","is-critical");
    if (elementToAdd.isCritical!=null && elementToAdd.isCritical == "true") {
        isCritical.checked = true;  
    } else if (elementToAdd.isCritical == "false"){
        isCritical.checked = false;
    }
    isCritical.value=isCritical.checked;
    newHabitDivision.appendChild(isCriticalDivText);
    newHabitDivision.appendChild(isCritical);

    const saveButton = document.createElement("div");
    var onClickSaveFunctionCall = "saveChangesInHabit(" + elementToAdd.habitId.toString()+ ")";
    saveButton.setAttribute("onClick",onClickSaveFunctionCall);
    saveButton.setAttribute("class","add-button");
    saveButton.innerHTML = '<div class="action-icon-container save-icon">'+saveIcon+'</div>Save';
    newHabitDivision.appendChild(saveButton);

    const deleteButton = document.createElement("div");
    var onClickFunctionCall = "requestHabitDeletion(" + elementToAdd.habitId.toString()+ ")";
    deleteButton.setAttribute("onClick",onClickFunctionCall);
    deleteButton.setAttribute("class","add-button");
    deleteButton.innerHTML = '<div class="action-icon-container delete-icon">'+deleteIcon+'</div>Delete';
    newHabitDivision.appendChild(deleteButton);

    document.getElementById('habits-definition-container').appendChild(newHabitDivision);
}

/* part of the form to add a new habit */
var plusButtonInAddDiv = document.getElementById("plus-in-add-div");
var minusButtonInAddDiv = document.getElementById("minus-in-add-div");
var newTargetDiv = document.getElementById("new-target");

plusButtonInAddDiv.addEventListener('click', function(targetDiv) {
    return function(){
        addOneToProgress(targetDiv);
    }
}(newTargetDiv));

minusButtonInAddDiv.addEventListener('click', function(targetDiv) {
    return function(){
        minusOneToProgress(targetDiv);
    }
}(newTargetDiv));
/* -- */

var closeDeleteMessage = function(){
    document.getElementById("delete-message").style.display="none";
}
var requestHabitDeletion = function(habitId){

    document.getElementById("delete-message").style.display="flex";

    var confirmationButton = document.getElementById("confirm-deletion-button");

    var onClickString = "closeDeleteMessage();deleteHabitAndProgress(" + habitId + ")"
    confirmationButton.setAttribute('onclick',onClickString);

}


var deleteHabitAndProgress = function(habitId){
    deleteHabit(habitId);
    deleteProgressFromHabitToday(habitId);
}

var deleteHabit = function(habitId){
    var habitKey = "habit-"+habitId.toString();
    var element = document.getElementById(habitId.toString());
    element.parentNode.removeChild(element);
    window.localStorage.removeItem(habitKey);
}

var deleteProgressFromHabitToday = function(habitId){
    
    var progressDivs = document.getElementsByClassName("habit-update");    
     
    for ( var i=progressDivs.length-1; i >= 0; i--){
        var progressHabitId = progressDivs[i].getAttribute("habitid");
        var progressDate = progressDivs[i].getAttribute("progressDate");

        var currentDateString = formatDate(currentDateTime); 

        if ( (currentDateString == progressDate) && ( progressHabitId == habitId)) {
            var progressId = progressDivs[i].getAttribute("id");
            progressDivs[i].parentNode.removeChild(progressDivs[i]);
            var progressKey = "progress-"+progressId.toString();
            window.localStorage.removeItem(progressKey);
        }
    }

}

var addEmptyProgressBoxesOnNewDay = function(inputDate, inputDateTime){

    var newCurrentDateTime = new Date();

    var currentDateTimeMidnight = newCurrentDateTime.setHours(0,0,0,0);
    var inputDateTimeMidnight = inputDateTime.setHours(0,0,0,0);
    
    if ( inputDateTimeMidnight > currentDateTimeMidnight){
        return;
    }

    var progressElements = document.getElementsByClassName('habit-update');
    var habitsElements = document.getElementsByClassName('habit-setting');

    var habitsElementsLength = habitsElements.length;
    for (var i=0; i<habitsElementsLength ;i++){

        var isHabitProgressExisting = false;

        for (var progressElement of progressElements){
            if ( habitsElements[i].getAttribute("habitId") == progressElement.getAttribute("habitId") && progressElement.getAttribute("progressdate") == inputDate){
                isHabitProgressExisting = true;
            }
        }

        if ( !isHabitProgressExisting){
            var isDayOK;
            if (habitsElements[i].getAttribute("weekDay")){
                debugWrite("Comparing current date time with habit week day");
                debugWrite("Current date time:");
                debugWrite(inputDateTime);
                debugWrite("Habit week day:");
                debugWrite(habitsElements[i].getAttribute("weekDay"));
                debugWrite("Is critical?:");
                debugWrite(habitsElements[i].getAttribute("iscritical"));
                
                isDayOK = isDayOfWeekInHabitWeeks(inputDateTime, habitsElements[i].getAttribute("weekDay"));
            } else {
                isDayOK = true;
            }
            if (isDayOK != null && isDayOK) {
                let newProgressObject = {
                    id: Date.now()*100+i,
                    habitId: habitsElements[i].getAttribute("habitId"),
                    habitDescription: habitsElements[i].getAttribute("habitDescription"),
                    target: habitsElements[i].getAttribute("target"),
                    progressDate: inputDate,
                    isNew: true,
                    isCritical: habitsElements[i].getAttribute("iscritical"),
                    numberOfCompletions:0,
                }
                addProgressElement(newProgressObject);
                console.log("added progress");
                console.log(newProgressObject);
                pushProgressArrayToQueue(newProgressObject);
            }
        }
    }
    /* go through all elements, if nothing with today's date, go through all habits and add new element with this habit id*/
}

var resetElementsOnNewHabitForm = function(){
    var testElements = document.getElementsByClassName('habit-update');
    for (const testElement of testElements){
        var currentDiv = testElement;
        currentDiv.style.display = 'block';
        /*target number of completion on new habit form */
        var progressClasses = currentDiv.getElementsByClassName("number-of-completion");
        var progressDiv = progressClasses[0];

        if (progressDiv != null){
            refreshProgress(currentDiv);
            progressDiv.addEventListener('change', function(inputDiv) {
                return function(){
                    refreshProgress(inputDiv);
                    
                }
             }(currentDiv));
        }    
    }
    return testElements;
};
/*var taskIcon = '<svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" fill="#000" stroke="#000" stroke-width="2" d="M12,20 L24,20 M12,12 L24,12 M12,4 L24,4 M1,19 L4,22 L9,17 M1,11 L4,14 L9,9 M9,1 L4,6 L1,3"/></svg>'
*/

var taskIcon='<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16"><path fill="#000000" d="M2,11 L4,11 C4.51283143,11 4.93550653,11.386027 4.9932722,11.8833761 L5,12 L5,14 C5,14.51285 4.61395571,14.9355092 4.11662025,14.9932725 L4,15 L2,15 C1.48716857,15 1.06449347,14.613973 1.0067278,14.1166239 L1,14 L1,12 C1,11.48715 1.38604429,11.0644908 1.88337975,11.0067275 L2,11 L4,11 L2,11 Z M14,12 C14.5523,12 15,12.4477 15,13 C15,13.5523 14.5523,14 14,14 L8,14 C7.44772,14 7,13.5523 7,13 C7,12.4477 7.44772,12 8,12 L14,12 Z M4,12 L2,12 L2,14 L4,14 L4,12 Z M4,6 C4.55228,6 5,6.44772 5,7 L5,9 C5,9.55228 4.55228,10 4,10 L2,10 C1.44772,10 1,9.55228 1,9 L1,7 C1,6.44772 1.44772,6 2,6 L4,6 Z M14,7 C14.5523,7 15,7.44772 15,8 C15,8.51283143 14.613973,8.93550653 14.1166239,8.9932722 L14,9 L8,9 C7.44772,9 7,8.55228 7,8 C7,7.48716857 7.38604429,7.06449347 7.88337975,7.0067278 L8,7 L14,7 Z M4,7 L2,7 L2,9 L4,9 L4,7 Z M4.77466,1.22614 C5.04092364,1.49240364 5.06512942,1.90907223 4.84727736,2.20268222 L4.77466,2.2868 L2.28033,4.78113 C2.13968,4.92179 1.94891,5.0008 1.75,5.0008 C1.590872,5.0008 1.4369536,4.9502336 1.30973856,4.85798912 L1.21967,4.78113 L0.21967,3.78113 C-0.0732233,3.48824 -0.0732233,3.01337 0.21967,2.72047 C0.485936364,2.45420636 0.902600248,2.43000058 1.19621162,2.64785264 L1.28033,2.72047 L1.75,3.19014 L3.714,1.22614 C4.00689,0.933247 4.48176,0.933246 4.77466,1.22614 Z M14,2 C14.5523,2 15,2.44772 15,3 C15,3.51283143 14.613973,3.93550653 14.1166239,3.9932722 L14,4 L8,4 C7.44772,4 7,3.55228 7,3 C7,2.48716857 7.38604429,2.06449347 7.88337975,2.0067278 L8,2 L14,2 Z"/></svg>'
var writeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" class="jam jam-write"><path stroke="#ffffff" fill="#ffffff" d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/></svg>'
var writeIconSmall = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#000" stroke="#000" viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" class="jam jam-write"><path stroke="#000" fill="#000" d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/></svg>'

var graphIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 305.004 305.004" style="enable-background:new 0 0 305.004 305.004;" xml:space="preserve"><g><path fill="#ffffff"  stroke="#ffffff" d="M68.788,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-60.149c0-5.247-4.253-9.5-9.5-9.5H68.788c-5.247,0-9.5,4.253-9.5,9.5   v60.149C59.288,177.615,63.541,181.868,68.788,181.868z"/><path stroke="#ffffff" fill="#ffffff" d="M138.71,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5V84.174c0-5.247-4.253-9.5-9.5-9.5H138.71c-5.247,0-9.5,4.253-9.5,9.5   v88.195C129.21,177.615,133.463,181.868,138.71,181.868z"/><path stroke="#ffffff" fill="#ffffff" d="M208.632,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-19.195c0-5.247-4.253-9.5-9.5-9.5h-27.583c-5.247,0-9.5,4.253-9.5,9.5   v19.195C199.132,177.615,203.385,181.868,208.632,181.868z"/><path stroke="#ffffff" fill="#ffffff"  d="M290.668,22.769H167.502V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v7.769H14.335c-5.247,0-9.5,4.253-9.5,9.5v195   c0,5.247,4.253,9.5,9.5,9.5h123.167v20.719L97.15,276.42c-7.5,3.52-10.728,12.451-7.209,19.951   c3.518,7.5,12.451,10.727,19.951,7.209l28.25-13.254c1.858,6.174,7.581,10.674,14.36,10.674c6.779,0,12.502-4.5,14.36-10.673   l28.25,13.254c7.507,3.52,16.435,0.285,19.951-7.209c3.519-7.5,0.291-16.432-7.209-19.951l-40.352-18.932v-20.719h123.167   c5.247,0,9.5-4.253,9.5-9.5v-195C300.168,27.022,295.915,22.769,290.668,22.769z M270.168,206.769H34.835v-154h235.333V206.769z"/></svg>'

var graphIconSmall = '<svg xmlns="http://www.w3.org/2000/svg" width="17px" height="17px" fill="#000" stroke="#000"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 305.004 305.004" style="enable-background:new 0 0 305.004 305.004;" xml:space="preserve"><g><path fill="#000"  stroke="#000" d="M68.788,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-60.149c0-5.247-4.253-9.5-9.5-9.5H68.788c-5.247,0-9.5,4.253-9.5,9.5   v60.149C59.288,177.615,63.541,181.868,68.788,181.868z"/><path stroke="#000" fill="#000" d="M138.71,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5V84.174c0-5.247-4.253-9.5-9.5-9.5H138.71c-5.247,0-9.5,4.253-9.5,9.5   v88.195C129.21,177.615,133.463,181.868,138.71,181.868z"/><path stroke="#000" fill="#000" d="M208.632,181.868h27.583c5.247,0,9.5-4.253,9.5-9.5v-19.195c0-5.247-4.253-9.5-9.5-9.5h-27.583c-5.247,0-9.5,4.253-9.5,9.5   v19.195C199.132,177.615,203.385,181.868,208.632,181.868z"/><path stroke="#000" fill="#000"  d="M290.668,22.769H167.502V15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v7.769H14.335c-5.247,0-9.5,4.253-9.5,9.5v195   c0,5.247,4.253,9.5,9.5,9.5h123.167v20.719L97.15,276.42c-7.5,3.52-10.728,12.451-7.209,19.951   c3.518,7.5,12.451,10.727,19.951,7.209l28.25-13.254c1.858,6.174,7.581,10.674,14.36,10.674c6.779,0,12.502-4.5,14.36-10.673   l28.25,13.254c7.507,3.52,16.435,0.285,19.951-7.209c3.519-7.5,0.291-16.432-7.209-19.951l-40.352-18.932v-20.719h123.167   c5.247,0,9.5-4.253,9.5-9.5v-195C300.168,27.022,295.915,22.769,290.668,22.769z M270.168,206.769H34.835v-154h235.333V206.769z"/></svg>'

var plusIconBig = '<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="45.402px" height="45.402px" viewBox="0 0 45.402 45.402" style="enable-background:new 0 0 45.402 45.402;" xml:space="preserve"><g><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></g></svg>'

var collapseIcon='<svg xmlns="http://www.w3.org/2000/svg" fill="#b657af" stroke="#b657af" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21  S39.776,16,37.059,16z"/></svg>'

var expandIcon='<svg xmlns="http://www.w3.org/2000/svg" fill="#b657af" stroke="#b657af" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><g><path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/></g></svg>'

var trophyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 981.555 981.555" style="enable-background:new 0 0 981.555 981.555;" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M512,112c0-25.641-9.984-49.75-28.117-67.875C456.906,17.141,417.795,9.914,384,21.844V16c0-8.836-7.163-16-16-16H144  c-8.837,0-16,7.164-16,16v5.844c-33.798-11.93-72.904-4.711-99.883,22.281C9.984,62.25,0,86.359,0,112s9.984,49.75,28.117,67.875  c0.2,0.203,0.438,0.328,0.643,0.523c0.193,0.188,0.33,0.406,0.529,0.586l109.258,98.75c5.021,4.555,58.156,45.031,85.453,52.07V384  l-16,64h-16c-17.673,0-32,14.328-32,32v32h192v-32c0-17.672-14.327-32-32-32h-16l-16-64v-52.195  c27.297-7.039,80.433-47.531,85.453-52.07l109.258-98.75c0.199-0.18,0.336-0.398,0.529-0.586c0.205-0.195,0.443-0.32,0.643-0.523  C502.016,161.75,512,137.641,512,112z M393.367,89.375c12.484-12.469,32.781-12.469,45.266,0C444.672,95.422,448,103.453,448,112  c0,8.461-3.281,16.406-9.207,22.43L384,183.953V95.766C387.382,94.227,390.587,92.156,393.367,89.375z M73.367,89.375  c12.484-12.469,32.781-12.469,45.266,0c2.78,2.781,5.985,4.844,9.367,6.391v88.187L73.207,134.43C67.281,128.406,64,120.461,64,112  C64,103.453,67.328,95.422,73.367,89.375z"/></svg>'


var trophyIcon2='<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><g><path d="M256,250.719c-59.095,0-107.172,48.048-107.172,107.107S196.905,464.933,256,464.933     c59.095,0,107.172-48.048,107.172-107.107S315.094,250.719,256,250.719z M256,444.02c-47.565,0-86.26-38.667-86.26-86.196     s38.696-86.196,86.26-86.196s86.26,38.667,86.26,86.196C342.26,405.354,303.564,444.02,256,444.02z"/><path d="M510.777,11.057c-1.814-3.415-5.366-5.768-9.232-5.768H324.945c-3.474,0-6.722,1.946-8.667,4.826l-60.222,89.33     l-60.341-89.394c-1.945-2.875-5.189-4.764-8.662-4.764H10.456c-3.869,0-7.42,2.356-9.235,5.772     c-1.814,3.417-1.593,7.665,0.572,10.87l153.112,226.567c-29.437,27.22-47.9,66.157-47.9,109.302     c0,82.104,66.839,148.915,148.995,148.915s148.995-66.79,148.995-148.895c0-43.077-18.406-81.93-47.763-109.143L510.21,21.921     C512.373,18.717,512.592,14.471,510.777,11.057z M431.422,26.2L303.206,216.368c-14.268-4.775-29.493-7.55-45.302-7.75     L380.962,26.2H431.422z M330.503,26.2h25.23L231.301,210.762c-10.83,1.813-21.267,4.687-31.177,8.709L330.503,26.2z      M181.503,26.2l61.943,91.818l-12.591,18.543L156.289,26.2H181.503z M131.044,26.2l87.202,129.153l-25.211,37.24L80.596,26.2     H131.044z M30.144,26.2h25.209l125.071,185.186l-12.617,18.582L30.144,26.2z M384.083,357.826     c0,70.574-57.458,127.99-128.084,127.99s-128.084-57.416-128.084-127.99S185.374,229.836,256,229.836     S384.083,287.252,384.083,357.826z M340.882,235.304c-5.719-3.976-11.728-7.675-17.99-10.832L456.652,26.2h25.22L340.882,235.304     z"/></g></g></g></svg>';
var trophyIconBig = '<svg xmlns="http://www.w3.org/2000/svg" stroke="white" fill="white" width="200px" height="200px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 510 510" style="enable-background:new 0 0 981.555 981.555;" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M512,112c0-25.641-9.984-49.75-28.117-67.875C456.906,17.141,417.795,9.914,384,21.844V16c0-8.836-7.163-16-16-16H144  c-8.837,0-16,7.164-16,16v5.844c-33.798-11.93-72.904-4.711-99.883,22.281C9.984,62.25,0,86.359,0,112s9.984,49.75,28.117,67.875  c0.2,0.203,0.438,0.328,0.643,0.523c0.193,0.188,0.33,0.406,0.529,0.586l109.258,98.75c5.021,4.555,58.156,45.031,85.453,52.07V384  l-16,64h-16c-17.673,0-32,14.328-32,32v32h192v-32c0-17.672-14.327-32-32-32h-16l-16-64v-52.195  c27.297-7.039,80.433-47.531,85.453-52.07l109.258-98.75c0.199-0.18,0.336-0.398,0.529-0.586c0.205-0.195,0.443-0.32,0.643-0.523  C502.016,161.75,512,137.641,512,112z M393.367,89.375c12.484-12.469,32.781-12.469,45.266,0C444.672,95.422,448,103.453,448,112  c0,8.461-3.281,16.406-9.207,22.43L384,183.953V95.766C387.382,94.227,390.587,92.156,393.367,89.375z M73.367,89.375  c12.484-12.469,32.781-12.469,45.266,0c2.78,2.781,5.985,4.844,9.367,6.391v88.187L73.207,134.43C67.281,128.406,64,120.461,64,112  C64,103.453,67.328,95.422,73.367,89.375z"/></svg>'

var warningIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="15px" height="15px" fill="red" stroke="red"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 491.537 491.537" style="enable-background:new 0 0 491.537 491.537;" xml:space="preserve"><g><g>	<path d="M488.117,459.466l-223.1-447.2c-10.4-17.4-32-13.1-37.5,0l-225.2,449.3c-8,15.6,6.3,29.2,18.8,29.2h449.6c0,0,0.3,0,0.8,0    C487.517,490.766,497.017,472.466,488.117,459.466z M54.417,450.066l191.8-383.6l190.8,383.7h-382.6V450.066z"/><path d="M225.417,206.166v104.3c0,11.5,9.4,20.9,20.9,20.9c11.5,0,19.8-8.3,20.9-19.8v-105.4c0-11.5-9.4-20.9-20.9-20.9    C234.817,185.266,225.417,194.666,225.417,206.166z"/>		<circle cx="246.217" cy="388.066" r="20.5"/></g></g></svg>';

/*var calendarIcon2 = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 470 470" style="enable-background:new 0 0 470 470;" xml:space="preserve"><g><path d="M462.5,425H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5S466.643,425,462.5,425z"/><path d="M462.5,455H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5S466.643,455,462.5,455z"/><path d="M462.5,30h-25v-7.5C437.5,10.093,427.406,0,415,0s-22.5,10.093-22.5,22.5V30h-75v-7.5C317.5,10.093,307.406,0,295,0   s-22.5,10.093-22.5,22.5V30h-75v-7.5C197.5,10.093,187.407,0,175,0s-22.5,10.093-22.5,22.5V30h-75v-7.5C77.5,10.093,67.407,0,55,0   S32.5,10.093,32.5,22.5V30h-25C3.358,30,0,33.358,0,37.5v365c0,4.142,3.358,7.5,7.5,7.5h455c4.143,0,7.5-3.358,7.5-7.5v-365   C470,33.358,466.643,30,462.5,30z M407.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M287.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M167.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M47.5,22.5c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v30c0,4.136-3.364,7.5-7.5,7.5   s-7.5-3.364-7.5-7.5V22.5z M32.5,45v7.5C32.5,64.907,42.593,75,55,75s22.5-10.093,22.5-22.5V45h75v7.5   c0,12.407,10.093,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45h75v7.5c0,12.407,10.094,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45h75v7.5   c0,12.407,10.094,22.5,22.5,22.5s22.5-10.093,22.5-22.5V45H455v77.3H15V45H32.5z M15,395V137.3h440V395H15z"/><path d="M412,226.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,226.8,412,226.8z"/><path d="M331,226.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,226.8,331,226.8z"/><path d="M250,226.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,226.8,250,226.8z"/><path d="M169,226.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,226.8,169,226.8z"/><path d="M88,226.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,226.8,88,226.8z"/><path d="M331,280.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,280.8,331,280.8z"/><path d="M250,280.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,280.8,250,280.8z"/><path d="M169,280.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,280.8,169,280.8z"/><path d="M88,280.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,280.8,88,280.8z"/><path d="M331,334.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,334.8,331,334.8z"/><path d="M412,280.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,280.8,412,280.8z"/><path d="M412,334.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,334.8,412,334.8z"/><path d="M250,334.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,334.8,250,334.8z"/><path d="M169,334.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,334.8,169,334.8z"/><path d="M88,334.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,334.8,88,334.8z"/><path d="M412,172.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S416.143,172.8,412,172.8z"/><path d="M331,172.8h-30c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S335.143,172.8,331,172.8z"/><path d="M250,172.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.143,0,7.5-3.358,7.5-7.5S254.143,172.8,250,172.8z"/><path d="M169,172.8h-30c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S173.142,172.8,169,172.8z"/><path d="M88,172.8H58c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h30c4.142,0,7.5-3.358,7.5-7.5S92.142,172.8,88,172.8z"/></g></svg>';
*/
var calendarIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="15px" height="15px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.2 489.2" style="enable-background:new 0 0 489.2 489.2;" xml:space="preserve"><g><path d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4    c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1    v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8    c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1    v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4    c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z     M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2    z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9    c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8    c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9    z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1    c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7    c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"/>	</g></svg>';

var calendarIconBig = '<svg xmlns="http://www.w3.org/2000/svg"  width="100px" height="100px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.2 489.2" style="enable-background:new 0 0 489.2 489.2;" xml:space="preserve"><g><path d="M177.8,238.1c0,4.5-3.6,8.1-8.1,8.1h-30.4c-4.5,0-8.1-3.6-8.1-8.1v-30.4c0-4.5,3.6-8.1,8.1-8.1h30.4    c4.5,0,8.1,3.6,8.1,8.1V238.1z M241.3,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M304.8,207.8c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V207.8z M177.8,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M241.3,269.6c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1V269.6z M296.7,261.5h-30.4c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1    v-30.4C304.8,265.1,301.2,261.5,296.7,261.5z M106.1,323.3H75.8c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4    c4.5,0,8.1-3.6,8.1-8.1v-30.4C114.3,326.9,110.6,323.3,106.1,323.3z M114.3,269.6c0-4.5-3.6-8.1-8.1-8.1H75.8    c-4.5,0-8.1,3.6-8.1,8.1V300c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1V269.6z M233.2,323.3h-30.4c-4.5,0-8.1,3.6-8.1,8.1    v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C241.3,326.9,237.7,323.3,233.2,323.3z M169.7,323.3h-30.4    c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1h30.4c4.5,0,8.1-3.6,8.1-8.1v-30.4C177.8,326.9,174.2,323.3,169.7,323.3z     M360.2,246.3c4.5,0,8.1-3.6,8.1-8.1v-30.4c0-4.5-3.6-8.1-8.1-8.1h-30.4c-4.5,0-8.1,3.6-8.1,8.1v30.4c0,4.5,3.6,8.1,8.1,8.1H360.2    z M47.7,435.9h230.7c-3.7-11.6-5.8-24-5.9-36.8H47.7c-6,0-10.8-4.9-10.8-10.8V171h361.7v101.1c12.8,0.1,25.2,2,36.8,5.7V94.9    c0-26.3-21.4-47.7-47.7-47.7h-53.4V17.8c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H163V17.8    c0-9.6-7.8-17.4-17.4-17.4h-27.1c-9.6,0-17.4,7.8-17.4,17.4v29.5H47.7C21.4,47.3,0,68.7,0,95v293.3C0,414.5,21.4,435.9,47.7,435.9    z M489.2,397.7c0,50.3-40.8,91.1-91.1,91.1S307,448,307,397.7s40.8-91.1,91.1-91.1S489.2,347.4,489.2,397.7z M444.1,374.1    c0-2.9-1.1-5.7-3.2-7.7c-4.3-4.3-11.2-4.3-15.5,0L385.8,406l-15.2-15.2c-4.3-4.3-11.2-4.3-15.5,0c-2.1,2.1-3.2,4.8-3.2,7.7    c0,2.9,1.1,5.7,3.2,7.7l22.9,22.9c4.3,4.3,11.2,4.3,15.5,0l47.3-47.3C443,379.8,444.1,377,444.1,374.1z"/>	</g></svg>';

var saveIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M493.254,77.255l-58.508-58.51C422.742,6.742,406.465,0,389.49,0H352v112c0,8.836-7.164,16-16,16H80   c-8.836,0-16-7.164-16-16V0H32C14.328,0,0,14.326,0,32v448c0,17.673,14.328,32,32,32h448c17.672,0,32-14.327,32-32V122.51   C512,105.535,505.258,89.257,493.254,77.255z M448,448H64V256h384V448z"/>	<rect x="224" width="64" height="96"/></g></svg>'

var deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="#ffffff" stroke="#ffffff" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 284.011 284.011" style="enable-background:new 0 0 284.011 284.011;" xml:space="preserve"><g><g><path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611    c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106    c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68    l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706    c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396    c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z     M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455    c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604    c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z     M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108    C231.845,86.509,233.85,92.142,231.62,96.835z"/></g></g></svg>'


var emptyCircleToday = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px"  fill="#d330cb" stroke="#d330cb"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 29.107 29.107" style="enable-background:new 0 0 29.107 29.107;" xml:space="preserve"><g><g id="c149_moon"><path id="_x3C_Compound_Path_x3E__7_" d="M14.558,2.079c6.877,0,12.471,5.597,12.471,12.473c0,6.877-5.594,12.476-12.471,12.476    c-6.879,0-12.478-5.599-12.478-12.476C2.08,7.676,7.679,2.079,14.558,2.079 M14.558,0C6.563,0,0,6.562,0,14.552    c0,7.995,6.563,14.555,14.558,14.555s14.549-6.56,14.549-14.555C29.106,6.562,22.552,0,14.558,0L14.558,0z"/></g><g id="Capa_1_226_"></g></g></svg>'

var fullCirclePast = '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#55d355" stroke="#55d355" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve"><circle cx="227.5" cy="227.5" r="227.5"/></svg>'

var fullCircleRed = fullCirclePast.replace("#55d355","red");

var minusIconGreen= '<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="#55d355" stroke="#55d355"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 42 42;" xml:space="preserve"><path d="M37.059,16H26H16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16h10h11.059C39.776,26,42,23.718,42,21  S39.776,16,37.059,16z"/></svg>';

var startIcon='<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="#ffffff" stroke="#ffffff"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 485 485" style="enable-background:new 0 0 485 485;" xml:space="preserve"><g>	<path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5   s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026   C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5   S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"/>	<polygon points="181.062,336.575 343.938,242.5 181.062,148.425  "/></g></svg>'
var displayJournalEditBox = function(){
    var progressDate = document.getElementById("date-filter").value;
    var editBox = document.getElementById("journal-edit-box");
    var editBoxTextBox = document.getElementById("daily-journal");

    var currentText = getCurrentDateJournal(progressDate);
    editBoxTextBox.value = "";
    if (currentText && currentText.length>0){
        editBoxTextBox.value = JSON.parse(currentText);
    }

    editBox.setAttribute("progressDate",progressDate);

    editBox.style.display="flex";
};

var getCurrentDateJournal = function(journalDate){

    return window.localStorage.getItem("journal-"+journalDate);

}
var closeJournal = function(){
    var editBox = document.getElementById("journal-edit-box");
    var journalDate = editBox.getAttribute("progressDate");
    var editBoxText = document.getElementById("daily-journal").value;

    var objectToSave = {
        id: "journal-" + journalDate.toString(),
        value: JSON.stringify(editBoxText)
    }

    executePushToQueue(objectToSave);

    editBox.style.display="none";
}


var convertJournalKeyToDateInt = function(journalKey){
    var resultString = journalKey.substring(8,12) + journalKey.substring(13,15)  + journalKey.substring(16,19)   
    return parseInt(resultString);
}
var readJournal = function(journalArray){

    if (journalArray.length == 0){
        return 0;
    }
    journalArray.sort(function(a, b){
		return ( convertJournalKeyToDateInt(b.key) - convertJournalKeyToDateInt(a.key))
		});	

    for ( var journalEntry of journalArray){
        var journalText = journalEntry.text;
        if ( journalText.length > 0){
            var brDiv = document.createElement("br");
            var journalDiv = document.createElement("div");
            var dateDiv = document.createElement("div");
            dateDiv.innerHTML = journalEntry.key.substr(8);
            dateDiv.setAttribute("class","date-label");
            var textDiv = document.createElement("div");
            textDiv.innerHTML = journalText;
            textDiv.setAttribute("class","text-label");
            journalDiv.appendChild(dateDiv);
            journalDiv.appendChild(textDiv);   
            journalDiv.appendChild(brDiv);
            document.getElementById("journal-container").appendChild(journalDiv);
        }     
    }

}



var addProgressElement = function(elementToAdd){

    const newProgressDivision = document.createElement("div");

    /* Main Attributes */
    newProgressDivision.setAttribute("id", elementToAdd.id );
    newProgressDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newProgressDivision.setAttribute("target", elementToAdd.target);
    newProgressDivision.setAttribute("progressDate", elementToAdd.progressDate );
    newProgressDivision.setAttribute("class", "box habit-update");
    newProgressDivision.setAttribute("isNew",elementToAdd.isNew);
    newProgressDivision.setAttribute("habitId",elementToAdd.habitId);
    newProgressDivision.setAttribute("isNegative", elementToAdd.isNegative);
    newProgressDivision.setAttribute("isCritical", elementToAdd.isCritical);

    const habitDescriptionText = document.createTextNode(elementToAdd.habitDescription);
    const targetValue = document.createElement("input");
    const currentProgressText = document.createTextNode("Number of times completed:");
    const currentProgressTextOneTarget = document.createTextNode("Check when completed:");
    const currentCompletionText = document.createTextNode("Percentage Completion:");
    const progressInput = document.createElement("input");
    const percentageCompletionInput = document.createElement("div");

    const targetText = document.createTextNode(" of "+elementToAdd.target);
    const targetTextDiv = document.createElement("div");
    targetTextDiv.setAttribute('class','side-text');
    targetTextDiv.appendChild(targetText);

    var percentageCompletion = 0;
    if ( elementToAdd.isNegative != null && elementToAdd.isNegative == "true"){
            if ( elementToAdd.numberOfCompletions <= elementToAdd.target ){
                percentageCompletion = 100;
            }
    } else {
        percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / elementToAdd.target) ;
    }
 

    progressInput.setAttribute("class","number-of-completion");

    percentageCompletionInput.setAttribute("class","percentage-completion");
    percentageCompletionInput.setAttribute("progressDate",elementToAdd.progressDate);
    percentageCompletionInput.innerHTML = percentageCompletion.toString();

    var habitDescriptionContainer = document.createElement("div");
    habitDescriptionContainer.setAttribute("class","habit-description");
    var expandButtonWrapper = document.createElement("span");
    expandButtonWrapper.setAttribute("class","plus-minus");

   /* var expandButtonContainer = document.createElement("i");
    expandButtonContainer.setAttribute("class","fa fa-plus");
    expandButtonWrapper.appendChild(expandButtonContainer);*/
    expandButtonWrapper.innerHTML = expandIcon;

    var taskIconContainer = document.createElement("div");
    taskIconContainer.setAttribute("class","task-icon-container");/*
    var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");
        taskIconContainer.appendChild(taskIcon);*/

    taskIconContainer.innerHTML = taskIcon;

    habitDescriptionContainer.appendChild(taskIconContainer);
    habitDescriptionContainer.appendChild(habitDescriptionText);
    newProgressDivision.appendChild(habitDescriptionContainer);
    newProgressDivision.appendChild(expandButtonWrapper);

    var detailsArea = document.createElement("div");
    detailsArea.setAttribute("class","progress-details");
    
    var currentProgressContainer = document.createElement("div");
    currentProgressContainer.setAttribute("class","progress-container");

    if (elementToAdd.target > 1){
        progressInput.setAttribute("type","number");
        progressInput.setAttribute("value",elementToAdd.numberOfCompletions);
        currentProgressContainer.appendChild(currentProgressText);
        var plusButtonText = document.createTextNode("+");
        var plusButton = document.createElement("div");

        plusButton.setAttribute("class","plus-button normal");
        var minusButtonText = document.createTextNode("-");
        var minusButton = document.createElement("div");
        plusButton.appendChild(plusButtonText);
        minusButton.setAttribute("class","minus-button normal");
        minusButton.appendChild(minusButtonText);
        plusButton.addEventListener('click', function(newProgressDivision) {
            return function(){
                var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0];
                addOneToProgress(progressInput);
                refreshProgress(newProgressDivision);
                console.log("added progress:");
                console.log(newProgressDivision);

                pushProgressToQueue(newProgressDivision);
            }
        }(newProgressDivision));

        minusButton.addEventListener('click', function(newProgressDivision) {
            return function(){
                var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0];         
                minusOneToProgress(progressInput);
                refreshProgress(newProgressDivision);
                console.log("added progress");
                console.log(newProgressDivision);
                pushProgressToQueue(newProgressDivision);
            }
        }(newProgressDivision));
        detailsArea.appendChild(currentProgressContainer);
        detailsArea.appendChild(minusButton);
        detailsArea.appendChild(progressInput);
        detailsArea.appendChild(plusButton);
        detailsArea.appendChild(targetTextDiv);

    } else {
        currentProgressContainer.appendChild(currentProgressTextOneTarget);
        var checkBoxContainer = document.createElement("label");
        checkBoxContainer.setAttribute("class","custom-checkbox-container")
        var checkMark = document.createElement("span");
        checkMark.setAttribute("class","checkmark");

        progressInput.setAttribute("type","checkbox");
        if (elementToAdd.numberOfCompletions == 1){
            progressInput.checked = true;
            progressInput.setAttribute("value","1");
        } else {
            progressInput.checked = false;
            progressInput.setAttribute("value","0");
        }
        progressInput.addEventListener('click', function(newProgressDivision) {
            return function(){
                var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0];         
                if (progressInput.checked == true){
                    progressInput.setAttribute("value","1");
                } else {
                    progressInput.setAttribute("value","0");
                }
                refreshProgress(newProgressDivision);
                console.log("added progress");
                console.log(newProgressDivision);
                pushProgressToQueue(newProgressDivision);
            }
        }(newProgressDivision));

        checkBoxContainer.appendChild(progressInput);
        checkBoxContainer.appendChild(checkMark);

        detailsArea.appendChild(currentProgressContainer);
        detailsArea.appendChild(checkBoxContainer);

    }


    var completionTextContainer = document.createElement("div");
    completionTextContainer.setAttribute("class","progress-container");

    completionTextContainer.appendChild(currentCompletionText);
    detailsArea.appendChild(completionTextContainer);
    detailsArea.appendChild(percentageCompletionInput);
    newProgressDivision.appendChild(detailsArea);

    targetValue.value = elementToAdd.target;

    document.getElementById('habits-container').appendChild(newProgressDivision);
    newProgressDivision.addEventListener('change', function(newProgressDivision) {
        return function(){
            refreshProgress(newProgressDivision);
            console.log("added progress");
            console.log(newProgressDivision);
            pushProgressToQueue(newProgressDivision);}
     }(newProgressDivision));

     expandButtonWrapper.addEventListener('click', function(expandButtonWrapper,detailsArea) {
        return function(){
            toggleExpandCollapse(expandButtonWrapper,detailsArea);
        }
     }(expandButtonWrapper,detailsArea));

     refreshProgress(newProgressDivision);


};

var toggleExpandCollapse = function(toggleButton,divToTransform){
/*
    const targetIsPlus = toggleButton.classList.toggle("fa-plus");
    const targetIsMinus = toggleButton.classList.toggle("fa-minus");

    if (targetIsPlus && !targetIsMinus){
        divToTransform.style.display = 'none';
        toggleButton.innerHTML = expandIcon;
    } else {
        divToTransform.style.display = 'block';
        toggleButton.innerHTML = collapseIcon;
    }
*/
var currentFill = toggleButton.firstChild.getAttribute("fill");
var currentStroke = toggleButton.firstChild.getAttribute("stroke");

if (divToTransform.style.display=='block'){
    divToTransform.style.display = 'none';
    toggleButton.innerHTML = expandIcon;
} else {
    divToTransform.style.display = 'block';
    toggleButton.innerHTML = collapseIcon;
}
toggleButton.firstChild.setAttribute("fill",currentFill);
toggleButton.firstChild.setAttribute("stroke",currentStroke);
}


function renderPastProgressBoxes(){
    for (const habitsElement of dataArrays.pastProgressArray){
        addProgressElement(habitsElement);
    }

    applyFilters();
    saveLoop();
}


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

    setDivAppearanceBasedOnCompletion(currentDiv,newCompletionPercentage);

    updateDailyProgress();

}

var putBorderBackgroundOrderBasedOnCompletion = function(currentDiv,newCompletionPercentage){

    if (newCompletionPercentage>=100){
        currentDiv.style.border="3px solid rgb(167 211 162)";
        currentDiv.style.order="95";
        currentDiv.style.background="#daffd9";
    } else if (newCompletionPercentage>=50){
        currentDiv.style.border="3px solid rgb(246 223 35)";
        currentDiv.style.background="rgb(255 251 234)";
        currentDiv.style.order="70";
    } else if (newCompletionPercentage<50){
        currentDiv.style.border="1px solid lightgrey";
        currentDiv.style.background="white";
        currentDiv.style.order="70";
    }
    if (currentDiv.id && currentDiv.id == "daily-summary-container"){
        currentDiv.style.order = "90";
    }

}

var setDivAppearanceForCritical = function(currentDiv,newCompletionPercentage){
    var plusMinusDiv = currentDiv.getElementsByClassName("plus-minus")[0];
    var taskIconDiv;

    if (newCompletionPercentage <100 ){
        currentDiv.style.order = "60";
        currentDiv.style.border="3px solid red"; 
        currentDiv.style.background="#fff1f1";

        taskIconDiv = currentDiv.getElementsByClassName("task-icon-container")[0];
        if (taskIconDiv && plusMinusDiv){
            taskIconDiv.innerHTML=warningIcon;
            /*taskIconDiv.setAttribute("stroke","red");
            taskIconDiv.setAttribute("fill","red");      */     
            /*currentDiv.getElementsByClassName("fa")[0].classList.add("fa-warning");*/
            currentDiv.getElementsByClassName("habit-description")[0].classList.add("red");
            /*plusMinusDiv.style.color="red";*/
     
        }
        plusMinusDiv.firstChild.setAttribute("stroke","red");
        plusMinusDiv.firstChild.setAttribute("fill","red");

    } else if (newCompletionPercentage >=100){
        currentDiv.style.border="3px solid lightgrey"; 
        taskIconDiv = currentDiv.getElementsByClassName("task-icon-container")[0];
        if (taskIconDiv && plusMinusDiv){
            /*taskIconDiv.classList.remove("fa-warning");
            currentDiv.getElementsByClassName("fa")[0].classList.add("fa-tasks");*/
            taskIconDiv.innerHTML=taskIcon;
           /* taskIconDiv.setAttribute("stroke","black");
            taskIconDiv.setAttribute("fill","black");  */
            currentDiv.getElementsByClassName("habit-description")[0].classList.remove("red");
            /*plusMinusDiv.style.color="#b657af";*/
            
        }    
        plusMinusDiv.firstChild.setAttribute("stroke","#b657af");
        plusMinusDiv.firstChild.setAttribute("fill","#b657af");
    }
}



var updateProgressOnRadial = function( percentageValue, parameters){

    var circleRadius = ( parameters.containerHeight / 2 ) - parameters.strokeWidth;

    var circleDiv = document.getElementById(parameters.suffixForIds+'_background-circle');
    var progressDiv = document.getElementById(parameters.suffixForIds+'_progress-circle');
    var percentageValueDiv = document.getElementById(parameters.suffixForIds+'_percentage-value');
    
    if (percentageValueDiv){
        percentageValueDiv.innerHTML = percentageValue + " %";
    } else {
        return;
    }
    var textMarginLeft = (parameters.strokeWidth + circleRadius)/1.5 + parameters.textLeftAdjustment;
    percentageValueDiv.style.marginLeft = textMarginLeft.toString()+"px";
    
    progressDiv.style.stroke = parameters.progressColor;
    circleDiv.style.stroke  = parameters.emptyColor;

  
    if (!isNaN(percentageValue)) {

        circleDiv.setAttribute('r',circleRadius);
        progressDiv.setAttribute('r',circleRadius);
        var circonference = Math.PI*circleRadius*2;
    
        if (percentageValue < 0) { percentageValue = 0;}
        if (percentageValue > 100) { percentageValue = 100;}
        
        var emptyPathLength = ((100-percentageValue)/100)*circonference;
        
        progressDiv.setAttribute("stroke-dashoffset", emptyPathLength);


        window.setTimeout(function() {
            progressDiv.style.strokeDashoffset = emptyPathLength;
        }, 50)

        progressDiv.setAttribute("stroke-dasharray", circonference);
        circleDiv.setAttribute("stroke-dasharray", circonference);
    }
}


var createRadialProgressBar = function(parameters){

    var circleRadius = ( parameters.containerHeight / 2 ) - parameters.strokeWidth;

    var anchorDiv = document.getElementById(parameters.anchorDivId);


    var w3uri = 'http://www.w3.org/2000/svg';

    const circleContainer = document.createElement("div");
    circleContainer.setAttribute("id",parameters.suffixForIds+"_percentage-circle-container");
    const svgProgressBar = document.createElementNS(w3uri,'svg');
    svgProgressBar.setAttributeNS(w3uri,"id",parameters.suffixForIds+"_svg-progress-bar");
    svgProgressBar.setAttributeNS(w3uri,"z-index",-1);

    const backgroundCircle = document.createElementNS(w3uri,'circle');
    backgroundCircle.setAttribute("id",parameters.suffixForIds+"_background-circle");                 
    backgroundCircle.setAttribute("stroke-dashoffset","0"); 

    const progressCircle = document.createElementNS(w3uri,'circle');
    progressCircle.setAttribute("id",parameters.suffixForIds+"_progress-circle");
    progressCircle.setAttribute("fill","transparent");                    
    progressCircle.setAttribute("stroke-dashoffset","0"); 

    backgroundCircle.setAttribute("cx", parameters.containerHeight/2);
    backgroundCircle.setAttribute("cy", parameters.containerHeight/2);
    backgroundCircle.setAttribute("stroke-width", parameters.strokeWidth);
    backgroundCircle.setAttribute("fill","white");
    progressCircle.setAttribute("cx", parameters.containerHeight/2);
    progressCircle.setAttribute("cy", parameters.containerHeight/2);
    progressCircle.setAttribute("stroke-width", parameters.strokeWidth);

    const percentageValue = document.createElement("div");
    percentageValue.setAttribute("id",parameters.suffixForIds+"_percentage-value");

    percentageValue.innerHTML = "0 %";

    var textMarginTop = (-1)*(parameters.containerHeight - parameters.strokeWidth - circleRadius + parameters.fontSize/1.9 + parameters.textTopAdjustment);
    var textMarginLeft = (parameters.strokeWidth + circleRadius)/1.5 + parameters.textLeftAdjustment;

    percentageValue.style.marginTop = textMarginTop.toString()+"px";
    percentageValue.style.marginLeft = textMarginLeft.toString()+"px";
    percentageValue.style.fontSize = parameters.fontSize.toString()+"px";
    percentageValue.style.position = "relative";

    svgProgressBar.setAttribute("height",parameters.containerHeight);
    svgProgressBar.setAttribute("width", parameters.containerHeight);
    svgProgressBar.style.transform = "rotate(-90deg)"

    svgProgressBar.appendChild(backgroundCircle);
    svgProgressBar.appendChild(progressCircle);

    circleContainer.appendChild(svgProgressBar);
    circleContainer.appendChild(percentageValue);

    anchorDiv.appendChild(circleContainer);
}
var weekSelectionDiv = document.getElementById("week-day-selection");

var mondayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("monday")[0];            
var tuesdayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("tuesday")[0];       
var wednesdayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("wednesday")[0];       
var thursdayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("thursday")[0];       
var fridayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("friday")[0];       
var saturdayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("saturday")[0];    
var sundayButtonInAddDiv = weekSelectionDiv.getElementsByClassName("sunday")[0];    

mondayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,mondayButtonInAddDiv) {
    return function(){
        setDayOfWeek(weekSelectionDiv, "monday",mondayButtonInAddDiv);
    }
    }(weekSelectionDiv,mondayButtonInAddDiv));

tuesdayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,tuesdayButtonInAddDiv) {
    return function(){
        setDayOfWeek(weekSelectionDiv, "tuesday",tuesdayButtonInAddDiv);
    }
    }(weekSelectionDiv,tuesdayButtonInAddDiv));
       
wednesdayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,wednesdayButtonInAddDiv) {
    return function(){
        setDayOfWeek(weekSelectionDiv, "wednesday",wednesdayButtonInAddDiv);
    }
    }(weekSelectionDiv,wednesdayButtonInAddDiv));
           

thursdayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,thursdayButtonInAddDiv) {
    return function(){
        setDayOfWeek(weekSelectionDiv, "thursday",thursdayButtonInAddDiv);
    }
    }(weekSelectionDiv,thursdayButtonInAddDiv));
               
fridayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,fridayButtonInAddDiv) {
    return function(){
            setDayOfWeek(weekSelectionDiv, "friday",fridayButtonInAddDiv);
    }
    }(weekSelectionDiv,fridayButtonInAddDiv));
                   
                    
saturdayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,saturdayButtonInAddDiv) {
    return function(){
            setDayOfWeek(weekSelectionDiv, "saturday",saturdayButtonInAddDiv);
    }
    }(weekSelectionDiv,saturdayButtonInAddDiv));
                       
             
sundayButtonInAddDiv.addEventListener('click', function(weekSelectionDiv,sundayButtonInAddDiv) {
    return function(){
            setDayOfWeek(weekSelectionDiv, "sunday",sundayButtonInAddDiv);
    }
    }(weekSelectionDiv,sundayButtonInAddDiv));
                           
                     
var setDayOfWeek = function(containerDiv, dayOfWeek,dayOfWeekDiv){

    var weekArrayString = containerDiv.getAttribute("weekday");
    var weekArray=[];
    if (weekArrayString!=""){
        weekArray = weekArrayString.split(" ");
    }

    if (dayOfWeekDiv.classList.contains("selected")){
        dayOfWeekDiv.classList.remove("selected");
        dayOfWeekDiv.classList.add("unselected");

        const index = weekArray.indexOf(dayOfWeek);
        if (index > -1) {
            weekArray.splice(index, 1);
        }

    } else {
        dayOfWeekDiv.classList.add("selected");
        dayOfWeekDiv.classList.remove("unselected");
        weekArray.push(dayOfWeek);
        
    }
    weekArrayString=weekArray.join(" ");
    containerDiv.setAttribute("weekday",weekArrayString);

}


var weekDayNumbers = {
    1:'monday',
    2:'tuesday',
    3:'wednesday',
    4:'thursday',
    5:'friday',
    6:'saturday',
    0:'sunday'
}

var isDayOfWeekInHabitWeeks = function(currentDate, stringOfWeekDays){

    debugWrite("Checking if day of week is in habit week: getting current week day");
    debugWrite(currentDate.getDay());

    var currentDayOfWeek = currentDate.getDay();
    var currentDayOfWeekString = weekDayNumbers[currentDayOfWeek];

    debugWrite("Corresponding week day according to array:");
    debugWrite(currentDayOfWeekString);

    var arrayOfWeekDays = stringOfWeekDays.split(" ");

    debugWrite("Habit week days:");
    debugWrite(arrayOfWeekDays.toString());
    
    const index = arrayOfWeekDays.indexOf(currentDayOfWeekString);
    
    return (index > -1);
}

var dynamicWeekDaySelector = function(weekDay){

    var weekDaySelector = document.createElement("div");
    weekDaySelector.setAttribute("class","week-day-selection");
    weekDaySelector.setAttribute("weekday", weekDay);

    const descriptionTextLabel = document.createElement("label");

    const descriptionText = document.createTextNode("Applies to the following days of the week:");
    descriptionTextLabel.appendChild(descriptionText);

    var mondayDiv = dayOfWeek("monday","M",weekDay);
    var tuesdayDiv = dayOfWeek("tuesday","T",weekDay);
    var wednesdayDiv = dayOfWeek("wednesday","W",weekDay);
    var thursdayDiv = dayOfWeek("thursday","T",weekDay);
    var fridayDiv = dayOfWeek("friday","F",weekDay);
    var saturdayDiv = dayOfWeek("saturday","S",weekDay);
    var sundayDiv = dayOfWeek("sunday","S",weekDay);


    addWeekDayListener(weekDaySelector,mondayDiv,'monday');
    addWeekDayListener(weekDaySelector,tuesdayDiv,'tuesday');
    addWeekDayListener(weekDaySelector,wednesdayDiv,'wednesday');
    addWeekDayListener(weekDaySelector,thursdayDiv,'thursday');
    addWeekDayListener(weekDaySelector,fridayDiv,'friday');
    addWeekDayListener(weekDaySelector,saturdayDiv,'saturday');
    addWeekDayListener(weekDaySelector,sundayDiv,'sunday');

    weekDaySelector.appendChild(descriptionTextLabel);
    weekDaySelector.appendChild(mondayDiv);
    weekDaySelector.appendChild(tuesdayDiv);
    weekDaySelector.appendChild(wednesdayDiv);
    weekDaySelector.appendChild(thursdayDiv);
    weekDaySelector.appendChild(fridayDiv);
    weekDaySelector.appendChild(saturdayDiv);
    weekDaySelector.appendChild(sundayDiv);

    return weekDaySelector;

}

var addWeekDayListener = function(mainDiv,childDiv,dayName){
    childDiv.addEventListener('click', function(mainDiv,childDiv) {
        return function(){
            setDayOfWeek(mainDiv, dayName,childDiv);
        }
        }(mainDiv,childDiv));
   
        
}

var dayOfWeek = function(day, label, weekday){
    var dayOfWeekDiv = document.createElement("div");

    if (isDayInListOfDaysString(day, weekday) == true){
        var className = "weekday "+day+" selected";
    } else {
        var className = "weekday "+day+" unselected";
    }
    
    dayOfWeekDiv.setAttribute("class",className);
    dayOfWeekDiv.innerHTML = label;
 
    return dayOfWeekDiv;

}

var isDayInListOfDaysString = function(dayToCheck, weekDayString){
    var arrayOfWeekDays = weekDayString.split(" ");

    const index = arrayOfWeekDays.indexOf(dayToCheck);
    return (index > -1);
}

var resetWeekDaySelector = function(weekDaySelector) {

    weekDaySelector.setAttribute("weekday","");
    var weekDays = weekDaySelector.getElementsByClassName("weekday");

    for ( var weekDay of weekDays){
        weekDay.classList.remove("selected");
    }

}
var weekTable = function(progressByDay){
    var weekTableObject={};
    var numberOfMissesInWeek=0;
    var listOfDays = buildListOfDays();

    var todaysDateDayNum = todaysDateDayNumber();

    var tableCode = weekTableHeader(todaysDateDayNum);
    tableCode += "<tr>"
   
    for ( var i=0; i<=6; i++){
        var date = listOfDays[i];
        var result = progressByDay[date];
        var iconCode="";
        if (result != null){
            if (result>=0){
                iconCode=fullCirclePast;
            } else if (result<0){
                if (i<todaysDateDayNum){
                    iconCode=fullCircleRed;
                    numberOfMissesInWeek++;
                } else if (i==todaysDateDayNum){
                    iconCode=emptyCircleToday;
                }
            }
        } else {
            if (i<=todaysDateDayNum){
                iconCode=minusIconGreen;
            } 
            else {
                iconCode="";
            }
        }
        tableCode += "<td>"+iconCode+"</td>"
    }
    tableCode += "</tr></table>"

    weekTableObject.tableCode = tableCode;
    weekTableObject.numberOfMissesInWeek = numberOfMissesInWeek;
    return weekTableObject;
};

var buildListOfDays = function(){

    var listOfDays = {}

    var dateTime = new Date();
    var weekDay = dateTime.getDay();
    var formattedDate = formatDate(dateTime); 
    listOfDays[weekDay] = formattedDate;

    if (weekDay == 0){
        return listOfDays;
    }

    do{
        dateTime.setDate(dateTime.getDate() - 1);
        weekDay = dateTime.getDay();
        listOfDays[weekDay] = formatDate(dateTime); 
    } while ( weekDay != 0)

    return listOfDays;

};

var weekTableHeader = function(currentDayNumber){
    var headerString="<table><tr>";

    switch(currentDayNumber){

        case 0:
            headerString+="<th class='today'>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>"
            break;
        case 1:
            headerString+="<th class='past'>S</th><th class='today'>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>"
            break;
        case 2:
            headerString+="<th class='past'>S</th><th class='past'>M</th><th class='today'>T</th><th>W</th><th>T</th><th>F</th><th>S</th>"
            break;
        case 3:
            headerString+="<th class='past'>S</th><th class='past'>M</th><th class='past'>T</th><th class='today'>W</th><th>T</th><th>F</th><th>S</th>"
            break;
        case 4:
            headerString+="<th class='past'>S</th><th class='past'>M</th><th class='past'>T</th><th class='past'>W</th><th class='today'>T</th><th>F</th><th>S</th>"
            break;   
        case 5:
            headerString+="<th class='past'>S</th><th class='past'>M</th><th class='past'>T</th><th class='past'>W</th><th class='past'>T</th><th class='today'>F</th><th>S</th>"
            break;
        case 6:
            headerString+="<th class='past'>S</th><th class='past'>M</th><th class='past'>T</th><th class='past'>W</th><th class='past'>T</th><th class='past'>F</th><th class='today'>S</th>"
            break; 
        }

    headerString += "</tr>";

    return headerString;
}

var buildWeekTableBox = function(weekTableObject,habitObject){
    /* week table */
    var tableCode = weekTableObject.tableCode
    var numberOfMissesInWeek = weekTableObject.numberOfMissesInWeek
    const weekSummaryTable = document.createElement("div");
    var graphIcon = document.createElement("div");
    graphIcon.setAttribute("class","task-icon-container");
    graphIcon.innerHTML = calendarIcon;
    const grapTitle = document.createTextNode(habitObject.habitDescription);
    const grapTitleDiv = document.createElement("div");
    grapTitleDiv.setAttribute("class","graph-title");
    grapTitleDiv.appendChild(graphIcon);
    grapTitleDiv.appendChild(grapTitle);
    const weekSummaryTableTitle = document.createElement("div");
    weekSummaryTableTitle.innerHTML = "This week summary:";
    weekSummaryTableTitle.setAttribute("class","subtitle");
    const markAsCriticalDiv = document.createElement("div");

    markAsCriticalDiv.setAttribute("class","critical-link");
    if (habitObject.isCritical && habitObject.isCritical=="true"){
        markAsCriticalDiv.innerHTML = "Unmark as critical";
        markAsCriticalDiv.setAttribute("onclick","unsetHabitAsCritical("+ habitObject.habitId +");");
    } else {
        markAsCriticalDiv.innerHTML = "Mark as critical";
        markAsCriticalDiv.setAttribute("onclick","setHabitAsCritical("+ habitObject.habitId +");");
    }
    weekSummaryTable.setAttribute("class","table-summary");
    weekSummaryTable.innerHTML = tableCode;

    var newCanvaWrapper = document.createElement("div");

    newCanvaWrapper.appendChild(grapTitleDiv); 
    newCanvaWrapper.appendChild(weekSummaryTable);
    newCanvaWrapper.appendChild(markAsCriticalDiv);
    var brDiv = document.createElement("br");
    newCanvaWrapper.appendChild(brDiv);
    newCanvaWrapper.setAttribute("class","box canva-wrapper week-box");
    if (numberOfMissesInWeek==0){
        newCanvaWrapper.style.background="#daffd9";
        newCanvaWrapper.style.border="1px solid rgb(167 211 162)"
    } else if (numberOfMissesInWeek==1){
        newCanvaWrapper.style.background="rgb(255 252 238)";
        newCanvaWrapper.style.border="1px solid rgb(246 223 35)"
    } else if (numberOfMissesInWeek>1){
        newCanvaWrapper.style.background="white";
    }
    document.getElementById("no-week-summary").style.display = "none";
    document.getElementById("week-summary-container").appendChild(newCanvaWrapper);

}


function getRandomNumber(min,max){

    var randomSeed = Math.random();
    var randomNumber;

    if ( (Math.floor( 1000 * randomSeed )  % 2) == 0)
    {
        randomNumber= Math.floor( (max - min) * randomSeed + min );
    }
    else
    {
        randomNumber= Math.ceil( (max - min) * randomSeed + min );
    }
    return randomNumber;
    
    }
var formatDate = function(dateToFormat){
    return dateToFormat.getFullYear().toString().padStart(2,'0')+'-'+(dateToFormat.getMonth()+1).toString().padStart(2,'0')+'-'+dateToFormat.getDate().toString().padStart(2,'0'); 
};

var getDateFromFormattedDate = function(formattedDate){
    var dateParts = formattedDate.split('-');
    return new Date(dateParts[0],dateParts[1],dateParts[2]);
}
var daysSinceToday = function(formattedDate){
    var inputDate = getDateFromFormattedDate(formattedDate);
    var today = new Date();
    return Math.round((today-inputDate)/24/3600);
}
var todaysDateDayNumber = function(){
    
    var todaysDateTime = new Date();
    return todaysDateTime.getDay();

};

var formattedTodaysDate = function(){
    var todaysDateTime = new Date();
    return formatDate(todaysDateTime);
}
var translations = {};
translations['en_US']  = {
'amazing':['Amazing','Superb','Outstanding','Magnificient','Exceptional','Marvellous','Wonderful','Sublime','Supreme','Splendid','Fantastic','Awesome','Mind-blowing','Brilliant','Smashing','Spectacular','Spectaculous','Awesome','Fabulous'],
'encouraging':['A little effort each day adds up to big results!','You are stronger than you know!','You are capable of amazing things!','Believe in yourself and you will be unstoppable!','You are doing exactly what you should be doing!','You are being so strong and patient!','I admire how strong you are!','I cannot wait to see what you do next!','You are doing a great job!','You are getting stronger every day!','I am so proud of you!','You are on the right track!','You made it look easy!','You have super powers!']
}


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


var resetDebugging = function(){

    document.getElementById("debugging-text").innerHTML = "";

}

var debugWrite = function(text){
    document.getElementById("debugging-text").innerHTML += text + "<br>";
}

var getMemoryDetails = function(){

    for (var i = 0; i < localStorage.length; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf("habit") >= 0){
            document.getElementById("memory-habit").innerHTML += window.localStorage.getItem(currentKey);
        } else if (currentKey.indexOf("progress") >= 0)  {
            document.getElementById("memory-progress").innerHTML += window.localStorage.getItem(currentKey);
        }
    }

}
var getHabitProgressJournal = function(){

    if (loggedIn){
        dataArrays=getHabitProgressJournalWhenLoggedIn();
    } else {
        dataArrays=getHabitProgressJournalWhenNotLoggedIn();
    }

};

var getHabitProgressJournalWhenLoggedIn = function(){
    var progressArray,habitsArray,journalArray = {};
    /*
    var APIcallParameters = {
        method: "GET",
        url: "http://localhost:5000/get-habit-progress"
    };

    var apiCaller = new APICaller(APIcallParameters,todoCallback1,todoCallback2);

    apiCaller.executeCall(APIcallParameters.url, {});
*/
    return {progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray};
};

var getHabitProgressJournalWhenNotLoggedIn = function(){
    var progressArray=[];
    var habitsArray=[];
    var journalArray = [];
    var todaysProgressArray=[];
    var pastProgressArray=[];
    var localStorageLength = localStorage.length;

    /* todo separate progress today from progress in the past */
    for (var i = 0; i < localStorageLength && i < maxForNonLoggedIn; i++){
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

};

var pushProgressToQueue = function(divToAnalyze) {

    var progressArray = progressDOMToJson(divToAnalyze);

    encourageIfPassedTarget(progressArray.numberOfCompletions, progressArray.target, progressArray.isCritical);

    var elementToAdd = {
        'id': 'progress-'+progressArray.id,
        'value': JSON.stringify(progressArray)
    }

    executePushToQueue(elementToAdd);

}

var pushProgressArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': 'progress-'+objectToPush.id,
        'value': JSON.stringify(objectToPush)
    }

    executePushToQueue(elementToAdd);

}

var pushHabitArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': 'habit-'+objectToPush.habitId,
        'value': JSON.stringify(objectToPush)
    }

    executePushToQueue(elementToAdd);

}


var executePushToQueue = function(newObject){
    console.log("pushing to queue:");
    console.log(newObject);
    var sizeBeforePush = updateQueue.length;

    var lastElement = updateQueue.pop();

    if (lastElement != null &&  lastElement.id != newObject.id) {
        console.log("putting back previous");
        updateQueue.push(lastElement);
    } else {
        console.log("did not put back previous:");
        console.log(lastElement);
    }

    updateQueue.push(newObject);
    
    console.log(updateQueue);
    console.log("size before push:"+sizeBeforePush.toString()+" size after push:"+ updateQueue.length.toString())
}

var pushItemInQueue = function(newItem){
    updateQueue.push(newItem);
}
var readQueueProgress = function() {

    while (updateQueue.length > 0) {
        var elementToProcess = updateQueue.shift();
        console.log("reading from queue");
        console.log(elementToProcess);
        putInStorage(elementToProcess.id, elementToProcess.value); 
        /* todo send the element to the backend using an API call */ 
        var currentDate = new Date();
        document.getElementById('last-saved-information').innerHTML = "Last saved: "+currentDate.toLocaleTimeString();
        document.getElementById('last-saved-information-habits').innerHTML = "Last saved: "+currentDate.toLocaleTimeString();   
    }
}


var putInStorage = function(id,value){
  try {
    window.localStorage.setItem(id, value);
  } catch (error) {
    console.error(error);
    console.error("Problem writing progress:"+elementToProcess.id.toString());
    console.error(currentOutput);
  }
}
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


    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') == "true"){
        document.getElementById("debug-section").style.display = "block";
    }

    hideStartProgressButtonOnHabits();

    document.getElementById("date-filter").value=currentDate;
    createRadialProgressBar(radialProgressParameters);

    getHabitProgressJournal(); /* todo: this function should only extract and not also create divs */
 
    if (dataArrays.progressArray.length >= 1){
        changeTabToProgress();
        showProgressTab();
    }
    else {
        hideProgressTab();
        changeTabToHabits();
    }
    if (dataArrays.journalArray.length < 1){
        hideJournalBox();
    }

    for (const progressElement of dataArrays.todaysProgressArray){
        addProgressElement(progressElement);
    }
 
    for (const habitsElement of dataArrays.habitsArray){
        addHabitElement(habitsElement);
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
    if (dataArrays.habitsArray.length >= 1){
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
	
}



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