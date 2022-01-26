

var encourageIfPassedTarget = function(result, target){

        if ( result >= target){
            document.getElementById("positive-message").style.display="flex";
        }
}

var closeMessage = function(){
    document.getElementById("positive-message").style.display="none";
}