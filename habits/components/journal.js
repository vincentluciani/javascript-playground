var displayJournalEditBoxAsync = async function(){
    var progressDate = document.getElementById("date-filter").value;
    var editBox = document.getElementById("journal-edit-box");
    var editBoxTextBox = document.getElementById("daily-journal");

    var currentText = await getJournalText(progressDate);
    editBoxTextBox.value = "";
    if (currentText && currentText.length>0){
       /* editBoxTextBox.value = JSON.parse(currentText.text);*/
       editBoxTextBox.value = currentText;
    }

    editBox.setAttribute("progressDate",progressDate);

    editBox.style.display="flex";
};

var displayJournalEditBox = function(){
    displayJournalEditBoxAsync().then(() => {
        console.log('successfully displayed the journal');
      }, reason => {
        console.log(reason );
      })
}

var getJournalText = async function(journalDate){

    var journal = await getItemByKey("journal-"+journalDate);
    if (null!=journal && null !=journal.text){
        return journal.text;
    } else {
        return "";
    }
}
var closeJournal = function(){
    var editBox = document.getElementById("journal-edit-box");
    var journalDate = editBox.getAttribute("progressDate");
    var editBoxText = document.getElementById("daily-journal").value;

    var journalEntry = {
        text: editBoxText,
        journalDate: journalDate
    }

    var objectToSave = {
        'id': "journal-" + journalDate.toString(),
        'value': journalEntry,

    }

    executePushToQueue(updateQueue,objectToSave);
    executePushToQueue(updateAPIQueue,objectToSave);
    editBox.style.display="none";
}


var convertJournalKeyToDateInt = function(journalKey){
    var resultString = journalKey.substring(0,4) + journalKey.substring(5,7) +journalKey.substring(8,10)   
    return parseInt(resultString);
}
var readJournal = function(journalArray){

    if (!journalArray || journalArray.length == 0){
        return 0;
    }
    journalArray.sort(function(a, b){
		return ( convertJournalKeyToDateInt(b.journalDate) - convertJournalKeyToDateInt(a.journalDate))
		});	

    document.getElementById("journal-container").innerHTML  = "";

    for ( var journalEntry of journalArray){
        var journalText = journalEntry.text;
        if ( journalText.length > 0){
            var brDiv = document.createElement("br");
            var journalDiv = document.createElement("div");
            journalDiv.setAttribute("class","journal-container-day box");
            var dateDiv = document.createElement("div");
            var formattedDate = new Date(journalEntry.journalDate).toLocaleString('default', { month: 'long',weekday: "long",month: "long",day: "numeric", year: "numeric" });
            var formattedDateParts = formattedDate.split(' ');
            if (formattedDateParts.length == 4){
                dateDiv.innerHTML = "<span class='day-of-week-journal'>"+formattedDateParts[0]+"</span> "+formattedDateParts[1]+" "+formattedDateParts[2]+" "+formattedDateParts[3];
            } else {
                dateDiv.innerHTML = "<span class='day-of-week-journal'>"+formattedDate.toString()+"</span>";
            }
            dateDiv.setAttribute("class","date-label");
            var textDiv = document.createElement("div");
            textDiv.innerHTML = journalText;
            textDiv.setAttribute("class","text-label");
            journalDiv.appendChild(dateDiv);
            journalDiv.appendChild(textDiv);   
            document.getElementById("journal-container").appendChild(journalDiv);
            /*document.getElementById("journal-container").appendChild(brDiv);*/
        }     
    }

}

