
var loggedIn = false;
var maxForNonLoggedIn = 80;
var updateQueue = [];

var currentDateTime = new Date();
var currentDate = currentDateTime.getFullYear().toString().padStart(2,'0')+'-'+(currentDateTime.getMonth()+1).toString().padStart(2,'0')+'-'+currentDateTime.getDate().toString().padStart(2,'0'); 

var plusButtonInAddDiv = document.getElementById("plus-in-add-div");
var minusButtonInAddDiv = document.getElementById("minus-in-add-div");
                     
var newTargetDiv = document.getElementById("new-target");

onload = function(){
    
    document.getElementById("date-filter").value=currentDate;
    /*ingestElements();*/

    getHabitProgress();
    addEmptyProgressOnNewDay();

};

plusButtonInAddDiv.addEventListener('click', function(newTargetDiv) {
    return function(){
        addOneToProgress(newTargetDiv);
    }
    }(newTargetDiv));

minusButtonInAddDiv.addEventListener('click', function(newTargetDiv) {
        return function(){
            minusOneToProgress(newTargetDiv);
        }
        }(newTargetDiv));






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
    if (habitsArray.length > 0){
        changeTabToProgress();
    }


    ingestElements(progressArray,habitsArray);
};

var ingestElements = function(inputData,habitsArray,urlDetails){
   /* var inputData = getHabitProgress();*/
    for ( var i=0; i < inputData.length;i++){
        addElement(inputData[i]);
    }
    for ( var i=0; i < habitsArray.length;i++){
        addHabitElement(habitsArray[i]);
    }
    applyFilters();
    launchCharts(inputData,habitsArray);
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

        if (progressDiv != null){
            refreshProgress(currentDiv);
            progressDiv.addEventListener('change', function(currentDiv) {
                return function(){
                    refreshProgress(currentDiv);
                    
                }
             }(currentDiv));
        }
        
        /* javascript feature known as closure */
        
    }
    return testElements;
};

var refreshProgress = function(currentDiv){
    var newCompletion = currentDiv.getElementsByClassName("number-of-completion")[0];
    var newCompletionPercentage = Math.round(newCompletion.value * 100 / parseInt(currentDiv.getAttribute("target")));
    currentDiv.getElementsByClassName("percentage-completion")[0].innerHTML = newCompletionPercentage;

    
    if (newCompletionPercentage>=100){
        currentDiv.style.background="#f7fff6";
        currentDiv.style.boxShadow="rgb(21 173 25 / 20%) -1px 2px 12px 5px";
    } else if (newCompletionPercentage>=50){
        currentDiv.style.background="#fffded";
        currentDiv.style.boxShadow="-1px 2px 17px 0px rgb(243 229 176)";
    } else if (newCompletionPercentage<50){
        currentDiv.style.background="#fff6f9";
        currentDiv.style.boxShadow="-1px 2px 10px 0px rgb(255 190 190)";
    }



}

var applyFilters = function(){
    var testElements = resetElements();
    var filterTitle = document.getElementById("text-filter").value;
    var filterDate = document.getElementById("date-filter").value;

    filterDivs(testElements,"progressDate",filterDate,true);
    filterDivs(testElements,"habitDescription",filterTitle,false);
};


var dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('input', function (evt) {
    applyFilters();
});

var textFilter = document.getElementById('text-filter')
textFilter.addEventListener('input', function (evt) {
    applyFilters();
});



var minusOneToProgress = function(divElement){
    console.log("minus one");

    if (parseInt(divElement.value) > 0){
        divElement.value = (parseInt(divElement.value) - 1).toString();
    }
}

var addOneToProgress = function(divElement){
    console.log("plus one");

    divElement.value = (parseInt(divElement.value) + 1).toString();
}

/* Get information from the form to add new habits and add a habit (dom+memory for both)*/ 
var addElementFromForm = function(){

    var elementToAdd={};
    elementToAdd.id = Date.now();
    elementToAdd.habitId = elementToAdd.id * 10;
    elementToAdd.habitDescription = document.getElementById('new-description').value;
    elementToAdd.target = parseInt(document.getElementById('new-target').value);
    elementToAdd.progressDate = currentDate;
    elementToAdd.numberOfCompletions = 0;
    elementToAdd.isNew = true;
    elementToAdd.weekDay = document.getElementById('week-day-selection').getAttribute('weekDay');

    if (elementToAdd.weekDay){
        var isDayOK = isDayOfWeekInHabitWeeks(currentDateTime, elementToAdd.weekDay);
    } else {
        var isDayOK = true;
    }
    if (isDayOK != null && isDayOK == true)
    {
        addElement(elementToAdd);
    }
    addHabitElement(elementToAdd);
    pushProgressArrayToQueue(elementToAdd);

    document.getElementById('new-description').value = null;
    document.getElementById('new-target').value = null;

};

var displayAllElements = function(elementList){
    for (var i=0; i< elementList.length; i++) {
        const newDivision = document.createElement("div");
        document.body.appendChild(newDivision);
    }
};

/* get information from all progress and habits boxes (calls functions to do it)*/
var extractElementsForUpdate = function(){

    var progressElements = document.getElementsByClassName('habit-update');
    var habitsElements = document.getElementsByClassName('habit-setting');
    if (loggedIn){
        extractElementsForUpdateLoggedIn(progressElements, habitsElements);
    } else {
        extractElementsForUpdateNoneLoggedIn(progressElements, habitsElements);
    }

};


var extractElementsForUpdateLoggedIn = function(progressElements, habitsElements){
    var outputElements = [];

    for (var i=0; i< progressElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(progressElements[i]);
        outputElements.push(currentOutput);
    }

    console.log(outputElements);
};




var extractElementsForUpdateNoneLoggedIn = function(progressElements, habitsElements){
    /*localStorage.clear();
    for (var i=0; i< progressElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(progressElements[i]);
        var jsonOutput = JSON.stringify(currentOutput);

        try {
            window.localStorage.setItem('progress-'+currentOutput.id.toString(), jsonOutput);
          } catch (error) {
            console.error(error);
            console.error("Problem writing progress:"+currentOutput.id.toString());
            console.error(currentOutput);
          }

          var verificationObject = window.localStorage.getItem('progress-'+currentOutput.id.toString());

          if (verificationObject != jsonOutput){
            console.error("Problem writing progress - write is not same as intented:"+currentOutput.id.toString());
          }
        
 
    }*/
    readQueueProgress();

    for ( var j=0; j< habitsElements.length;j++){
        var currentOutput = readHabitElement(habitsElements[j]);
        window.localStorage.setItem('habit-'+currentOutput.habitId,JSON.stringify(currentOutput));
    }

};
var readHabitElement = function(elementToRead){
    var outputJson = {};
    outputJson.habitId = elementToRead.getAttribute("habitId");

    outputJson.habitDescription = elementToRead.getElementsByClassName('habit-description-definition')[0].value;
    outputJson.target = parseInt(elementToRead.getElementsByClassName('habit-target-definition')[0].value);
    outputJson.weekDay = elementToRead.getElementsByClassName("week-day-selection")[0].getAttribute("weekDay");

    return outputJson;
};

/* Read progress from the dom */
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




var addEmptyProgressOnNewDay = function(){

    var progressElements = document.getElementsByClassName('habit-update');
    var habitsElements = document.getElementsByClassName('habit-setting');

    for (var i=0; i< habitsElements.length;i++){

        var isHabitProgressExisting = false;

        for (var j=0; j< progressElements.length;j++){
            if ( habitsElements[i].getAttribute("habitId") == progressElements[j].getAttribute("habitId") && progressElements[j].getAttribute("progressdate") == currentDate){
                isHabitProgressExisting = true;
            }
        }

        if ( isHabitProgressExisting == false){

            if (habitsElements[i].getAttribute("weekDay")){
                var isDayOK = isDayOfWeekInHabitWeeks(currentDateTime, habitsElements[i].getAttribute("weekDay"));
            } else {
                var isDayOK = true;
            }
            if (isDayOK != null && isDayOK == true) {
                newProgressObject = {
                    id: Date.now(),
                    habitId: habitsElements[i].getAttribute("habitId"),
                    habitDescription: habitsElements[i].getAttribute("habitDescription"),
                    target: habitsElements[i].getAttribute("target"),
                    progressDate: currentDate,
                    isNew: true,
                    numberOfCompletions:0
                }
                addElement(newProgressObject);
                pushProgressArrayToQueue(newProgressObject);
            }
        }
    }
    /* go through all elements, if nothing with today's date, go through all habits and add new element with this habit id*/
}

var launchCharts = function(fullData,habitsArray){
    for ( var i=0;i<habitsArray.length;i++){
        launchChart(fullData,habitsArray[i])
    }

}

var changeTabToProgress = function(){
    document.getElementById("habits-section").style.display = "none";
    document.getElementById("progress-section").style.display = "block";
    document.getElementById("graphs-section").style.display = "none";
}

var changeTabToHabits = function(){
    document.getElementById("habits-section").style.display = "block";
    document.getElementById("progress-section").style.display = "none";
    document.getElementById("graphs-section").style.display = "none";
    document.getElementById('new-description').focus();
}

var changeTabToGraphs = function(){
    document.getElementById("habits-section").style.display = "none";
    document.getElementById("progress-section").style.display = "none";
    document.getElementById("graphs-section").style.display = "block";
}


var launchChart = function(fullData,habitObject){
    var dataToShow = [];
    var baseline = [];

    for ( var i=0; i< fullData.length;i++){
        if (fullData[i].habitId == habitObject.habitId){
            dataToShow.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].numberOfCompletions
            })
            baseline.push({
                x: new Date(fullData[i].progressDate),y:fullData[i].target
            })
        }
    }

		dataToShow.sort(function(a, b){
		return (a.x - b.x)
		});	

    /*<canvas id="myChart"></canvas>*/
    var newCanva = document.createElement("canvas");
    var newCanvaWrapper = document.createElement("div");
    const grapTitle = document.createTextNode('Your progress for:' + habitObject.habitDescription);
    newCanva.setAttribute("id",habitObject.habitId);
    newCanvaWrapper.appendChild(grapTitle);  
    newCanvaWrapper.append(newCanva);

    newCanvaWrapper.setAttribute("class","box canva-wrapper");

    document.getElementById("graph-container").appendChild(newCanvaWrapper);


    var ctx = document.getElementById(habitObject.habitId).getContext('2d');


    let options = {
        responsive: true,
        legend: {
            position: 'bottom',
            display: true
        },
        scales: {
        xAxes: [{type: 'time', time: {parser: 'YYYY-MM-DD', unit: 'day'}}],
        yAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Your progress',
            type: 'line',
            suggestedMin: 0
            }
        }]
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
                        backgroundColor: '#ffecd7',
                        borderColor:'#f19a40',
                        color:'blue',
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
