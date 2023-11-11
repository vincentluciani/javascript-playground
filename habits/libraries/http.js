var APICall = async function(parameters){
	
    return new Promise(
        function (resolve, reject) {
        
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    if (typeof xhttp.responseText === 'string' || xhttp.responseText instanceof String){
                        resolve(JSON.parse(xhttp.responseText));
                    }
                    else {
                        resolve(xhttp.responseText);
                    }
                } else if (xhttp.readyState == 4 && xhttp.status != 200){
                    reject(xhttp.statusText);
                }
            };
            xhttp.open(parameters.method, parameters.url, true);
            xhttp.send();

        }
    );

	
}


var fetchPost = async function(relativePath,payload) {

  var url=`https://www.vince.com/api/discipline/${relativePath}`;
        
  var objectToSend = {
      method: "POST",
      headers:{'Content-Type': 'application/json'}
  }

  if (payload != ''){
    objectToSend['body'] = JSON.stringify(payload);
  }

  try {
    response = await fetch
    (url,objectToSend);
  } catch (e) {
      console.log('could not connect to the server');
      console.log(e);
      return false;
  }
  if (response.status == '200'){
      var apiResponse = await response.json();
      return apiResponse;
  } else {
      console.log('status of the api call:'+response.status);
      return false;
  }

}
/*

fetch("/post/data/here", {
  method: "POST",
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify(data)
})

fetch(url)

const myRequest = new Request('flowers.jpg', {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
});

fetch(myRequest)
  .then(response => response.blob())
  .then(myBlob => {
    myImage.src = URL.createObjectURL(myBlob);
  });



  async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
*/