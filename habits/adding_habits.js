var currentDateTime = new Date();
var currentDate = currentDateTime.getFullYear().toString().padStart(2,'0')+'-'+(currentDateTime.getMonth()+1).toString().padStart(2,'0')+'-'+currentDateTime.getDate().toString().padStart(2,'0'); 

var filterDivs = function(testElements, filterType, filterValue, exactMatch){
    if (filterValue != null && filterValue != '' ){
        for (var i=0; i<testElements.length; i++){
            var valueOfElementToTest = testElements[i].getAttribute(filterType);
            if (!( (valueOfElementToTest == filterValue && exactMatch) || (valueOfElementToTest.includes(filterValue) && !exactMatch)) ){
                testElements[i].style.display =  'none'; 
            }
        }
    }
};
var resetElements = function(){
    var testElements = document.getElementsByClassName('habit-update');
    for (var i=0; i< testElements.length; i++){
        testElements[i].style.display =  'block';
        var currentDiv = testElements[i];
        var progressClasses = currentDiv.getElementsByClassName("progress");
        var progressDiv = progressClasses[0];
        
        /* javascript feature known as closure */
        progressDiv.addEventListener('change', function(currentDiv) {
                return function(){refreshProgress(currentDiv)}
             }(currentDiv));
    }
    return testElements;
};

var refreshProgress = function(currentDiv){
    var newCompletion = currentDiv.getElementsByClassName("progress")[0];
    var newCompletionPercentage = newCompletion.value * 100 / currentDiv.getAttribute("target");
    currentDiv.getElementsByClassName("completion")[0].value = newCompletionPercentage;

}

var applyFilters = function(){
    var testElements = resetElements();
    var filterTitle = document.getElementById("text-filter").value;
    var filterDate = document.getElementById("date-filter").value;

    filterDivs(testElements,"date",filterDate,true);
    filterDivs(testElements,"title",filterTitle,false);
};
onload = function(){
    
    document.getElementById("date-filter").value=currentDate;
    applyFilters();
};

var dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('input', function (evt) {
    applyFilters();
});



var textFilter = document.getElementById('text-filter')
textFilter.addEventListener('input', function (evt) {
    applyFilters();
});

var addElement = function(elementToAdd){
    const newDivision = document.createElement("div");
    newDivision.setAttribute("id", Date.now());
    newDivision.setAttribute("description", elementToAdd.habitDescription);
    newDivision.setAttribute("target", elementToAdd.target);
    newDivision.setAttribute("date", currentDate );
    newDivision.setAttribute("class", "box habit-update");

    const dateDiv = document.createElement("div");
    const dateText = document.createTextNode(currentDate);
    const descriptionText = document.createTextNode(elementToAdd.habitDescription);
    const currentProgressText = document.createTextNode("Number of times completed:");
    const currentCompletionText = document.createTextNode("Percentage Completion:");
    const descriptionDiv = document.createElement("div");
    const progressInput = document.createElement("input");
    const percentageCompletionInput = document.createElement("input");

    var percentageCompletion = elementToAdd.numberOfCompletions * 100 / elementToAdd.target ;
    
    progressInput.setAttribute("type","number");
    progressInput.setAttribute("class","progress");
    progressInput.setAttribute("value",elementToAdd.numberOfCompletions);

    percentageCompletionInput.setAttribute("type","number");
    percentageCompletionInput.setAttribute("class","completion");
    percentageCompletionInput.setAttribute("value",percentageCompletion);

    dateDiv.appendChild(dateText);
    descriptionDiv.appendChild(descriptionText);

    newDivision.appendChild(dateDiv);
    newDivision.appendChild(descriptionDiv);
    newDivision.appendChild(currentProgressText);
    newDivision.appendChild(progressInput);
    newDivision.appendChild(currentCompletionText);
    newDivision.appendChild(percentageCompletionInput);



    document.getElementById('habits-container').appendChild(newDivision);

    newDivision.addEventListener('change', function(newDivision) {
        return function(){refreshProgress(newDivision)}
     }(newDivision));

};

var addElementFromForm = function(){

    var elementToAdd={};
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = document.getElementById('new-target').value;
    elementToAdd.numberOfCompletions = 0;

    addElement(elementToAdd);


};

var displayAllElements = function(elementList){
    for (var i=0; i< elementList.length; i++) {
        const newDivision = document.createElement("div");
        document.body.appendChild(newDivision);
    }
};
