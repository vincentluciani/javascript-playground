

var encourageIfPassedTarget = function(result, target, isCritical){

        if ( result == target && isCritical && isCritical == "true"){
            document.getElementById("super-positive-message").style.display="flex";
            document.getElementById("super-positive-message-title").innerHTML = "Special kudos to you :)";
            document.getElementById("super-positive-message-subtitle").innerHTML = "You manage to complete a critical habit !" ;
    
        } else if (result == target){
            document.getElementById("positive-message").style.display="flex";
            document.getElementById("positive-message-title").innerHTML = buildCongratulationTitle('en_US')+" :)";
            document.getElementById("positive-message-subtitle").innerHTML = buildCongratulationSubTitle('en_US');
        }

}

 var closeMessage = function(){
    document.getElementById("positive-message").style.display="none";
    document.getElementById("super-positive-message").style.display="none";
}

var buildCongratulationTitle = function (locale){
    var listOfWonderfulWords = translations[locale].amazing;

    var randomNumber = getRandomNumber(0, listOfWonderfulWords.length - 1);

    return listOfWonderfulWords[randomNumber];
}

var buildCongratulationSubTitle = function (locale){
    var listOfEncouragements = translations[locale].encouraging;

    var randomNumber = getRandomNumber(0, listOfEncouragements.length - 1);

    return listOfEncouragements[randomNumber];
}