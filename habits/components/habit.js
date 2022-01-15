var addHabitElement = function(elementToAdd){
    const newHabitDivision = document.createElement("div");

    newHabitDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newHabitDivision.setAttribute("target", elementToAdd.target);
    newHabitDivision.setAttribute("class", "box habit-setting");
    newHabitDivision.setAttribute("habitId",elementToAdd.habitId);
    newHabitDivision.setAttribute("weekDay",elementToAdd.weekDay);

    const descriptionInput = document.createElement("input");
    descriptionInput.value = elementToAdd.habitDescription;
    descriptionInput.setAttribute("class","habit-description-definition");


    const targetText = document.createTextNode("Daily Target");
    const targetValue = document.createElement("input");
    targetValue.setAttribute("class","habit-target-definition");
    targetValue.setAttribute("type","number");

    targetValue.value = elementToAdd.target;
    newHabitDivision.appendChild(descriptionInput);
    newHabitDivision.appendChild(targetText);
    newHabitDivision.appendChild(targetValue);

    document.getElementById('habits-definition-container').appendChild(newHabitDivision);


}