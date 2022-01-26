var readQueueProgress = function() {
    while (updateQueue.length > 0) {
        var elementToProcess = updateQueue.shift();
        console.log("reading from queue");
        console.log(elementToProcess);

        try {
            window.localStorage.setItem(elementToProcess.id, elementToProcess.value);
          } catch (error) {
            console.error(error);
            console.error("Problem writing progress:"+elementToProcess.id.toString());
            console.error(currentOutput);
            /*updateQueue.unshift(elementToProcess);*/
          }
    }
}