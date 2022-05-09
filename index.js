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

app.get('/get-habits', function (req, res, next) {

    userId = req.query.user

    testOutput = [
        {
            "id": 1,
            "title": "learn a language",
            "progress": 50,
            "schedule": {
                "monday": "1"
            },
            "dailyOccurence": 4,
            "userId": userId
        },
        {
            "id": 2,
            "title": "drink water",
            "progress": 12,
            "schedule": {
                "thursday": "1",
                "saturday": "2"
            },
            "dailyOccurence": 2,
            "userId": userId
        }]


    res.json(testOutput);


})

app.get('/get-habit-progress', function (req, res, next) {

    userId = req.query.user

    testOutput = [
        {id:1,habitId:1,habitDescription:"test1",target:20,progressDate:"2022-01-05",numberOfCompletions:2},
        {id:2,habitId:2,habitDescription:"test2",target:20,progressDate:"2022-01-05",numberOfCompletions:20},
        {id:3,habitId:3,habitDescription:"test3",target:25,progressDate:"2022-01-05",numberOfCompletions:20},
        {id:4,habitId:1,habitDescription:"test1",target:20,progressDate:"2022-01-06",numberOfCompletions:20},
        {id:5,habitId:2,habitDescription:"test2",target:20,progressDate:"2022-01-06",numberOfCompletions:4},
        {id:6,habitId:3,habitDescription:"test3",target:25,progressDate:"2022-01-06",numberOfCompletions:20},
        {id:4,habitId:1,habitDescription:"test4",target:20,progressDate:"2022-01-07",numberOfCompletions:20},
        {id:5,habitId:2,habitDescription:"test5",target:20,progressDate:"2022-01-07",numberOfCompletions:4},
        {id:6,habitId:3,habitDescription:"test6",target:25,progressDate:"2022-01-07",numberOfCompletions:20}
    ]

    res.json(testOutput);


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
    
    req.on('data', chunk => {
        data += chunk;
    })
    
    req.on('end', () => {

    console.log(data);
        let authorizationCode = data.replace(/.*auth-code=(.*?)&.*/g, '$1'); 
        let recordIds = data.replace(/.*recordIds=(.*?)&.*/g, '$1'); 
        res.json({ "url": "http://localhost:5000/authorize?authorization_code="+authorizationCode+"&records="+recordIds })

      
    }) 

})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})

