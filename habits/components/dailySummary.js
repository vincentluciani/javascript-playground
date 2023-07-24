var updateDailyProgress = function(){

    var dailyProgress = getDailyProgress(); 

    var dailyPercentage = Math.round(dailyProgress.fullScore / dailyProgress.numberOfDivs);
    var dailySummaryDiv = document.getElementById("daily-summary");
    var dailySummaryBox = document.getElementById("daily-summary-container");
    var dailyCommentBox = document.getElementById("daily-summary-comment");
    var personalBox = document.getElementById("google-container-progress");

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
    setDivAppearanceBasedOnCompletion(personalBox,dailyPercentage);

}

var getDailyProgress=function(){
    var progressPercentageCompletionDivs = document.getElementsByClassName("percentage-completion");
    currentDate = document.getElementById("date-filter").value;

    var fullScore = 0;
    var numberOfDivs = 0;
    for (const progressPercentageCompletionDiv of progressPercentageCompletionDivs){
        var progressDate = progressPercentageCompletionDiv.getAttribute("progressDate");
        var progressDetailsDiv = progressPercentageCompletionDiv.parentNode;
        var progressDiv = progressDetailsDiv.parentNode
        var status = progressDiv.getAttribute("status")?progressDiv.getAttribute("status"):"active";
        if (progressDate==currentDate){
            if (status=="active"){
                var currentScore = parseInt(progressPercentageCompletionDiv.innerHTML);
                currentScore = (currentScore > 100) ? 100 : currentScore;
                fullScore += currentScore;
                numberOfDivs++;
            }
        }
    }

    return {fullScore,numberOfDivs};
}
