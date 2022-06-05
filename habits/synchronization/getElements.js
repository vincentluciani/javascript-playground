var getHabitProgressJournal = function(){

    if (loggedIn){
        dataArrays=getHabitProgressJournalWhenLoggedIn();
    } else {
        dataArrays=getHabitProgressJournalWhenNotLoggedIn();
    }

};

var getHabitProgressJournalWhenLoggedIn = function(){
    var progressArray,habitsArray,journalArray = {};
    /*
    var APIcallParameters = {
        method: "GET",
        url: "http://localhost:5000/get-habit-progress"
    };

    var apiCaller = new APICaller(APIcallParameters,todoCallback1,todoCallback2);

    apiCaller.executeCall(APIcallParameters.url, {});
*/
    return {progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray};
};

var getHabitProgressJournalWhenNotLoggedIn = function(){
    var progressArray=[];
    var habitsArray=[];
    var journalArray = [];
    var todaysProgressArray=[];
    var pastProgressArray=[];
    var localStorageLength = localStorage.length;

    for (var i = 0; i < localStorageLength && i < maxForNonLoggedIn; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf("progress-") >= 0){
            var progressValue = JSON.parse(localStorage.getItem(currentKey));
            if ( progressValue.progressDate == formattedTodaysDate()){
                todaysProgressArray.push(progressValue);
            } else if (daysSinceToday(progressValue.progressDate)<=30) {
                pastProgressArray.push(progressValue);
            }
            progressArray.push(progressValue);
        } else if ( currentKey.indexOf("habit-") >= 0){
            habitsArray.push(JSON.parse(localStorage.getItem(currentKey)));
        } else if ( currentKey.indexOf("journal-") >= 0){
            journalArray.push({'key':currentKey,'text':JSON.parse(localStorage.getItem(currentKey))});
        }
    }

    return {progressArray,habitsArray,journalArray,todaysProgressArray,pastProgressArray};

};
