const https = require('https');
const querystring = require('querystring');

exports.getRecordDetails = (res,authorizationToken) => {
    
    /* careful authorization is without .dam, here we have .dam before .aprimo in the hostname */
            const options = {
                hostname: 'schneiderelectric-sb2.dam.aprimo.com',
                port: 443,
                path: '/api/core/record/614c068cab7c4603bbddae8200d2722a/fields',
                method: 'GET',
                headers: {
                    'API-version': '1',
                    'Authorization': 'Bearer '+ authorizationToken,
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'User-Agent':'POC_sso_aprimo',
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
                    const outputText = resultData.toString('utf8');
                    const resultDataJSON = JSON.parse(resultData);
                    res.json({ 'result': resultDataJSON });
                 
                })

              })
              
              reqSent.on('error', error => {
                console.error(error)
                res.json({ 'error': error });
                
              })
              
              reqSent.end()

            

}