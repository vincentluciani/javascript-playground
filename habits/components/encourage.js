

var encourageIfPassedTarget = function(result, target){

        if ( result == target){
            document.getElementById("positive-message").style.display="flex";
            document.getElementById("positive-message-title").innerHTML = buildCongratulationMessage('en_US')+" :)";
        }
}

var closeMessage = function(){
    document.getElementById("positive-message").style.display="none";
}

var buildCongratulationMessage = function (locale){
    var listOfWonderfulWords = translations['en_US'].amazing;

    var randomNumber = getRandomNumber(0, listOfWonderfulWords.length - 1);

    return listOfWonderfulWords[randomNumber];
}