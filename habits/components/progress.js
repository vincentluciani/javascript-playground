
var addElement = function(elementToAdd){
    const newProgressDivision = document.createElement("div");

    newProgressDivision.setAttribute("id", elementToAdd.id );
    newProgressDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newProgressDivision.setAttribute("target", elementToAdd.target);
    newProgressDivision.setAttribute("progressDate", elementToAdd.progressDate );
    newProgressDivision.setAttribute("class", "box habit-update");
    newProgressDivision.setAttribute("isNew",elementToAdd.isNew);
    newProgressDivision.setAttribute("habitId",elementToAdd.habitId);

    const dateDiv = document.createElement("div");

    const habitDescriptionText = document.createTextNode(elementToAdd.habitDescription);
    const targetValue = document.createElement("input");
    const currentProgressText = document.createTextNode("Number of times completed:");
    const currentCompletionText = document.createTextNode("Percentage Completion:");
    const progressInput = document.createElement("input");
    const percentageCompletionInput = document.createElement("div");

    const targetText = document.createTextNode(" of "+elementToAdd.target);
    const targetTextDiv = document.createElement("div");
    targetTextDiv.setAttribute('class','side-text');
    targetTextDiv.appendChild(targetText);

    var percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / elementToAdd.target) ;
    
    progressInput.setAttribute("type","number");
    progressInput.setAttribute("class","number-of-completion");
    progressInput.setAttribute("value",elementToAdd.numberOfCompletions);

    /*percentageCompletionInput.setAttribute("type","number");*/
    percentageCompletionInput.setAttribute("class","percentage-completion");
    percentageCompletionInput.innerHTML = percentageCompletion.toString();


    var habitDescriptionContainer = document.createElement("div");
    habitDescriptionContainer.setAttribute("class","habit-description");
    var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");
    habitDescriptionContainer.appendChild(taskIcon);
    habitDescriptionContainer.appendChild(habitDescriptionText);
    newProgressDivision.appendChild(habitDescriptionContainer);

    var currentProgressContainer = document.createElement("div");

    currentProgressContainer.appendChild(currentProgressText);
    currentProgressContainer.setAttribute("class","progress-container");

    var plusButtonText = document.createTextNode("+");
    var plusButton = document.createElement("div");
    plusButton.setAttribute("class","plus-button normal");
    var minusButtonText = document.createTextNode("-");
    var minusButton = document.createElement("div");
    minusButton.appendChild(minusButtonText);
    minusButton.setAttribute("class","minus-button normal");
    plusButton.appendChild(plusButtonText);

    plusButton.addEventListener('click', function(newProgressDivision) {
        return function(){
            var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0]
            addOneToProgress(progressInput);
            refreshProgress(newProgressDivision);
        }
     }(newProgressDivision));

     minusButton.addEventListener('click', function(newProgressDivision) {
        return function(){
            var progressInput = newProgressDivision.getElementsByClassName("number-of-completion")[0]         
            minusOneToProgress(progressInput);
            refreshProgress(newProgressDivision);
        }
     }(newProgressDivision));

    newProgressDivision.appendChild(currentProgressContainer);
    newProgressDivision.appendChild(plusButton);
    newProgressDivision.appendChild(progressInput);
    newProgressDivision.appendChild(minusButton);
    newProgressDivision.appendChild(targetTextDiv);



    var completionTextContainer = document.createElement("div");
    completionTextContainer.setAttribute("class","progress-container");

    completionTextContainer.appendChild(currentCompletionText);
    newProgressDivision.appendChild(completionTextContainer);
    newProgressDivision.appendChild(percentageCompletionInput);

    targetValue.value = elementToAdd.target;

    document.getElementById('habits-container').appendChild(newProgressDivision);
    newProgressDivision.addEventListener('change', function(newProgressDivision) {
        return function(){refreshProgress(newProgressDivision)}
     }(newProgressDivision));





};