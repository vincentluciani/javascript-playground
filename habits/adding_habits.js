
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
    currentDiv.getElementsByClassName("percentage-completion")[0].innerHTML = newCompletionPercentage;

    
    if (newCompletionPercentage>=100){
        currentDiv.style.boxShadow="rgb(21 173 25 / 20%) -1px 2px 17px 5px";
    } else if (newCompletionPercentage>=50){
        currentDiv.style.boxShadow="-1px 2px 17px 5px rgb(245 255 157)";
    } else if (newCompletionPercentage<50){
        currentDiv.style.boxShadow="-1px 2px 14px 0px rgb(247 163 163)";
    }

    // if (newCompletionPercentage>=100){
    //     currentDiv.style.background="rgb(76 255 81 / 20%)";
    // } else if (newCompletionPercentage>=50){
    //     currentDiv.style.background="rgb(255 227 143)";
    // } else if (newCompletionPercentage<50){
    //     currentDiv.style.background="rgb(253 171 171)";
    // }

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
    addEmptyProgressOnNewDay();
    changeTabToProgress();
};

var dateFilter = document.getElementById('date-filter');
dateFilter.addEventListener('input', function (evt) {
    applyFilters();
});

var textFilter = document.getElementById('text-filter')
textFilter.addEventListener('input', function (evt) {
    applyFilters();
});

var addHabitElement = function(elementToAdd){
    const newHabitDivision = document.createElement("div");

    newHabitDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newHabitDivision.setAttribute("target", elementToAdd.target);
    newHabitDivision.setAttribute("class", "box habit-setting");
    newHabitDivision.setAttribute("habitId",elementToAdd.habitId);

    const descriptionInput = document.createElement("input");
    descriptionInput.value = elementToAdd.habitDescription;
    descriptionInput.setAttribute("class","habit-description-definition");


    const targetText = document.createTextNode("Daily Target");
    const targetValue = document.createElement("input");
    targetValue.setAttribute("class","habit-target-definition");
    targetValue.setAttribute("type","number");

    targetValue.value = elementToAdd.target;
    newHabitDivision.appendChild(descriptionInput);
    newHabitDivision.appendChild(targetText);
    newHabitDivision.appendChild(targetValue);

    document.getElementById('habits-definition-container').appendChild(newHabitDivision);


}
var addElement = function(elementToAdd){
    const newProgressDivision = document.createElement("div");

    newProgressDivision.setAttribute("id", elementToAdd.id );
    newProgressDivision.setAttribute("habitDescription", elementToAdd.habitDescription);
    newProgressDivision.setAttribute("target", elementToAdd.target);
    newProgressDivision.setAttribute("progressDate", elementToAdd.progressDate );
    newProgressDivision.setAttribute("class", "box habit-update");
    newProgressDivision.setAttribute("isNew",elementToAdd.isNew);
    newProgressDivision.setAttribute("habitId",elementToAdd.habitId);


    const dateDiv = document.createElement("div");

    const habitDescriptionText = document.createTextNode(elementToAdd.habitDescription);
    const targetValue = document.createElement("input");
    const currentProgressText = document.createTextNode("Number of times completed:");
    const currentCompletionText = document.createTextNode("Percentage Completion:");
    const progressInput = document.createElement("input");
    const percentageCompletionInput = document.createElement("div");

    var percentageCompletion = Math.round(elementToAdd.numberOfCompletions * 100 / elementToAdd.target) ;
    
    progressInput.setAttribute("type","number");
    progressInput.setAttribute("class","number-of-completion");
    progressInput.setAttribute("value",elementToAdd.numberOfCompletions);

    /*percentageCompletionInput.setAttribute("type","number");*/
    percentageCompletionInput.setAttribute("class","percentage-completion");
    percentageCompletionInput.innerHTML = percentageCompletion.toString();


    var habitDescriptionContainer = document.createElement("div");
    habitDescriptionContainer.setAttribute("class","habit-description");
    var taskIcon = document.createElement("i");
    taskIcon.setAttribute("class","fa fa-tasks");
    habitDescriptionContainer.appendChild(taskIcon);
    habitDescriptionContainer.appendChild(habitDescriptionText);
    newProgressDivision.appendChild(habitDescriptionContainer);

    var currentProgressContainer = document.createElement("div");

    currentProgressContainer.appendChild(currentProgressText);
    currentProgressContainer.setAttribute("class","progress-container");
    newProgressDivision.appendChild(currentProgressContainer);
    newProgressDivision.appendChild(progressInput);

    var completionTextContainer = document.createElement("div");
    completionTextContainer.setAttribute("class","progress-container");

    completionTextContainer.appendChild(currentCompletionText);
    newProgressDivision.appendChild(completionTextContainer);
    newProgressDivision.appendChild(percentageCompletionInput);

    targetValue.value = elementToAdd.target;

    document.getElementById('habits-container').appendChild(newProgressDivision);
    newProgressDivision.addEventListener('change', function(newProgressDivision) {
        return function(){refreshProgress(newProgressDivision)}
     }(newProgressDivision));

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
    addHabitElement(elementToAdd);

    document.getElementById('new-description').value = null;
    document.getElementById('new-target').value = null;

};

var displayAllElements = function(elementList){
    for (var i=0; i< elementList.length; i++) {
        const newDivision = document.createElement("div");
        document.body.appendChild(newDivision);
    }
};

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
    localStorage.clear();
    for (var i=0; i< progressElements.length  && i < maxForNonLoggedIn; i++){
        var currentOutput = readElement(progressElements[i]);
        window.localStorage.setItem('progress-'+currentOutput.id.toString(), JSON.stringify(currentOutput));
    }
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

    return outputJson;
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
