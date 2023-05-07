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
        /* code for skipped days because status is inactive*/
        if (result == -9999){
            iconCode=minusIconGreen;
        }
        else if (result != null){
            if (result>=0){
                iconCode=fullCirclePast;
            } else if (result<0){
                if (i<=todaysDateDayNum){
                    iconCode=fullCircleRed;
                    numberOfMissesInWeek++;
                } /*else if (i==todaysDateDayNum){
                    iconCode=emptyCircleToday;
                }*/
            }
        } else {
            if (i<=todaysDateDayNum){
                iconCode=minusIconGreen;
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

    var listOfDays = {};

    var currentDateTime = new Date();
    var currentWeekDay = currentDateTime.getDay();

    // if (currentWeekDay > 0){
    //     listOfDays[currentWeekDay] = formatDate(currentDateTime);
    // }

    var weekDay, dateTime=currentDateTime;
    do{
        dateTime.setDate(dateTime.getDate() - 1);
        weekDay = dateTime.getDay();
        listOfDays[weekDay] = formatDate(dateTime); 
    } while ( weekDay != 0)

    // dateTime.setDate(dateTime.getDate() - 1);
    // listOfDays[0] = formatDate(dateTime); 

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

var buildWeekTableBox = function(weekTableObject,habitObject){
    /* week table */
    var tableCode = weekTableObject.tableCode
    var numberOfMissesInWeek = weekTableObject.numberOfMissesInWeek
    const weekSummaryTable = document.createElement("div");
    var graphIcon = document.createElement("div");
    graphIcon.setAttribute("class","task-icon-container");
    graphIcon.innerHTML = calendarIcon;
    const grapTitle = document.createTextNode(habitObject.habitDescription);
    const grapTitleDiv = document.createElement("div");
    grapTitleDiv.setAttribute("class","graph-title");
    grapTitleDiv.appendChild(graphIcon);
    grapTitleDiv.appendChild(grapTitle);
    const weekSummaryTableTitle = document.createElement("div");
    weekSummaryTableTitle.innerHTML = "This week summary:";
    weekSummaryTableTitle.setAttribute("class","subtitle");
    const markAsCriticalDiv = document.createElement("div");

    markAsCriticalDiv.setAttribute("class","critical-link");
    if (habitObject.isCritical && habitObject.isCritical==true){
        markAsCriticalDiv.innerHTML = "Unmark as critical";
        markAsCriticalDiv.setAttribute("onclick","unsetHabitAsCritical("+ habitObject.habitId +");");
    } else {
        markAsCriticalDiv.innerHTML = "Mark as critical";
        markAsCriticalDiv.setAttribute("onclick","setHabitAsCritical("+ habitObject.habitId +");");
    }
    weekSummaryTable.setAttribute("class","table-summary");
    weekSummaryTable.innerHTML = tableCode;

    var newCanvaWrapper = document.createElement("div");

    newCanvaWrapper.appendChild(grapTitleDiv); 
    newCanvaWrapper.appendChild(weekSummaryTable);
    newCanvaWrapper.appendChild(markAsCriticalDiv);
    var brDiv = document.createElement("br");
    newCanvaWrapper.appendChild(brDiv);
    newCanvaWrapper.setAttribute("class","box canva-wrapper week-box");
    if (numberOfMissesInWeek==0){
        newCanvaWrapper.style.background="#daffd9";
        newCanvaWrapper.style.border="1px solid rgb(167 211 162)"
    } else if (numberOfMissesInWeek==1){
        newCanvaWrapper.style.background="rgb(255 252 238)";
        newCanvaWrapper.style.border="1px solid rgb(246 223 35)"
    } else if (numberOfMissesInWeek>1){
        newCanvaWrapper.style.background="white";
    }
    document.getElementById("no-week-summary").style.display = "none";
    document.getElementById("week-summary-container").appendChild(newCanvaWrapper);

}

