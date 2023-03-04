var readQueueStorage = function() {

    while (updateQueue.length > 0) {
        var elementToProcess = updateQueue.shift();
        console.log("reading from queue");
        console.log(elementToProcess);
        
        putInStorage(elementToProcess.id, elementToProcess.value); 

        /* todo send the element to the backend using an API call */ 
        var currentDate = new Date();
        document.getElementById('last-saved-information').innerHTML = "Last saved: "+currentDate.toLocaleTimeString();
        document.getElementById('last-saved-information-habits').innerHTML = "Last saved: "+currentDate.toLocaleTimeString(); 
    }
    
}

var readQueueAPI = function() {

  while (updateAPIQueue.length > 0) {
      var elementToProcess = updateAPIQueue.shift();
      console.log("reading from API queue");
      console.log(elementToProcess);
      
      var response = setItemWithAPI(elementToProcess.id, elementToProcess.value); 
      
      if (response == null){
        updateAPIQueue.unshift(elementToProcess);
        break;
      }
   }
  
}

var putInStorage = function(keyName,value){
  try {
    window.localStorage.setItem(keyName,  JSON.stringify(value));
  } catch (error) {
    console.error(error);
    console.error("Problem writing progress:"+keyName);
    console.error(currentOutput);
  }
}
