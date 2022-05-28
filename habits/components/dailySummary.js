var updateDailyProgress = function(){

    var dailyProgress = getDailyProgress(); 

    var dailyPercentage = Math.round(dailyProgress.fullScore / dailyProgress.numberOfDivs);
    var dailySummaryDiv = document.getElementById("daily-summary");
    var dailySummaryBox = document.getElementById("daily-summary-container");
    var dailyCommentBox = document.getElementById("daily-summary-comment");

    if (dailyPercentage && dailyPercentage>0){
        if (dailyPercentage >= 100){
            radialProgressParameters.progressColor = "rgb(167, 211, 162)";
            radialProgressParameters.emptyColor = "rgb(193 236 205)";
            dailyCommentBox.innerHTML="Awesome Achievement !"
        } else if ( dailyPercentage >= 50 ){
            radialProgressParameters.progressColor = "rgb(238 230 168)";
            radialProgressParameters.emptyColor = "rgb(228 228 228)";
            dailyCommentBox.innerHTML="You are almost there !"
        } else {
            radialProgressParameters.progressColor = "#b657af";
            radialProgressParameters.emptyColor = "rgb(255 217 235)";
            dailyCommentBox.innerHTML="Good Start<br>Keep it up !"
        }

        if ( dailyPercentage >= 100){
            radialProgressParameters.textLeftAdjustment = -9;
        }
        else if ( dailyPercentage >= 10){
            radialProgressParameters.textLeftAdjustment = -5;
        } else {
            radialProgressParameters.textLeftAdjustment = -2;
        }

       updateProgressOnRadial(dailyPercentage, radialProgressParameters);

        dailySummaryBox.style.display = "block";
    } else {
        dailyPercentage = 0;
        dailySummaryBox.style.display = "none";
    }
    setDivAppearanceBasedOnCompletion(dailySummaryDiv.parentNode,dailyPercentage);

}

var getDailyProgress=function(){
    var progressDivs = document.getElementsByClassName("percentage-completion");
    currentDate = document.getElementById("date-filter").value;

    var fullScore = 0;
    var numberOfDivs = 0;
    for (const progressDiv of progressDivs){
        var progressDate = progressDiv.getAttribute("progressDate");
        if (progressDate==currentDate){
            var currentScore = parseInt(progressDiv.innerHTML);
            currentScore = (currentScore > 100) ? 100 : currentScore;
            fullScore += currentScore;
            numberOfDivs++;
        }
    }

    return {fullScore,numberOfDivs};
}
