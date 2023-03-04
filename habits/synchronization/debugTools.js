
var resetDebugging = function(){

    document.getElementById("debugging-text").innerHTML = "";

}

var debugWrite = function(text){
    document.getElementById("debugging-text").innerHTML += text + "<br>";
}

var getMemoryDetails = function(){

    for (var i = 0; i < localStorage.length; i++){
        var currentKey = localStorage.key(i);
        if ( currentKey.indexOf("habit") >= 0){
            document.getElementById("memory-habit").innerHTML += window.localStorage.getItem(currentKey);
        } else if (currentKey.indexOf("progress") >= 0)  {
            document.getElementById("memory-progress").innerHTML += window.localStorage.getItem(currentKey);
        }
    }

}