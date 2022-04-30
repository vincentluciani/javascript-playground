var formatDate = function(dateToFormat){
    return dateToFormat.getFullYear().toString().padStart(2,'0')+'-'+(dateToFormat.getMonth()+1).toString().padStart(2,'0')+'-'+dateToFormat.getDate().toString().padStart(2,'0'); 
};

var todaysDateDayNumber = function(){
    
    var todaysDateTime = new Date();
    return todaysDateTime.getDay();

};