var addHabitElement = function(elementToAdd){
    const newHabitDivision = document.createElement("div");

    newHabitDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newHabitDivision.setAttribute("target", elementToAdd.target);
    newHabitDivision.setAttribute("class", "box habit-setting");
    newHabitDivision.setAttribute("id",elementToAdd.habitId.toString());
    newHabitDivision.setAttribute("habitId",elementToAdd.habitId);
    newHabitDivision.setAttribute("weekDay",elementToAdd.weekDay);
    newHabitDivision.setAttribute("isNegative",elementToAdd.isNegative);

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
    const deleteButton = document.createElement("div");
    var onClickFunctionCall = "deleteHabit(" + elementToAdd.habitId.toString()+ ');';
    deleteButton.setAttribute("onClick",onClickFunctionCall);
    deleteButton.setAttribute("class","add-button");
    deleteButton.innerHTML = "Delete";
    newHabitDivision.appendChild(deleteButton);


    document.getElementById('habits-definition-container').appendChild(newHabitDivision);


}

var deleteHabit = function(habitId){
    var habitKey = "habit-"+habitId.toString();
    var element = document.getElementById(habitId.toString());
    element.parentNode.removeChild(element);
    window.localStorage.removeItem(habitKey);
}