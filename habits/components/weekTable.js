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
                iconCode=fullCirclePast;
            } else if (result<0){
                if (i<todaysDateDayNum){
                    iconCode=fullCircleRed;
                    numberOfMissesInWeek++;
                } else if (i==todaysDateDayNum){
                    iconCode=emptyCircleToday;
                }
            }
        } else {
            if (i<=todaysDateDayNum){
                iconCode=minusIconGreen;
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