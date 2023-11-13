var buildGraphBox = function(unitPerMonth,unitAccumulation,completionAccumulation,habitObject,dataToShow){

    var streaksWrapper = document.createElement("div");

    const grapTitleStreaks = document.createTextNode(habitObject.habitDescription);
    const grapTitleDivStreaks = document.createElement("div");

    var graphIconStreaks = document.createElement("div");
    graphIconStreaks.setAttribute("class","task-icon-container");
    graphIconStreaks.innerHTML = graphIconSmall;

    /*var graphIconStreaks = document.createElement("i");
    graphIconStreaks.setAttribute("class","fa fa-bar-chart");*/

    const streaksTitleDiv = document.createElement("div");
    streaksTitleDiv.innerHTML = "Number of streaks: "+ completionAccumulation.toString();
    streaksTitleDiv.setAttribute("class","subtitle");

    const accumulationTitleDiv = document.createElement("div");
    accumulationTitleDiv.innerHTML = "Number of units: "+ unitAccumulation.toString()+" ("+unitPerMonth+" per month)";
    accumulationTitleDiv.setAttribute("class","subtitle");

    grapTitleDivStreaks.setAttribute("class","graph-title");
    grapTitleDivStreaks.appendChild(graphIconStreaks);
    grapTitleDivStreaks.appendChild(grapTitleStreaks);

    const graphTitle = document.createElement("div");
    graphTitle.innerHTML = "Graph:";
    graphTitle.setAttribute("class","subtitle");

    streaksWrapper.appendChild(grapTitleDivStreaks);
    streaksWrapper.setAttribute("id","streaks-"+habitObject.habitId);
    streaksWrapper.appendChild(streaksTitleDiv);
    streaksWrapper.appendChild(accumulationTitleDiv);
    streaksWrapper.appendChild(graphTitle); 

    var newCanva = document.createElement("canvas");
    newCanva.setAttribute("id","graph-"+habitObject.habitId);

    streaksWrapper.append(newCanva);

    streaksWrapper.setAttribute("class","box canva-wrapper streak-box");


    if (completionAccumulation >= 10){
        streaksWrapper.style.background="#daffd9";
        /*streaksWrapper.style.border="1px solid rgb(167 211 162)"*/
    } else if (completionAccumulation >=5 ) {
        streaksWrapper.style.background="rgb(255 252 238)";
        /*streaksWrapper.style.border="1px solid rgb(246 223 35)"*/
    } else {
        streaksWrapper.style.background="white";
    }

    document.getElementById("streaks-container").appendChild(streaksWrapper);

    var ctx = document.getElementById("graph-"+habitObject.habitId).getContext('2d');


    let options = {
        responsive: true,
        legend: {
            position: 'bottom',
            display: false
        },
        scales: {
        xAxes: [{type: 'time', time: {parser: 'MMM-DD', unit: 'day',displayFormats: {
            'day': 'MMM DD'
          }}}],
        yAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Progress',
            type: 'line',
            suggestedMin: 0,
            beginAtZero: true
            }
        }]
    },
    };

    var graphBackgroundColor,graphColor;

    if (completionAccumulation >= 10){
        graphBackgroundColor = "#b5f7b1";
        graphColor = "#3ce132";
    } else if (completionAccumulation >=5 ) {
        graphBackgroundColor = "rgb(255 249 202)";
        graphColor = "rgb(235 209 0)";
    } else {
        graphBackgroundColor = "rgb(224 224 224)";
        graphColor = "rgb(174 174 174)";
    }
    let chartData = {
    datasets: [
        {
            label: 'Your daily score',
            data: dataToShow,
            backgroundColor: graphBackgroundColor,
            borderColor: graphColor,
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

var loadScriptForGraphs = function(callback){

    /* var chartMinLoad = loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js",callback);
     loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",chartMinLoad);*/
 
   /*  loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js").then(value => {
         console.log(value);
         loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js");
       }, reason => {
         console.log(reason );
       }).then(value => {
         console.log(value);
         callback();
       }, reason => {
         console.log(reason );
       });*/
       /*loadScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js")
       .then(loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"))
       .catch((error) => {
         console.error(error);
       })
       .then(callback())
       .catch((error) => {
         console.error(error);
       });*/
       loadScript("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js")
       .catch((error) => {
        console.error(error);
      })
      .then(waitForChartLoaded())
      .catch((error) => {
        console.error(error);
      })
      .then(callback())
      .catch((error) => {
        console.error(error);
      });
 }

var waitForChartLoaded = async function(){
  return new Promise(
    function (resolve, reject) {
      checkIfChartLoaded(resolve, reject,0);
    }
  );
}

var checkIfChartLoaded = function(resolve, reject,totalWaitingTime){
  var timeIncrement = 50;
  if(typeof Chart !== "undefined"){
    resolve('loaded');
  } else if (totalWaitingTime > 3000){
    reject('timeout waiting for Chart');
  }
  else{
      totalWaitingTime+=timeIncrement;
      setTimeout(checkIfChartLoaded, 50,resolve,reject,totalWaitingTime);
  }
}

