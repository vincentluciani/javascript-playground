var refreshDOM = function(callback){
    
    /*let dataArrays = {};*/
    dataArrays.habitsArray=[];
    dataArrays.progressArray=[];
    dataArrays.journalArray=[];

    getHabitProgressJournal().then(
        value => {
            dataArrays = value;

            if (null == dataArrays.habitsArray || dataArrays.habitsArray.length == 0){
                changeTabToHabits();
                return;
            }
            resetStorage();
            var progressBoxes = document.getElementsByClassName("habit-update");
            var numberOfBoxes = progressBoxes.length;

            for ( var i=0; i < numberOfBoxes; i++){
                progressBoxes[0].parentNode.removeChild(progressBoxes[0]);
            }
            
            for (const habitsElement of dataArrays.habitsArray){
                putInStorage('habit-'+ habitsElement.habitId.toString(), habitsElement);
                var DOMElementToUpdate = document.getElementById(habitsElement.habitId);
                if (null != DOMElementToUpdate){
                    updateHabitDOMElement(DOMElementToUpdate,habitsElement);
                } else {
                    addHabitDOMElement(habitsElement);
                }
            }
            for (const progressElement of dataArrays.todaysProgressArray){
                putInStorage('progress-'+ progressElement.progressId, progressElement);
                /*var DOMProgressElementToUpdate = document.getElementById(progressElement.progressId);
                if (null != DOMProgressElementToUpdate){
                    updateProgressDOMElement(DOMProgressElementToUpdate,progressElement);
                } else {*/
                    addProgressDOMElement(progressElement);
                /*}*/
            }
            if (null!=dataArrays.journalArray){
                if (Array.isArray(dataArrays.journalArray)){
                    for (const progressElement of dataArrays.journalArray){
                        putInStorage('journal-'+progressElement.journalDate, progressElement);
                    }
                } else {
                    putInStorage('journal-'+dataArrays.journalArray.journalDate, dataArrays.journalArray);
                }
            }
            
            applyFilters(); 
            if (dataArrays.habitsArray && dataArrays.habitsArray.length >= 1){
                changeTabToProgress();
                showProgressTab();
            }

            if (callback){
                callback();
            }
        },
        reason => {
            console.error(reason);
        }
    )

    
    
}

var getNumberOfFullDays = function(){
    var currentProcessingDate = ''
    var arrayOfProgressesToAnalyze = [];
    var numberOfStreaks = 0;
    var arrayOfProgresses = dataArrays.pastProgressArray;
    arrayOfProgresses = arrayOfProgresses.sort(sortByDate);

    for (var currentProgress of arrayOfProgresses){
        /* Date is changing, means currentProcessingArray has all progresses of the day
           so we can check if the day is full */
        if (currentProcessingDate != '' && currentProcessingDate != currentProgress.progressDate){    
            if (isDayFull(arrayOfProgressesToAnalyze)){
                numberOfStreaks++;
            } 
            arrayOfProgressesToAnalyze = [];
            currentProcessingDate = currentProgress.progressDate;
        } else if (currentProcessingDate == ''){
            currentProcessingDate = currentProgress.progressDate;
        }
        /* Put the next progress in the array to analyze */
        arrayOfProgressesToAnalyze.push(currentProgress);
    }
    return numberOfStreaks;
}


var sortByDate = function(x,y){
    var firstDate = new Date(x.progressDateISO);
    var secondDate = new Date(y.progressDateISO);

    if (firstDate > secondDate){
        return -1;
    } else if (firstDate == secondDate){
        return 0;
    } else {
        return 1;
    }
}
var isDayFull = function(dataArray){
    for (var progressData of dataArray){
        if (progressData.status != 'active'){
            continue;
        }
        if (progressData.numberOfCompletions < progressData.target){
            return False;
        }
    }
    return True;
}

var updateHabitDOMElement = function(division, elementToAdd){

    division = updateHabitDOMProperties (division,elementToAdd);

    var habitDescriptionDiv = division.getElementsByClassName('habit-description-definition')[0]; 
    habitDescriptionDiv.value = elementToAdd.habitDescription; 
    var targetDefinitionDiv = division.getElementsByClassName('habit-target-definition')[0];   
    targetDefinitionDiv.value = elementToAdd.target;
    var weekDaySelectionDiv = division.getElementsByClassName('week-day-selection')[0];

    refreshWeekDaySelector(weekDaySelectionDiv,elementToAdd.weekDay);

    /*PROBLEM: SAME CLASS AS DAILY TARGET - does it cause other problems?????? */
    var priorityDiv= division.getElementsByClassName('habit-target-definition')[1];   
    priorityDiv.value = elementToAdd.order?elementToAdd.order-80:0;
    var isTimerDiv= document.getElementById('is-timer-necessary-'+ elementToAdd.habitId);  
    isTimerDiv.checked = elementToAdd.isTimerNecessary;
    var initialTimeDiv = document.getElementById('initial-time'+ elementToAdd.habitId);   
    initialTimeDiv.value =  elementToAdd.timerInitialNumberOfMinutes?elementToAdd.timerInitialNumberOfMinutes.toString():"0";
    var isCriticalDiv = document.getElementById('is-critical-'+ elementToAdd.habitId);   
    isCriticalDiv.checked = elementToAdd.isCritical;
    var isSuspendableSicknessDiv = document.getElementById('is-suspendable-during-sickness-'+ elementToAdd.habitId);     
    isSuspendableSicknessDiv.checked = elementToAdd.isSuspendableDuringSickness;
    var isSuspendableOtherCasesDiv = document.getElementById('is-suspendable-in-other-cases-'+ elementToAdd.habitId);  
    isSuspendableOtherCasesDiv.checked = elementToAdd.isSuspendableDuringOtherCases;   

}

var updateHabitDOMProperties = function(habitDivision, elementToAdd){
    var minOrder=80;
    elementToAdd.remoteHabitId= elementToAdd._id?elementToAdd._id:0;
    elementToAdd.habitId= elementToAdd.habitId?elementToAdd.habitId:0;

    habitDivision.setAttribute("habitdescription", elementToAdd.habitDescription);
    habitDivision.setAttribute("target", elementToAdd.target);
    habitDivision.setAttribute("class", "box habit-setting");
    habitDivision.setAttribute("id",elementToAdd.habitId.toString());
    habitDivision.setAttribute("habitId",elementToAdd.habitId);
    habitDivision.setAttribute("remotehabitid",elementToAdd.remoteHabitId);   
    habitDivision.setAttribute("weekDay",elementToAdd.weekDay);
    habitDivision.setAttribute("isnegative",false);
    habitDivision.setAttribute("iscritical",elementToAdd.isCritical);
    habitDivision.setAttribute("issuspendableduringsickness",elementToAdd.isSuspendableDuringSickness);
    habitDivision.setAttribute("issuspendableduringothercases",elementToAdd.isSuspendableDuringOtherCases);
    habitDivision.setAttribute("istimernecessary",elementToAdd.isTimerNecessary);
    habitDivision.setAttribute("timerinitialnumberofminutes",elementToAdd.timerInitialNumberOfMinutes);
    habitDivision.setAttribute("whatcreated",elementToAdd.whatCreated);
    habitDivision.setAttribute("whocreated",elementToAdd.whoCreated);

    var habitOrder = elementToAdd.order?elementToAdd.order:minOrder;
    habitDivision.style.order = habitOrder
    habitDivision.setAttribute("order",habitOrder);

    return habitDivision
}

var addHabitDOMElementAsync = async function(elementToAdd){

    addHabitDOMElement(elementToAdd);

    try{
        var result = await waitForElement(elementToAdd.habitId);
        return result;
    } catch(e){
        console.error("Error looking for element of id"+elementToAdd.habitId);
        console.error(e);
        return -1;
    }
}
var addHabitDOMElement = function(elementToAdd){
    let newHabitDivision = document.createElement("div");
    var minOrder = 80;
    var habitOrder = elementToAdd.order?elementToAdd.order:minOrder;
    newHabitDivision = updateHabitDOMProperties (newHabitDivision,elementToAdd);

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

    const descriptionText = document.createTextNode("Habit title:");
    const descriptionTextDiv = document.createElement("div");
    descriptionTextDiv.appendChild(descriptionText);

    /*const descriptionInput = document.createElement("textarea");*/
    const descriptionInput = document.createElement("input");
    descriptionInput.value = elementToAdd.habitDescription;
    descriptionInput.setAttribute("class","habit-description-definition");
    descriptionInput.setAttribute("type","text");
    /*descriptionInput.setAttribute("class","habit-description-definition large");
    descriptionInput.setAttribute("rows",3);*/

    /* TARGET VALUE */
    const targetText = document.createTextNode("Daily Target:");
    const targetTextDiv = document.createElement("div");
    targetTextDiv.appendChild(targetText);

    var targetArea = document.createElement("div");
    targetArea.setAttribute("class","progress-details");

    var targetContainer = document.createElement("div");
    targetContainer.setAttribute("class","target-container");

    /*targetContainer.appendChild(targetText);*/

    const targetInput = document.createElement("input");
    /*targetValue.setAttribute("class","habit-target-definition");
    targetValue.setAttribute("type","number");
    targetValue.value = elementToAdd.target;*/
    targetInput.setAttribute("class","number-of-completion habit-target-definition");

    targetInput.setAttribute("type","number");
    targetInput.setAttribute("value",elementToAdd.target);
    /*targetContainer.appendChild(targetText);*/

    var plusButtonText = document.createTextNode("+");
    var plusButton = document.createElement("div");

    plusButton.setAttribute("class","plus-button normal");
    var minusButtonText = document.createTextNode("-");
    var minusButton = document.createElement("div");
    plusButton.appendChild(plusButtonText);
    minusButton.setAttribute("class","minus-button normal");
    minusButton.appendChild(minusButtonText);

    plusButton.addEventListener('click', function(newHabitDivision) {
        return function(){
            var targetInput = newHabitDivision.getElementsByClassName("number-of-completion")[0];
            var targetValue = targetInput.value?parseInt(targetInput.value):0;
            targetValue+=1;
            targetInput.value = targetValue;
            newHabitDivision.setAttribute('target',targetValue.toString());

        }
    }(newHabitDivision));

    minusButton.addEventListener('click', function(newProgressDivision) {
        return function(){
            var targetInput = newHabitDivision.getElementsByClassName("number-of-completion")[0];
            var targetValue = targetInput.value?parseInt(targetInput.value):0;
            targetValue-=1;
            targetInput.value = targetValue;
            newHabitDivision.setAttribute('target',targetValue.toString());
        }
    }(newHabitDivision));
    

    /*targetContainer.appendChild(targetContainer);*/
    targetContainer.appendChild(minusButton);
    targetContainer.appendChild(targetInput);
    targetContainer.appendChild(plusButton);

    newHabitDivision.appendChild(titleTextDiv);
    newHabitDivision.appendChild(descriptionTextDiv);
    newHabitDivision.appendChild(descriptionInput);
    newHabitDivision.appendChild(targetTextDiv);
    newHabitDivision.appendChild(targetContainer);
    /*newHabitDivision.appendChild(targetValue);*/

      
    var weekDaySelector = dynamicWeekDaySelector(elementToAdd.weekDay);
    newHabitDivision.appendChild(weekDaySelector);

    var advancedSectionToggle = document.createElement("div");
    advancedSectionToggle.setAttribute('class','expand-collapse-link');
    var advancedSectionId = 'new-habit-advanced-section-google-'+elementToAdd.habitId.toString();
    var advancedSectionToggleId = 'new-habit-advanced-section-toggle-'+elementToAdd.habitId.toString();
    advancedSectionToggle.setAttribute('id',advancedSectionToggleId);
    advancedSectionToggle.setAttribute('onclick',"toggleSection('"+advancedSectionId+"','"+advancedSectionToggleId+"');");
    advancedSectionToggle.innerHTML = "&gt; Advanced Options ...";

    newHabitDivision.appendChild(advancedSectionToggle);

    var advancedSection = document.createElement("div");
    advancedSection.setAttribute('class','advanced-section');
    advancedSection.setAttribute('id',advancedSectionId)

    /* PRIORITY */
    const priorityText = document.createTextNode("Priority (1 is highest):");
    const priorityTextDiv = document.createElement("div");
    priorityTextDiv.appendChild(priorityText);

    const priorityValue = document.createElement("input");
    
    priorityValue.setAttribute("class","habit-target-definition");
    priorityValue.setAttribute("type","number");

    priorityValue.value = parseInt(newHabitDivision.getAttribute("order",habitOrder))-minOrder;

    priorityValue.addEventListener('input', function(habitDivision) {
        return function(){
            var newOrderInt = minOrder+parseInt(this.value);
            habitDivision.setAttribute("order",newOrderInt.toString());
        }
    }(newHabitDivision));
    /*var prioSetting = document.createElement("div");
    prioSetting.setAttribute("class","prio-settings");
    var laterButtonPrioText = document.createTextNode("Later");
    var laterButtonPrio = document.createElement("div");
    laterButtonPrio.appendChild(laterButtonPrioText);
    laterButtonPrio.setAttribute("class","later-button normal");

    var earlierButtonPrioText = document.createTextNode("Earlier");
    var earlierButtonPrio = document.createElement("div");
    earlierButtonPrio.appendChild(earlierButtonPrioText);
    earlierButtonPrio.setAttribute("class","earlier-button normal");


    laterButtonPrio.addEventListener('click', function(habitDivision) {
        return function(){
            var newOrder = habitDivision.getAttribute("order",habitOrder)+1;
            if (newOrder>80){
                newOrder=80;
            }
            habitDivision.style.order = newOrder
            habitDivision.setAttribute("order",newOrder);
        }
    }(newHabitDivision));

    earlierButtonPrio.addEventListener('click', function(habitDivision) {
        return function(){
            var newOrder = habitDivision.getAttribute("order",habitOrder)-1;
            if (newOrder<60){
                newOrder=60;
            }
            habitDivision.style.order = newOrder
            habitDivision.setAttribute("order",newOrder);
        }
    }(newHabitDivision));

    prioSetting.appendChild(earlierButtonPrio);
    prioSetting.appendChild(laterButtonPrio);
    newHabitDivision.appendChild(prioSetting);
    */
    advancedSection.appendChild(priorityTextDiv);
    advancedSection.appendChild(priorityValue);
    /* end priority */

    /* Timer */
    var checkBoxContainerIsTimerNecessary = checkboxWithTitle("Do you need a timer:",elementToAdd.isTimerNecessary,"is-timer-necessary-"+elementToAdd.habitId.toString());
    advancedSection.appendChild(checkBoxContainerIsTimerNecessary);
    const timerTimeTextDiv = document.createTextNode("Time in minutes:");
    const timerTimeInput = document.createElement("input");
    timerTimeInput.setAttribute("type","number");
    timerTimeInput.setAttribute("id","initial-time"+elementToAdd.habitId.toString());
    timerTimeInput.value = elementToAdd.timerInitialNumberOfMinutes;
    advancedSection.appendChild(timerTimeTextDiv);
    advancedSection.appendChild(timerTimeInput)
    /*timer-value*/

    /* IS CRITICAL */
    var checkBoxContainer = checkboxWithTitle("Critical:",elementToAdd.isCritical,"is-critical-"+elementToAdd.habitId.toString());
    advancedSection.appendChild(checkBoxContainer);

    /* IS SUSPENDABLE DURING SICKNESS */
    var checkBoxContainerSuspendableSickness = checkboxWithTitle("Suspendable during sickness:",elementToAdd.isSuspendableDuringSickness,"is-suspendable-during-sickness-"+elementToAdd.habitId.toString());
    advancedSection.appendChild(checkBoxContainerSuspendableSickness);

    /* IS SUSPENDABLE DURING other cases */
    var checkBoxContainerSuspendableOtherCases = checkboxWithTitle("Suspendable during other cases:",elementToAdd.isSuspendableDuringOtherCases,"is-suspendable-in-other-cases-"+elementToAdd.habitId.toString());
    advancedSection.appendChild(checkBoxContainerSuspendableOtherCases);

    newHabitDivision.appendChild(advancedSection);

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
var closeSaveMessage = function(){
    document.getElementById("save-message").style.display="none";
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
    removeItemByKey(habitKey);
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
            removeItemByKey(progressKey);
        }
    }

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

/* Get information from the form to add new habits and add a PROGRESS (dom+memory for both)*/
/* CAREFUL elementToAdd has data to build A PROGRESS */ 
/* both habit and progress are added with this function */
var addNewHabitFromForm = function(){

    var elementToAdd={};
    var newId = Date.now();
    elementToAdd.progressId = newId.toString();
    elementToAdd.habitId = (newId * 10).toString();
    /*elementToAdd.id = elementToAdd.habitId;*/
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = parseInt(document.getElementById('new-target').value);
    elementToAdd.isNegative = document.getElementById('new-is-negative-flag').checked;
    elementToAdd.progressDate = currentDate;
    elementToAdd.numberOfCompletions = 0;

    elementToAdd.isNew = true;
    elementToAdd.isCritical = document.getElementById('is-critical-new').checked;
    elementToAdd.isTimerNecessary = document.getElementById('is-timer-necessary-new').checked;
    elementToAdd.timerInitialNumberOfMinutes = document.getElementById('initial-time-new').value;
    elementToAdd.isSuspendableDuringSickness = document.getElementById('is-suspendable-during-sickness-new').checked;
    elementToAdd.isSuspendableDuringOtherCases = document.getElementById('is-suspendable-in-other-cases-new').checked;
    elementToAdd.order=80+(document.getElementById('priority-new').value?parseInt(document.getElementById('priority-new').value):1);
    elementToAdd.whatUpdated = "addNewHabitFromForm";
    elementToAdd.whatCreated = "addNewHabitFromForm";
    elementToAdd.whenUpdated =  (new Date()).toString();
    elementToAdd.whenCreated =  (new Date()).toString();

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
        elementToAdd['status'] = 'active';

        addProgressDOMElement(elementToAdd);
        pushProgressArrayToQueue(elementToAdd);
        dataArrays.todaysProgressArray.push(elementToAdd);
    }
    addHabitDOMElement(elementToAdd);
    
    document.getElementById('new-description').value = null;
    document.getElementById('new-target').value = 1;
    document.getElementById('new-is-negative-flag').checked = false;
    resetWeekDaySelector(weekDaySelector);
    document.getElementById('priority-new').value = 1;
    document.getElementById('is-timer-necessary-new').checked = false;
    document.getElementById('initial-time-new').value = 0;
    document.getElementById('is-critical-new').checked = false;
    document.getElementById('is-suspendable-during-sickness-new').checked = false;
    document.getElementById('is-suspendable-in-other-cases-new').checked = false;   

    showProgressTab();

    showStartProgressButtonOnHabits();

    saveChangesInHabitFromObject(elementToAdd);

    confirmAddition(elementToAdd.habitId);
};

var saveChangesInHabit = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = habitDOMToJson(habitDiv);
    pushHabitArrayToQueue(habitJSON);
    confirmSave();

}
var setHabitAsCritical = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = habitDOMToJson(habitDiv);
    habitJSON.isCritical=true;
    pushHabitArrayToQueue(habitJSON);
};
var unsetHabitAsCritical = function(habitId){
    var habitDiv = document.getElementById(habitId);
    var habitJSON = habitDOMToJson(habitDiv);
    habitJSON.isCritical=false;
    pushHabitArrayToQueue(habitJSON);
};

var saveChangesInHabitFromObject = function(habitElement){

    var habitJSON = {};
    habitJSON.habitId = habitElement.habitId;
    habitJSON.isNegative = habitElement.isNegative;
    habitJSON.habitDescription = habitElement.habitDescription;
    habitJSON.target = habitElement.target;
    habitJSON.weekDay = habitElement.weekDay;
    habitJSON.isCritical = habitElement.isCritical;
    habitJSON.isSuspendableDuringOtherCases = habitElement.isSuspendableDuringOtherCases;
    habitJSON.isSuspendableDuringSickness = habitElement.isSuspendableDuringSickness;
    habitJSON.isTimerNecessary = habitElement.isTimerNecessary;
    habitJSON.timerInitialNumberOfMinutes = habitElement.timerInitialNumberOfMinutes;
    habitJSON.order = habitElement.order;

    pushHabitArrayToQueue(habitJSON);
    
};

var eraseAccount = function(){
    var confirmationText = document.getElementById('erase-confirmation').value;
    
    if (confirmationText == 'delete account'){
        var response = fetchPost('habits/deleteaccount','').then(
            (value) => {
                if (value){
                    document.getElementById('deletion-answer').innerHTML = 'Deletion successful';
                    reactOnLogout();
                } else {
                    document.getElementById('deletion-answer').innerHTML = 'Problem deleting your account. Check your internet connection or try again later';
             
                }
            },
            (reason) => {
                document.getElementById('deletion-answer').innerHTML = 'Problem deleting your account. Check your internet connection or try again later';
            }
        );

    } else {
        document.getElementById('deletion-answer').innerHTML = 'In order to delete your account, you need to enter the exact text "delete account" above';
    }
}