
var addElement = function(elementToAdd){

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


    const dateDiv = document.createElement("div");

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
    var expandButtonContainer = document.createElement("i");
    expandButtonContainer.setAttribute("class","fa fa-plus");

    var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");
    habitDescriptionContainer.appendChild(taskIcon);
    habitDescriptionContainer.appendChild(habitDescriptionText);
    newProgressDivision.appendChild(habitDescriptionContainer);
    newProgressDivision.appendChild(expandButtonContainer);

    var detailsArea = document.createElement("div");
    detailsArea.setAttribute("class","progress-details");
    
    var currentProgressContainer = document.createElement("div");
    currentProgressContainer.setAttribute("class","progress-container");

    if (elementToAdd.target > 1){
    /*if (1==1){*/

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

     expandButtonContainer.addEventListener('click', function(expandButtonContainer,detailsArea) {
        return function(){
            toggleExpandCollapse(expandButtonContainer,detailsArea);
        }
     }(expandButtonContainer,detailsArea));

};

var toggleExpandCollapse = function(toggleButton,divToTransform){

    const targetIsPlus = toggleButton.classList.toggle("fa-plus");
    const targetIsMinus = toggleButton.classList.toggle("fa-minus");

    if (targetIsPlus && !targetIsMinus){
        divToTransform.style.display = 'none';
    } else {
        divToTransform.style.display = 'block';
    }

}