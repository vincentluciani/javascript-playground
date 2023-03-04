var displayJournalEditBoxAsync = async function(){
    var progressDate = document.getElementById("date-filter").value;
    var editBox = document.getElementById("journal-edit-box");
    var editBoxTextBox = document.getElementById("daily-journal");

    var currentText = await getCurrentDateJournal(progressDate);
    editBoxTextBox.value = "";
    if (currentText && currentText.text && currentText.text.length>0){
       /* editBoxTextBox.value = JSON.parse(currentText.text);*/
       editBoxTextBox.value = currentText.text;
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

var getCurrentDateJournal = async function(journalDate){

    var journal = await getItemByKey("journal-"+journalDate);
    return journal[0];
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
        'value': JSON.stringify(journalEntry),

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
            journalDiv.setAttribute("class","journal-container-day");
            var dateDiv = document.createElement("div");
            dateDiv.innerHTML = journalEntry.journalDate;
            dateDiv.setAttribute("class","date-label");
            var textDiv = document.createElement("div");
            textDiv.innerHTML = journalText;
            textDiv.setAttribute("class","text-label");
            journalDiv.appendChild(dateDiv);
            journalDiv.appendChild(textDiv);   
            document.getElementById("journal-container").appendChild(journalDiv);
            document.getElementById("journal-container").appendChild(brDiv);
        }     
    }

}

