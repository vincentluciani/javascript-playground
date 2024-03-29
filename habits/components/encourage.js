

var giveSuperKudos = function(title,description){
    document.getElementById("super-positive-message").style.display="flex";
    document.getElementById("super-positive-message-title").innerHTML = title;
    document.getElementById("super-positive-message-subtitle").innerHTML = description ;
}

var encourageIfPassedTarget = function(result, target, isCritical){

    if ( result == target && isCritical && isCritical == "true"){
        playCheers();
        giveSuperKudos("Special kudos to you :)","You mastered a critical habit today!");
    } else if (result == target){
        giveCheers();
    }

}

var giveCheers = function(){

    playCheers();
    var title = buildCongratulationTitle('en_US')+" :)";
    var subTitle = buildCongratulationSubTitle('en_US') ;
    document.getElementById("positive-message").style.display="flex";
    document.getElementById("positive-message-title").innerHTML = title;
    document.getElementById("positive-message-subtitle").innerHTML = subTitle;
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