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