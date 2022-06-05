var formatDate = function(dateToFormat){
    return dateToFormat.getFullYear().toString().padStart(2,'0')+'-'+(dateToFormat.getMonth()+1).toString().padStart(2,'0')+'-'+dateToFormat.getDate().toString().padStart(2,'0'); 
};

var getDateFromFormattedDate = function(formattedDate){
    var dateParts = formattedDate.split('-');
    return new Date(dateParts[0],dateParts[1],dateParts[2]);
}
var daysSinceToday = function(formattedDate){
    var inputDate = getDateFromFormattedDate(formattedDate);
    var today = new Date();
    return Math.round((today-inputDate)/24/3600);
}
var todaysDateDayNumber = function(){
    
    var todaysDateTime = new Date();
    return todaysDateTime.getDay();

};

var formattedTodaysDate = function(){
    var todaysDateTime = new Date();
    return formatDate(todaysDateTime);
}