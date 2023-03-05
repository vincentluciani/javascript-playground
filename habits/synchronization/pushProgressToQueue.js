var pushProgressToQueue = function(divToAnalyze) {

    var progressArray = progressDOMToJson(divToAnalyze);

    encourageIfPassedTarget(progressArray.numberOfCompletions, progressArray.target, progressArray.isCritical);

    var elementToAdd = {
        'id': 'progress-'+progressArray.progressId,
        'value': JSON.stringify(progressArray)
    }

    executePushToQueue(updateQueue,elementToAdd);
    executePushToQueue(updateAPIQueue,elementToAdd);

}

var pushProgressArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': 'progress-'+objectToPush.progressId,
        'value': JSON.stringify(objectToPush)
    }

    executePushToQueue(updateQueue,elementToAdd);
    executePushToQueue(updateAPIQueue,elementToAdd);

}

var pushHabitArrayToQueue = function(objectToPush){

    var elementToAdd = {
        'id': 'habit-'+objectToPush.habitId,
        'value': JSON.stringify(objectToPush)
    }

    executePushToQueue(updateQueue,elementToAdd);
    executePushToQueue(updateAPIQueue,elementToAdd);

}


var executePushToQueue = function(queue,newObject){
    console.log("pushing to queue:");
    console.log(newObject);
    var sizeBeforePush = queue.length;

    var lastElement = queue.pop();

    if (lastElement != null &&  lastElement.id != newObject.id) {
        console.log("putting back previous");
        queue.push(lastElement);
    } else {
        console.log("did not put back previous:");
        console.log(lastElement);
    }

    queue.push(newObject);
    
    console.log(queue);
    console.log("size before push:"+sizeBeforePush.toString()+" size after push:"+ queue.length.toString())
}

var pushItemInQueue = function(newItem){
    updateQueue.push(newItem);
}

