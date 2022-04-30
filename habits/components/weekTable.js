var weekTable = function(progressByDay){

    var listOfDays = buildListOfDays();

    var tableCode = "<table><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>";
    tableCode += "<tr>"
   
    var todaysDateDayNum = todaysDateDayNumber();

    for ( var i=0; i<=6; i++){
        var date = listOfDays[i];
        var result = progressByDay[date];
        var iconCode="";
        if (result != null){
            if (result>=0){
                iconCode="<i class='fa fa-circle icon'></i>";
            } else if (result<0){
                if (i<todaysDateDayNum){
                    iconCode="x";
                } 
            }
        } else {
            if (i<todaysDateDayNum){
                iconCode="-";
            } else {
                iconCode="";
            }
        }
        tableCode += "<td>"+iconCode+"</td>"
    }
    tableCode += "</tr></table>"

    return tableCode;
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