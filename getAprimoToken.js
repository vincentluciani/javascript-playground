const https = require('https');
const querystring = require('querystring');

exports.getAprimoToken = (res,authorizationCode,myCallback) => {
    
            var postData = querystring.stringify({
                'grant_type': 'authorization_code',
                'client_id': 'A505EGPN-A505',
                'code': authorizationCode,
                'redirect_uri':'http://localhost:5000/aprimo-sso',
                'client_secret': 'vincent123'
            });
            const options = {
                hostname: 'schneiderelectric-sb2.aprimo.com',
                port: 443,
                path: '/login/connect/token',
                method: 'POST',
                headers: {
                    'API-version': '1',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            }
        
            const reqSent = https.request(options, result => {
                console.log(`statusCode: ${result.statusCode}`)
        
                let resultData = '';
                result.on('data', chunk => {
                    resultData += chunk;
                })
                result.on('end', () => {
                    console.log(resultData);
                    const resultDataJSON = JSON.parse(resultData);
                    myCallback(res,resultDataJSON.access_token);
                 
                })
            }
            )
        
            reqSent.on('error', error => {
                console.error(error)
                myCallback(res,"");
            })

            reqSent.write(postData);
            reqSent.end();
        

}