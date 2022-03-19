var updateProgressOnRadial = function( percentageValue, parameters){

    circleRadius = ( parameters.containerHeight / 2 ) - parameters.strokeWidth;

    var circleDiv = document.getElementById(parameters.suffixForIds+'_background-circle');
    var progressDiv = document.getElementById(parameters.suffixForIds+'_progress-circle');
    var percentageValueDiv = document.getElementById(parameters.suffixForIds+'_percentage-value');
    
    var percentageCircleContainer = document.getElementById(parameters.suffixForIds+'_percentage-circle-container');

    percentageValueDiv.innerHTML = percentageValue + " %";
    
    var textMarginLeft = (parameters.strokeWidth + circleRadius)/1.5 + parameters.textLeftAdjustment;
    percentageValueDiv.style.marginLeft = textMarginLeft.toString()+"px";
    
    progressDiv.style.stroke = parameters.progressColor;
    circleDiv.style.stroke  = parameters.emptyColor;

  
    if (isNaN(percentageValue)) {
        percentageValue = 100; 
    }
    else{
        circleDiv.setAttribute('r',circleRadius);
        progressDiv.setAttribute('r',circleRadius);
        var circonference = Math.PI*circleRadius*2;
    
        if (percentageValue < 0) { percentageValue = 0;}
        if (percentageValue > 100) { percentageValue = 100;}
        
        var emptyPathLength = ((100-percentageValue)/100)*circonference;
        
        progressDiv.setAttribute("stroke-dashoffset", emptyPathLength);


        window.setTimeout(function() {
            progressDiv.style.strokeDashoffset = emptyPathLength;
        }, 50)

        progressDiv.setAttribute("stroke-dasharray", circonference);
        circleDiv.setAttribute("stroke-dasharray", circonference);
    }
}


var createProgressElements = function(parameters){

    var circleRadius = ( parameters.containerHeight / 2 ) - parameters.strokeWidth;

    var anchorDiv = document.getElementById(parameters.anchorDivId);


    var w3uri = 'http://www.w3.org/2000/svg';

    const circleContainer = document.createElement("div");
    circleContainer.setAttribute("id",parameters.suffixForIds+"_percentage-circle-container");
    const svgProgressBar = document.createElementNS(w3uri,'svg');
    svgProgressBar.setAttributeNS(w3uri,"id",parameters.suffixForIds+"_svg-progress-bar");
    svgProgressBar.setAttributeNS(w3uri,"z-index",-1);

    const backgroundCircle = document.createElementNS(w3uri,'circle');
    backgroundCircle.setAttribute("id",parameters.suffixForIds+"_background-circle");                 
    backgroundCircle.setAttribute("stroke-dashoffset","0"); 

    const progressCircle = document.createElementNS(w3uri,'circle');
    progressCircle.setAttribute("id",parameters.suffixForIds+"_progress-circle");
    progressCircle.setAttribute("fill","transparent");                    
    progressCircle.setAttribute("stroke-dashoffset","0"); 

    backgroundCircle.setAttribute("cx", parameters.containerHeight/2);
    backgroundCircle.setAttribute("cy", parameters.containerHeight/2);
    backgroundCircle.setAttribute("stroke-width", parameters.strokeWidth);
    backgroundCircle.setAttribute("fill","white");
    progressCircle.setAttribute("cx", parameters.containerHeight/2);
    progressCircle.setAttribute("cy", parameters.containerHeight/2);
    progressCircle.setAttribute("stroke-width", parameters.strokeWidth);

    const percentageValue = document.createElement("div");
    percentageValue.setAttribute("id",parameters.suffixForIds+"_percentage-value");

    percentageValue.innerHTML = "0 %";

    var textMarginTop = (-1)*(parameters.containerHeight - parameters.strokeWidth - circleRadius + parameters.fontSize/1.9 + parameters.textTopAdjustment);
    var textMarginLeft = (parameters.strokeWidth + circleRadius)/1.5 + parameters.textLeftAdjustment;
  /*  var roundedMarginTop = Math.round(textMarginTop/100)*100;
    var roundedMarginLeft = Math.round(textMarginLeft/100)*100*/
    percentageValue.style.marginTop = textMarginTop.toString()+"px";
    percentageValue.style.marginLeft = textMarginLeft.toString()+"px";
    percentageValue.style.fontSize = parameters.fontSize.toString()+"px";
    percentageValue.style.position = "relative";

    svgProgressBar.setAttribute("height",parameters.containerHeight);
    svgProgressBar.setAttribute("width", parameters.containerHeight);
    svgProgressBar.style.transform = "rotate(-90deg)"

    svgProgressBar.appendChild(backgroundCircle);
    svgProgressBar.appendChild(progressCircle);

    circleContainer.appendChild(svgProgressBar);
    circleContainer.appendChild(percentageValue);

    anchorDiv.appendChild(circleContainer);
}