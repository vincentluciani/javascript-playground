var pushProgressToQueue = function(divToAnalyze) {

    var progressArray = readElement(divToAnalyze);

    var elementToAdd = {
        'id': 'progress-'+progressArray.id,
        'value': JSON.stringify(progressArray)
    }

    executePushToQueue(elementToAdd);

}

var pushProgressArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': 'progress-'+objectToPush.id,
        'value': JSON.stringify(objectToPush)
    }

    executePushToQueue(elementToAdd);

}

var executePushToQueue = function(newObject){

    var lastElement = updateQueue.pop();

    if (lastElement != null &&  lastElement.id != newObject.id) {
        updateQueue.push(lastElement);
    }

    updateQueue.push(newObject);
    console.log(updateQueue);

}