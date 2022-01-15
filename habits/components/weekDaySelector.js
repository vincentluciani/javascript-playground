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
    7:'sunday'
}

var isDayOfWeekInHabitWeeks = function(currentDate, stringOfWeekDays){

    var currentDayOfWeek = currentDate.getDay();
    var currentDayOfWeekString = weekDayNumbers[currentDayOfWeek];

    var arrayOfWeekDays = stringOfWeekDays.split(" ");

    const index = arrayOfWeekDays.indexOf(currentDayOfWeekString);
    if (index > -1) {
        return true;
    }

    return false;
}

