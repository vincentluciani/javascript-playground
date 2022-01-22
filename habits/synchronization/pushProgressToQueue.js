var pushProgressToQueue = function(divToAnalyze) {

    var progressArray = readElement(divToAnalyze);

    var elementToAdd = {
        'id': progressArray.id,
        'value': progressArray
    }

    executePushToQueue(elementToAdd);

}

var pushProgressArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': objectToPush.id,
        'value': objectToPush
    }

    executePushToQueue(elementToAdd);

}

var executePushToQueue = function(newObject){

    var lastElement = updateQueue.pop();

    if (lastElement != null &&  lastElement.id != newObject.id) {
        updateQueue.push(lastElement);
    }

    updateQueue.push(newObject);


}