var APICall = async function(parameters){
	
    return new Promise(
        function (resolve, reject) {
        
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    resolve(JSON.parse(xhttp.responseText));
                } else if (xhttp.readyState == 4 && xhttp.status != 200){
                    reject(xhttp.statusText);
                }
            };
            xhttp.open(parameters.method, parameters.url, true);
            xhttp.send();

        }
    );

	
}