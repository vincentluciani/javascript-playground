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
    var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");

    const titleTextDiv = document.createElement("div");
    titleTextDiv.appendChild(taskIcon);
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
    } else {
        isCritical.checked = false;
    }
    isCritical.value=isCritical.checked;
    newHabitDivision.appendChild(isCriticalDivText);
    newHabitDivision.appendChild(isCritical);

    const saveButton = document.createElement("div");
    var onClickSaveFunctionCall = "saveChangesInHabit(" + elementToAdd.habitId.toString()+ ")";
    saveButton.setAttribute("onClick",onClickSaveFunctionCall);
    saveButton.setAttribute("class","add-button");
    saveButton.innerHTML = '<i class="fa fa-save"></i> Save';
    newHabitDivision.appendChild(saveButton);

    const deleteButton = document.createElement("div");
    var onClickFunctionCall = "requestHabitDeletion(" + elementToAdd.habitId.toString()+ ")";
    deleteButton.setAttribute("onClick",onClickFunctionCall);
    deleteButton.setAttribute("class","add-button");
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
    newHabitDivision.appendChild(deleteButton);



    document.getElementById('habits-definition-container').appendChild(newHabitDivision);


}

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

        /*var currentDateString = currentDateTime.getFullYear().toString().padStart(2,'0')+'-'+(currentDateTime.getMonth()+1).toString().padStart(2,'0')+'-'+currentDateTime.getDate().toString().padStart(2,'0'); */
        var currentDateString = formatDate(currentDateTime); 

        if ( (currentDateString == progressDate) && ( progressHabitId == habitId)) {
            var progressId = progressDivs[i].getAttribute("id");
            progressDivs[i].parentNode.removeChild(progressDivs[i]);
            var progressKey = "progress-"+progressId.toString();
            window.localStorage.removeItem(progressKey);
        }
    }




}