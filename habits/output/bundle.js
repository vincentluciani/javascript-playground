

var encourageIfPassedTarget = function(result, target){

        if ( result == target){
            document.getElementById("positive-message").style.display="flex";
            document.getElementById("positive-message-title").innerHTML = buildCongratulationTitle('en_US')+" :)";
            document.getElementById("positive-message-subtitle").innerHTML = buildCongratulationSubTitle('en_US') ;
        }
}

var closeMessage = function(){
    document.getElementById("positive-message").style.display="none";
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

    for ( var i=0; i< journalArray.length; i++){
        var journalText = journalArray[i].text;
        if ( journalText.length > 0){
            var brDiv = document.createElement("br");
            var journalDiv = document.createElement("div");
            var dateDiv = document.createElement("div");
            dateDiv.innerHTML = journalArray[i].key.substr(8);
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
    newProgressDivision.setAttribute("isCritical", elementToAdd.isCritical);

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

var updateProgressOnRadial = function( percentageValue, parameters){

    circleRadius = ( parameters.containerHeight / 2 ) - parameters.strokeWidth;

    var circleDiv = document.getElementById(parameters.suffixForIds+'_background-circle');
    var progressDiv = document.getElementById(parameters.suffixForIds+'_progress-circle');
    var percentageValueDiv = document.getElementById(parameters.suffixForIds+'_percentage-value');
    
    var percentageCircleContainer = document.getElementById(parameters.suffixForIds+'_percentage-circle-container');

    if (percentageValueDiv){
        percentageValueDiv.innerHTML = percentageValue + " %";
    } else {
        return;
    }
    var textMarginLeft = (parameters.strokeWidth + circleRadius)/1.5 + parameters.textLeftAdjustment;
    percentageValueDiv.style.marginLeft = textMarginLeft.toString()+"px";
    
    progressDiv.style.stroke = parameters.progressColor;
    circleDiv.style.stroke  = parameters.emptyColor;

  
    if (isNaN(percentageValue)) {
        percentageValue = 100; 
    }
    else{
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


var createProgressElements = function(parameters){

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
  /*  var roundedMarginTop = Math.round(textMarginTop/100)*100;
    var roundedMarginLeft = Math.round(textMarginLeft/100)*100*/
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
    var weekArray = weekArrayString.split(" ");

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
    if (index > -1) {
        return true;
    }

    return false;
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
    if (index > -1) {
        return true;
    }
    return false;
}

var resetWeekDaySelector = function(weekDaySelector) {

    weekDaySelector.setAttribute("weekday","");
    var weekDays = weekDaySelector.getElementsByClassName("weekday");

    for ( var i = 0; i < weekDays.length; i++){
        weekDays[i].classList.remove("selected");
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
                iconCode="<i class='fa fa-circle icon'></i>";
            } else if (result<0){
                if (i<todaysDateDayNum){
                    iconCode="<i class='fa fa-circle icon red'></i>";
                    numberOfMissesInWeek++;
                } else if (i==todaysDateDayNum){
                    iconCode="<i class='fa fa-circle-o icon today'></i>";
                }
            }
        } else {
            if (i<=todaysDateDayNum){
                iconCode="<i class='fa fa-minus icon'></i>";
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
function getRandomNumber(min,max){

    var randomSeed = Math.random();
    
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
var translations = {};
translations['en_US']  = {
'amazing':['Amazing','Superb','Outstanding','Magnificient','Exceptional','Marvellous','Wonderful','Sublime','Supreme','Splendid','Fantastic','Awesome','Mind-blowing','Brilliant','Smashing','Spectacular','Spectaculous','Awesome'],
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

    for ( var i=0; i<progressElements.length; i++){
        progressElements[i].parentNode. removeChild(progressElements[i]);
    }

    resetElement("progress");

}

var resetHabits = function(){
    var progressElements = document.getElementsByClassName("habit-setting");

    for ( var i=0; i<progressElements.length; i++){
        progressElements[i].parentNode. removeChild(progressElements[i]);
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
var pushProgressToQueue = function(divToAnalyze) {

    var progressArray = readElement(divToAnalyze);

    encourageIfPassedTarget(progressArray.numberOfCompletions, progressArray.target);

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

    /*var intervalID = setInterval(pushItemInQueue, 50, newObject);*/
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