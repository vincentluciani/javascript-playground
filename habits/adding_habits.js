
var loggedIn = false;
var maxForNonLoggedIn = 40;

var currentDateTime = new Date();
var currentDate = currentDateTime.getFullYear().toString().padStart(2,'0')+'-'+(currentDateTime.getMonth()+1).toString().padStart(2,'0')+'-'+currentDateTime.getDate().toString().padStart(2,'0'); 

var getHabitProgress = function(){

    if (loggedIn){
        getHabitProgressWhenLoggedIn();
    } else {
        getHabitProgressWhenNotLoggedIn();
    }
};

var getHabitProgressWhenLoggedIn = function(){
    var APIcallParameters = {
        method: "GET",
        url: "http://localhost:5000/get-habit-progress"
    };
    var apiCaller = new APICaller(APIcallParameters,ingestElements,getHabitProgressWhenNotLoggedIn);

    apiCaller.executeCall(APIcallParameters.url, {});

};

var getHabitProgressWhenNotLoggedIn = function(){
    var progressArray=[];
    var habitsArray=[];

    for (var i = 0; i < localStorage.length && i < maxForNonLoggedIn; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf("progress-") >= 0){
            progressArray.push(JSON.parse(localStorage.getItem(currentKey)));
        } else if ( currentKey.indexOf("habit-") >= 0){
            habitsArray.push(JSON.parse(localStorage.getItem(currentKey)));
        }
    }
    ingestElements(progressArray);
};

var ingestElements = function(inputData,urlDetails){
   /* var inputData = getHabitProgress();*/
    for ( var i=0; i < inputData.length;i++){
        addElement(inputData[i]);
    }

    applyFilters();
    launchCharts(inputData,1);
}
var filterDivs = function(testElements, filterType, filterValue, exactMatch){
    if (filterValue != null && filterValue != '' ){
        for (var i=0; i<testElements.length; i++){
            var valueOfElementToTest = testElements[i].getAttribute(filterType);
            if (!( (valueOfElementToTest == filterValue && exactMatch) || (valueOfElementToTest.indexOf(filterValue) >= 0 && !exactMatch)) ){
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
        var progressClasses = currentDiv.getElementsByClassName("number-of-completion");
        var progressDiv = progressClasses[0];
        refreshProgress(currentDiv);
        
        /* javascript feature known as closure */
        progressDiv.addEventListener('change', function(currentDiv) {
                return function(){refreshProgress(currentDiv)}
             }(currentDiv));
    }
    return testElements;
};

var refreshProgress = function(currentDiv){
    var newCompletion = currentDiv.getElementsByClassName("number-of-completion")[0];
    var newCompletionPercentage = Math.round(newCompletion.value * 100 / parseInt(currentDiv.getAttribute("target")));
    currentDiv.getElementsByClassName("percentage-completion")[0].value = newCompletionPercentage;

    if (newCompletionPercentage>=100){
        currentDiv.style.boxShadow="rgb(0 255 7 / 20%) -1px 2px 20px 12px";
    } else if (newCompletionPercentage>=50){
        currentDiv.style.boxShadow="-1px 2px 20px 0px #ffc107";
    } else if (newCompletionPercentage<50){
        currentDiv.style.boxShadow="-1px 2px 20px 0px rgb(255 124 124)";
    }

}

var applyFilters = function(){
    var testElements = resetElements();
    var filterTitle = document.getElementById("text-filter").value;
    var filterDate = document.getElementById("date-filter").value;

    filterDivs(testElements,"progressDate",filterDate,true);
    filterDivs(testElements,"habitDescription",filterTitle,false);
};
onload = function(){
    
    document.getElementById("date-filter").value=currentDate;
    /*ingestElements();*/
    getHabitProgress();

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
    newDivision.setAttribute("id", elementToAdd.id );
    newDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newDivision.setAttribute("target", elementToAdd.target);
    newDivision.setAttribute("progressDate", elementToAdd.progressDate );
    newDivision.setAttribute("class", "box habit-update");
    newDivision.setAttribute("isNew",elementToAdd.isNew);
    newDivision.setAttribute("habitId",elementToAdd.habitId);

    const dateDiv = document.createElement("div");
    const dateText = document.createTextNode(elementToAdd.progressDate);
    const descriptionText = document.createTextNode(elementToAdd.habitDescription);
    const currentProgressText = document.createTextNode("Number of times completed:");
    const currentCompletionText = document.createTextNode("Percentage Completion:");
    const descriptionDiv = document.createElement("div");
    const progressInput = document.createElement("input");
    const percentageCompletionInput = document.createElement("input");

    var percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / elementToAdd.target) ;
    
    progressInput.setAttribute("type","number");
    progressInput.setAttribute("class","number-of-completion");
    progressInput.setAttribute("value",elementToAdd.numberOfCompletions);

    percentageCompletionInput.setAttribute("type","number");
    percentageCompletionInput.setAttribute("class","percentage-completion");
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
    elementToAdd.id = Date.now();
    elementToAdd.habitId = elementToAdd.id * 10;
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = parseInt(document.getElementById('new-target').value);
    elementToAdd.progressDate = currentDate;
    elementToAdd.numberOfCompletions = 0;
    elementToAdd.isNew = true;

    addElement(elementToAdd);
};

var displayAllElements = function(elementList){
    for (var i=0; i< elementList.length; i++) {
        const newDivision = document.createElement("div");
        document.body.appendChild(newDivision);
    }
};

var extractElementsForUpdate = function(){

    var testElements = document.getElementsByClassName('habit-update');

    if (loggedIn){
        extractElementsForUpdateLoggedIn(testElements);
    } else {
        extractElementsForUpdateNoneLoggedIn(testElements);
    }

};


var extractElementsForUpdateLoggedIn = function(testElements){
    var outputElements = [];

    for (var i=0; i< testElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(testElements[i]);
        outputElements.push(currentOutput);
    }

    console.log(outputElements);
};

var convertToHabit = function(progressElement){
    return {
        id: progressElement.habitId,
        habitDescription: progressElement.habitDescription,
        target: progressElement.target
    }
}
var extractElementsForUpdateNoneLoggedIn = function(testElements){
    localStorage.clear();
    for (var i=0; i< testElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(testElements[i]);
        window.localStorage.setItem('progress-'+currentOutput.id.toString(), JSON.stringify(currentOutput));
        if (currentOutput.isNew == true ){
            window.localStorage.setItem('habit-'+currentOutput.habitId,JSON.stringify(convertToHabit(currentOutput)));
        }
    }

};
var readElement = function(elementToRead){
    var outputJson = {};
    outputJson.id = elementToRead.getAttribute("id");
    outputJson.habitId = elementToRead.getAttribute("habitId");
    outputJson.habitDescription = elementToRead.getAttribute("habitDescription");
    outputJson.target = parseInt(elementToRead.getAttribute("target"));
    outputJson.progressDate = elementToRead.getAttribute("progressDate");
    outputJson.isNew = elementToRead.getAttribute("isNew");
    outputJson.numberOfCompletions = parseInt(elementToRead.getElementsByClassName("number-of-completion")[0].value);

    return outputJson;
};

function APICaller(parameters,callback,callbackOnFailure){
	
	this.parameters = parameters;
	this.callback = callback;
	
	this.executeCall = function(url,urlDetails)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				callback(JSON.parse(this.responseText),urlDetails);
			} else {
                callbackOnFailure();
            }
		};
		xhttp.open(parameters.method, url, true);
		xhttp.send();
	};
	
};

var launchCharts = function(fullData,habitId){
    var dataToShow = [];
    var baseline = [];
    for ( var i=0; i< fullData.length;i++){
        if (fullData[i].habitId == habitId){
            dataToShow.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].numberOfCompletions
            })
            baseline.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].target
            })
        }
    }

    var ctx = document.getElementById('myChart').getContext('2d');


    let options = {
    scales: {
    xAxes: [{type: 'time', time: {parser: 'YYYY-MM-DD', unit: 'day'}}],
    yAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'Your Score'
        }
    }]
    },
    legend: {
        display: true
    },
    };

    let chartData = {

    datasets: [
                    {
                        label: 'Your target',
                        data: baseline,
                        fill: false,
                        order: 2
                    }, 
                    {
                        label: 'Your daily score',
                        data: dataToShow,
                        backgroundColor: '#cad1f3',
                        order: 1
                    }
    ]
    };

    var chart = new Chart(ctx, {
    data: chartData,
    options: options,
    type:'line',
    });

}
