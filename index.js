var express = require('express')
var cors = require('cors')
var app = express()
const https = require('https')
const getAprimoToken = require('./getAprimoToken.js');
const getRecordDetails = require('./getRecordDetails.js');
const waitingFunction = require('./helpers/asyncFunctions/waitingFunction.js')
var corsOptions = {
    origin: 'https://schneiderelectric-sb2.dam.aprimo.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

app.get('/api', function (req, res, next) {
    res.json({ msg: 'this is a test - GET' })
})


app.get('/waitforasync', function (req, res, next) {

    waitingFunction.giveTextAfterWaiting("hello world").then(value => {
        res.json({ msg: value }); 
      }, reason => {
        res.json({ msg: reason }); 
      })
    });

app.get('/aprimo-poc', function (req, res, next) {

    res.writeHead(301, {
        Location: `https://schneiderelectric-sb2.aprimo.com/login/connect/authorize?response_type=code&state=12345&client_id=A505EGPN-A505&redirect_uri=http://localhost:5000/aprimo-sso&scope=api`
      }).end();
})

app.post('/api', function (req, res, next) {
    res.json({ msg: 'this is a test - GET' })
})



app.get('/', function (req, res, next) {



    res.json({ msg: 'this is a test - GET' })
})

app.post('/aprimo-sso', function (req, res, next) {


    res.json({ msg: 'this is a test with sso - POST' })
})

app.get('/aprimo-sso', function (req, res, next) {

    const authorizationCode = req.query.code;

    const aprimoTokenResult = getAprimoToken.getAprimoToken(res,authorizationCode,getRecordDetails.getRecordDetails);

})



app.get('/authorize', function (req, res, next) {

    let authorizationCode = req.query.authorization_code;

    /*authorization-code:  a string you get by base64 encoding the concatenation of the client id and the secret, separated by a colon: [ClientId]:[Secret] */

    const options = {
        hostname: 'schneiderelectric-sb2.aprimo.com',
        port: 443,
        path: '/api/oauth/create-token',
        method: 'POST',
        headers: {
            'API-version': '1',
            'authorization-code': authorizationCode,
            'authorization': 'Basic MzY4WEQyUEUtMzY4WDpKcTdLZlc5cExVdUR2eFI4d3lnMA==',
            'client-id': '368XD2PE-368X'
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
            res.json({ "msg": resultData })
        })
    }
    )

    reqSent.on('error', error => {
        console.error(error)
    })

    reqSent.end();


})

app.post('/', function (req, res, next) {

    let data = '';
/* get the payload from the post request */
    req.on('data', chunk => {
        data += chunk;
    })
    
    req.on('end', () => {

        /* send an url with the authorization code given by the payload */
    console.log(data);
        let authorizationCode = data.replace(/.*auth-code=(.*?)&.*/g, '$1'); 
        let recordIds = data.replace(/.*recordIds=(.*?)&.*/g, '$1'); 

        // option with url authorization:
        //res.json({ "url": "http://localhost:5000/authorize?authorization_code="+authorizationCode+"&records="+recordIds })
        // option with simple message
        res.json({ "msg": "we received your request for " + recordIds });
      
    }) 

})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})

