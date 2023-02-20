var addHabitDOMElement = function(elementToAdd){
    const newHabitDivision = document.createElement("div");
    elementToAdd.remoteHabitId= elementToAdd._id?elementToAdd._id:0;
    elementToAdd.habitId= elementToAdd.habitId?elementToAdd.habitId:0;

    newHabitDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newHabitDivision.setAttribute("target", elementToAdd.target);
    newHabitDivision.setAttribute("class", "box habit-setting");
    newHabitDivision.setAttribute("id",elementToAdd.habitId.toString());
    newHabitDivision.setAttribute("habitId",elementToAdd.habitId);
    newHabitDivision.setAttribute("remoteHabitId",elementToAdd.remoteHabitId);   
    newHabitDivision.setAttribute("weekDay",elementToAdd.weekDay);
    newHabitDivision.setAttribute("isNegative",false);
    newHabitDivision.setAttribute("isCritical",elementToAdd.isCritical);
    newHabitDivision.setAttribute("isSuspendableDuringSickness",elementToAdd.isSuspendableDuringSickness);
    newHabitDivision.setAttribute("isSuspendableDuringOtherCases",elementToAdd.isSuspendableDuringOtherCases);
    newHabitDivision.setAttribute("isTimerNecessary",elementToAdd.isTimerNecessary);
    newHabitDivision.setAttribute("timerInitialNumberOfMinutes",elementToAdd.timerInitialNumberOfMinutes);
    var minOrder = 80;
    var habitOrder = elementToAdd.order?elementToAdd.order:minOrder;
    newHabitDivision.style.order = habitOrder
    newHabitDivision.setAttribute("order",habitOrder);

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
    newHabitDivision.appendChild(priorityTextDiv);
    newHabitDivision.appendChild(priorityValue);
    /* end priority */

    /* Timer */
    var checkBoxContainerIsTimerNecessary = checkboxWithTitle("Do you need a timer:",elementToAdd.isTimerNecessary,"is-timer-necessary-"+elementToAdd.habitId.toString());
    newHabitDivision.appendChild(checkBoxContainerIsTimerNecessary);
    const timerTimeTextDiv = document.createTextNode("Time in minutes:");
    const timerTimeInput = document.createElement("input");
    timerTimeInput.setAttribute("type","number");
    timerTimeInput.setAttribute("id","initial-time"+elementToAdd.habitId.toString());
    timerTimeInput.value = elementToAdd.timerInitialNumberOfMinutes;
    newHabitDivision.appendChild(timerTimeTextDiv);
    newHabitDivision.appendChild(timerTimeInput)
    /*timer-value*/

    /* IS CRITICAL */
    var checkBoxContainer = checkboxWithTitle("Critical:",elementToAdd.isCritical,"is-critical-"+elementToAdd.habitId.toString());
    newHabitDivision.appendChild(checkBoxContainer);

    /* IS SUSPENDABLE DURING SICKNESS */
    var checkBoxContainerSuspendableSickness = checkboxWithTitle("Suspendable during sickness:",elementToAdd.isSuspendableDuringSickness,"is-suspendable-during-sickness-"+elementToAdd.habitId.toString());
    newHabitDivision.appendChild(checkBoxContainerSuspendableSickness);

    /* IS SUSPENDABLE DURING other cases */
    var checkBoxContainerSuspendableOtherCases = checkboxWithTitle("Suspendable during other cases:",elementToAdd.isSuspendableDuringOtherCases,"is-suspendable-in-other-cases-"+elementToAdd.habitId.toString());
    newHabitDivision.appendChild(checkBoxContainerSuspendableOtherCases);

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
    elementToAdd.isCritical = false;
    elementToAdd.isTimerNecessary = false;
    elementToAdd.timerInitialNumberOfMinutes = 0;
    elementToAdd.isSuspendableDuringSickness = false;
    elementToAdd.isSuspendableDuringOtherCases = false;
    elementToAdd.order=81;

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
        addProgressDOMElement(elementToAdd);
        pushProgressArrayToQueue(elementToAdd);
    }
    addHabitDOMElement(elementToAdd);
    
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

    pushHabitArrayToQueue(habitJSON);
    
};

