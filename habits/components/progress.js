
var actionsWhenCountdownEnd = function(){
    giveCheers();
};

var updateProgressDOMProperties = function(division, elementToAdd){

    division.setAttribute("id", elementToAdd.progressId );
    division.setAttribute("remoteProgressId", elementToAdd.remoteProgressId );
    division.setAttribute("habitDescription", elementToAdd.habitDescription);
    division.setAttribute("target", elementToAdd.target);
    division.setAttribute("progressDate", elementToAdd.progressDate );

    division.setAttribute("isNew",elementToAdd.isNew);
    division.setAttribute("habitId",elementToAdd.habitId);
    division.setAttribute("isNegative", elementToAdd.isNegative);
    division.setAttribute("isCritical", elementToAdd.isCritical);
    division.setAttribute("status",elementToAdd.status);
    division.setAttribute("isSuspendableDuringSickness", elementToAdd.isSuspendableDuringSickness);
    division.setAttribute("isSuspendableDuringOtherCases", elementToAdd.isSuspendableDuringOtherCases);
    division.setAttribute("isTimerNecessary", elementToAdd.isTimerNecessary);
    if (elementToAdd.isTimerNecessary == true || elementToAdd.isTimerNecessary == "true"){
        division.setAttribute("class", "box habit-update with-countdown");
    } else {
        division.setAttribute("class", "box habit-update");
    }
    division.setAttribute("timerInitialNumberOfMinutes", elementToAdd.timerInitialNumberOfMinutes);
    division.setAttribute("whatCreated",elementToAdd.whatCreated);
    division.setAttribute("whenCreated",elementToAdd.whenCreated);
    var elementOrder = elementToAdd.order?elementToAdd.order:80;
    division.setAttribute("order", elementOrder);
    division.style.order = elementOrder;

    return division;
}



var updateProgressDOMElement = function(newProgressDivision, elementToAdd){

    elementToAdd.remoteProgressId= elementToAdd._id?elementToAdd._id:0;
    /*elementToAdd.habitId= elementToAdd.habitId?elementToAdd.habitId:0;*/

    /* Main Attributes */
    newProgressDivision = updateProgressDOMProperties(newProgressDivision,elementToAdd);

    var percentageCompletion = 0;
    if ( elementToAdd.isNegative != null && elementToAdd.isNegative == "true"){
            if ( elementToAdd.numberOfCompletions <= elementToAdd.target ){
                percentageCompletion = 100;
            }
    } else {
        percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / parseInt(elementToAdd.target)) ;
    }

    setDivAppearanceBasedOnCompletion(newProgressDivision,percentageCompletion);
 
    var progressInput = newProgressDivision.getElementsByClassName('number-of-completion')[0]
    var percentageCompletionInput = newProgressDivision.getElementsByClassName('percentage-completion')[0]

    percentageCompletionInput.setAttribute("progressDate",elementToAdd.progressDate);
    percentageCompletionInput.innerHTML = percentageCompletion.toString();

    var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0];

    /* todo code duplication here */
    if (elementToAdd.target > 1){
        progressInput.value = elementToAdd.numberOfCompletions;
    } else {
        if (elementToAdd.numberOfCompletions == 1){
            progressInput.checked = true;
            progressInput.setAttribute("value","1");
        } else {
            progressInput.checked = false;
            progressInput.setAttribute("value","0");
        }
    }
       
}

var addProgressDOMElementAsync = async function(elementToAdd){

    addProgressDOMElement(elementToAdd);
    try{
        var result = await waitForElement(elementToAdd.progressId);
        return result;
    } catch(e){
        console.error("Error looking for element of id"+elementToAdd.habitId);
        console.error(e);
        return -1;
    }
    

}
var addProgressDOMElement = function(elementToAdd){

    var newProgressDivision = document.createElement("div");

    elementToAdd.remoteProgressId= elementToAdd._id?elementToAdd._id:0;
    /*elementToAdd.habitId= elementToAdd.habitId?elementToAdd.habitId:0;*/

    /* Main Attributes */
    // newProgressDivision.setAttribute("id", elementToAdd.progressId );
    // newProgressDivision.setAttribute("remoteProgressId", elementToAdd.remoteProgressId );
    // newProgressDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    // newProgressDivision.setAttribute("target", elementToAdd.target);
    // newProgressDivision.setAttribute("progressDate", elementToAdd.progressDate );
    // newProgressDivision.setAttribute("class", "box habit-update");
    // newProgressDivision.setAttribute("isNew",elementToAdd.isNew);
    // newProgressDivision.setAttribute("habitId",elementToAdd.habitId);
    // newProgressDivision.setAttribute("isNegative", elementToAdd.isNegative);
    // newProgressDivision.setAttribute("isCritical", elementToAdd.isCritical);
    // newProgressDivision.setAttribute("isSuspendableDuringSickness", elementToAdd.isSuspendableDuringSickness);
    // newProgressDivision.setAttribute("isSuspendableDuringOtherCases", elementToAdd.isSuspendableDuringOtherCases);
    // newProgressDivision.setAttribute("isTimerNecessary", elementToAdd.isTimerNecessary);
    // newProgressDivision.setAttribute("timerInitialNumberOfMinutes", elementToAdd.timerInitialNumberOfMinutes);
    // var elementOrder = elementToAdd.order?elementToAdd.order:80;
    // newProgressDivision.setAttribute("order", elementOrder);
    // newProgressDivision.style.order = elementOrder;

    updateProgressDOMProperties(newProgressDivision,elementToAdd);

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
        percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / parseInt(elementToAdd.target)) ;
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

    /* Countdown */
    if (elementToAdd.isTimerNecessary == true){
        var countDownTitle = document.createElement("div");
        countDownTitle.innerHTML = "Countdown:";
        countDownTitle.setAttribute("class","progress-container");
        
        detailsArea.appendChild(countDownTitle);

        var countDownContainer = document.createElement("div");
        var countDownContainerId = "countdown-container-"+elementToAdd.progressId

        countDownContainer.setAttribute("id",countDownContainerId);
        detailsArea.appendChild(countDownContainer);
    }
    var completionTextContainer = document.createElement("div");
    completionTextContainer.setAttribute("class","progress-container");

    completionTextContainer.appendChild(currentCompletionText);
    /*detailsArea.appendChild(completionTextContainer);*/
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

     titleDiv = newProgressDivision.getElementsByClassName('habit-description')[0];

     titleDiv.addEventListener('click', function(expandButtonWrapper,detailsArea) {
        return function(){
            toggleExpandCollapse(expandButtonWrapper,detailsArea);
        }
     }(expandButtonWrapper,detailsArea));

     expandButtonWrapper.addEventListener('click', function(expandButtonWrapper,detailsArea) {
        return function(){
            toggleExpandCollapse(expandButtonWrapper,detailsArea);
        }
     }(expandButtonWrapper,detailsArea));

     if (elementToAdd.isTimerNecessary == true){
        var newCounterDiv = new DigitalCounter(elementToAdd.timerInitialNumberOfMinutes,countDownContainerId,"new-counter-"+elementToAdd.progressId,false,actionsWhenCountdownEnd);
        newProgressDivision.setAttribute("className", "box habit-update with-countdown");
        newProgressDivision.classList.add("with-countdown");
    }
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
};


function renderPastProgressBoxes(){
    var pastDataArrays = {}
    getPreviousElements().then(
        value=>{
            pastDataArrays = value;
            dataArrays.pastProgressArray = pastDataArrays.pastProgressArray;
            dataArrays.journalArray = pastDataArrays.journalArray;

            if (pastDataArrays.pastProgressArray){
                for (const habitsElement of pastDataArrays.pastProgressArray){
                    addProgressDOMElement(habitsElement);
                }
                applyFilters(); 
                showSummariesTab(); 
                var numberOfStreaks = getNumberOfDailyStreaks();
               /* document.getElementById('number-of-streaks').innerHTML = numberOfStreaks;*/
                document.getElementById('number-of-streaks-bubble').style.display = "flex";
                document.getElementById('number-of-streaks-2').innerHTML = numberOfStreaks;
                setupToggleTodayYesterday();
            }
        },
        reason=>{
            console.log(reason);
        }
    )

    applyFilters();
    saveLoop();
}


var refreshProgress = function(currentDiv){
    var newCompletion = currentDiv.getElementsByClassName("number-of-completion")[0];
    var newCompletionPercentage = 0;

    var isNegative = currentDiv.getAttribute("isNegative"); 
    if (isNegative != null && isNegative == true){
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
        currentDiv.style.borderColor="rgb(167 211 162)";
        var newOrder = 180;/*parseInt(currentDiv.getAttribute('order'))+100;*/
        currentDiv.style.order=newOrder.toString();
        // currentDiv.setAttribute('order',newOrder.toString());
        currentDiv.style.background="#daffd9";
        /*currentDiv.style.background="rgb(238 255 237)"; */ 
    } else if (newCompletionPercentage>=50){
        currentDiv.style.borderColor="rgb(246 223 35)";
        currentDiv.style.background="rgb(255 251 234)";
        currentDiv.style.order=currentDiv.getAttribute('order');
        /*currentDiv.style.order="80";*/
    } else if (newCompletionPercentage<50){
        currentDiv.style.borderColor="lightgrey";
        currentDiv.style.background="white";
        currentDiv.style.order=currentDiv.getAttribute('order');
        /*currentDiv.style.order="80";*/
    }
    if (currentDiv.getAttribute('id') && currentDiv.getAttribute('id') == "daily-summary-container"){
        currentDiv.style.order = "178";
    }
    if (currentDiv.getAttribute('id') && currentDiv.getAttribute('id') == "google-container-progress"){
        currentDiv.style.order = "1";
    }
    if (currentDiv.getAttribute('status') == 'inactive'){
        currentDiv.style.borderColor="lightgrey";
        currentDiv.style.color="lightgrey";
        currentDiv.style.background="#f4f4f4";
        currentDiv.style.order="180";
        /*currentDiv.style.order="80";*/
    }


}

var setDivAppearanceForCritical = function(currentDiv,newCompletionPercentage){
    var plusMinusDiv = currentDiv.getElementsByClassName("plus-minus")[0];
    var taskIconDiv;

    if (newCompletionPercentage <100 ){
        /*currentDiv.style.order = "60";*/
        /*currentDiv.style.borderColor="#ffa6a6"; 
        currentDiv.style.background="#fff1f1";*/
        /*
        currentDiv.style.borderColor = "rgb(249 194 194)";
        currentDiv.style.background = "rgb(255 244 244)";*/


        habitDescriptionDiv = currentDiv.getElementsByClassName("habit-description")[0];
        taskIconDiv = habitDescriptionDiv.getElementsByClassName("task-icon-container")[0];

        if (habitDescriptionDiv) {
            habitDescriptionDiv.style.textDecoration = "underline";
            habitDescriptionDiv.style.textUnderlineOffset = "3px";
            habitDescriptionDiv.style.textDecorationColor = "rgb(255 136 193)";
            habitDescriptionDiv.style.textDecorationThickness = "2.5px";
        }
        if (taskIconDiv && plusMinusDiv){
            taskIconDiv.innerHTML=warningIcon;
            /*taskIconDiv.setAttribute("stroke","red");
            taskIconDiv.setAttribute("fill","red");      */     
            /*currentDiv.getElementsByClassName("fa")[0].classList.add("fa-warning");*/

            /*currentDiv.getElementsByClassName("habit-description")[0].classList.add("red");*/
            
            /*plusMinusDiv.style.color="red";*/
     
        }
        /*plusMinusDiv.firstChild.setAttribute("stroke","red");
        plusMinusDiv.firstChild.setAttribute("fill","red");*/

    } else if (newCompletionPercentage >=100){
        currentDiv.style.borderColor="rgb(167 211 162)"; 
        taskIconDiv = currentDiv.getElementsByClassName("task-icon-container")[0];
        if (taskIconDiv && plusMinusDiv){
            /*taskIconDiv.classList.remove("fa-warning");
            currentDiv.getElementsByClassName("fa")[0].classList.add("fa-tasks");*/
            taskIconDiv.innerHTML=taskIcon;
           /* taskIconDiv.setAttribute("stroke","black");
            taskIconDiv.setAttribute("fill","black");  */
           /* currentDiv.getElementsByClassName("habit-description")[0].classList.remove("red");*/
            /*plusMinusDiv.style.color="#b657af";*/
            
        }    
        plusMinusDiv.firstChild.setAttribute("stroke","#b657af");
        plusMinusDiv.firstChild.setAttribute("fill","#b657af");
    }
}

var addEmptyProgressBoxesOnNewDay = function(inputDate, inputDateTime){

    var newCurrentDateTime = new Date();

    var newCurrentDate = formatDate(newCurrentDateTime);
    var oldCurrentDate = formatDate(currentDateTime);
    /* Desktop: change date for first time to today - computer online since yesterday */
    if (newCurrentDate > oldCurrentDate){
        location.reload();
        return;
    } 

    var currentDateTimeMidnight = newCurrentDateTime.setHours(0,0,0,0);
    var inputDateTimeMidnight = inputDateTime.setHours(0,0,0,0);
    
    if ( inputDateTimeMidnight > currentDateTimeMidnight){
        return;
    }

    // var progressElements = document.getElementsByClassName('habit-update');
    // var habitsElements = document.getElementsByClassName('habit-setting');

    var progressElements = dataArrays.todaysProgressArray;
    var habitsElements = dataArrays.habitsArray;

    if (progressElements.length == 0 && habitsElements.length >0){
        showProgressTab();
    }
    var habitsElementsLength = habitsElements.length;
    for (var i=0; i<habitsElementsLength ;i++){

        var isHabitProgressExisting = false;

        for (var progressElement of progressElements){
            if ( (habitsElements[i].habitId == progressElement.habitId) && (progressElement.progressDate == inputDate)){
                isHabitProgressExisting = true;
                break;
            }        
        }

       /* var matchingArray = []
        
        if (matchingArray.progressArray){
            matchingArray = dataArrays.progressArray.filter( function(currentObject){
                if ( (habitsElements[i].habitid == currentObject.habitId) && (currentObject.progressDate == inputDate)) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        if (matchingArray.length > 0){
            isHabitProgressExisting = true;
        }*/

        if ( !isHabitProgressExisting){
            var isDayOK;
            if (habitsElements[i].weekDay){
                debugWrite("Comparing current date time with habit week day");
                debugWrite("Current date time:");
                debugWrite(inputDateTime);
                debugWrite("Habit week day:");
                debugWrite(habitsElements[i].weekDay);
                debugWrite("Is critical?:");
                debugWrite(habitsElements[i].iscritical);
                
                isDayOK = isDayOfWeekInHabitWeeks(inputDateTime, habitsElements[i].weekDay);
            } else {
                isDayOK = true;
            }
            if (isDayOK != null && isDayOK) {
                /*let newId = Date.now()*100+i;*/
                let newId = habitsElements[i].habitId + "_"+ inputDate;
                let newProgressObject = {
                    id:newId ,
                    progressId: newId,
                    habitId: habitsElements[i].habitId,
                    habitDescription: habitsElements[i].habitDescription,
                    target: parseInt(habitsElements[i].target),
                    progressDate: inputDate,
                    isNew: true,
                    status: 'active',
                    isCritical: (habitsElements[i].iscritical==='true'),
                    isSuspendableDuringSickness: (habitsElements[i].isSuspendableDuringSickness==='true'),
                    isSuspendableDuringOtherCases: (habitsElements[i].isSuspendableDuringOtherCases==='true'),
                    isTimerNecessary: (habitsElements[i].isTimerNecessary==='true'),
                    timerInitialNumberOfMinutes: parseInt(habitsElements[i].timerInitialNumberOfMinutes),
                    order: habitsElements[i].order?parseInt(habitsElements[i].order):80,
                    numberOfCompletions:0,
                    whatUpdated: "addEmptyProgressBoxesOnNewDay",
                    whatCreated: "addEmptyProgressBoxesOnNewDay",
                    whenUpdated: (new Date()).toString(),
                    whenCreated: (new Date()).toString()
                }
                addProgressDOMElement(newProgressObject);
                console.log("added progress");
                console.log(newProgressObject);
                /*pushProgressArrayToQueue(newProgressObject);*/
                /*if (dataArrays && dataArrays.todaysProgressArray){
                    dataArrays.todaysProgressArray.push(newProgressObject);
                }*/
            }
        }
    }
    /* go through all elements, if nothing with today's date, go through all habits and add new element with this habit id*/
}

var actOnSickNess = function(){
    actOnDay('sick');
}

var actOnSpecialDay = function(){
    actOnDay('special');
}
var actOnDay = function(typeOfDay){

    var selectedDate = document.getElementById('date-filter').value;
    var arrayToAnalyze = []

    /*if (selectedDate==currentDate){
        arrayToAnalyze = dataArrays.todaysProgressArray
    }
    else {
        arrayToAnalyze = dataArrays.pastProgressArray
    }*/
    var listOfProgressDOMs = document.getElementsByClassName('box habit-update');

    for (var i=0; i< listOfProgressDOMs.length; i++){
        var isSuspendableDuringSickness = listOfProgressDOMs[i].getAttribute('isSuspendableDuringSickness');
        var isSuspendableDuringOtherCases = listOfProgressDOMs[i].getAttribute('isSuspendableDuringOtherCases');
        var progressDate = listOfProgressDOMs[i].getAttribute('progressDate');
        if ( progressDate != selectedDate){
            continue;
        }
        if ((isSuspendableDuringSickness=="true" && typeOfDay == 'sick') || (isSuspendableDuringOtherCases=="true" && typeOfDay == 'special')) {
            /*var divToUpdate =  document.getElementById(arrayToAnalyze[i].progressId);*/
            divToUpdate = document.getElementById(listOfProgressDOMs[i].getAttribute('id'));
            var progressArray = progressDOMToJson(divToUpdate,'actonday');
            updateProgressStatus(divToUpdate,progressArray,'inactive');
            putBorderBackgroundOrderBasedOnCompletion(divToUpdate,0);
        }
    }


    /*for (var i=0;i<arrayToAnalyze.length;i++){
            if ((arrayToAnalyze[i].isSuspendableDuringSickness==true && typeOfDay == 'sick') || (arrayToAnalyze[i].isSuspendableDuringOtherCases==true && typeOfDay == 'special')) {
                var divToUpdate =  document.getElementById(arrayToAnalyze[i].progressId);
                updateProgressStatus(divToUpdate,arrayToAnalyze[i],'inactive');
                putBorderBackgroundOrderBasedOnCompletion(divToUpdate,0);
            }
    }*/
};

var updateProgressStatus = function(divToUpdate,progressElement,newStatus){

    progressElement['status']=newStatus;
    progressElement['whatUpdated']="updateProgressStatus";
    progressElement['whenUpdated']= (new Date()).toString();
    var elementToAdd = {
        'id': 'progress-'+progressElement.progressId,
        'value': (progressElement)
    }

    executePushToQueue(updateQueue,elementToAdd);
    executePushToQueue(updateAPIQueue,elementToAdd);

    divToUpdate.setAttribute('status',newStatus)

};