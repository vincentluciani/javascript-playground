const express = require('express');
const answerProvider = require('./helpers/answerProvider')
const getData = require('./helpers/asyncFunctions/getDataFromFileAsync')

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log("request received");
    let firstAnswer = ''
    let secondAnswer = ''
    try {
        firstAnswer = await answerProvider.giveAnswer();
    }
    catch (error) {
        console.log("error getting an answer")
        res.end("error getting an answer")
    }

    res.end(firstAnswer)

    // This stuff is not working ( try catch ), It seems try catch is ok in function
    // called by router, but not in the router itself.

    // try {
    //     const secondAnswer = await getData.getDataFromFileAsync();

    // }
    // catch (error) {
    //     console.log("error reading file")
    //     res.send("error reading file")
    // }
    // let valueToReturn = firstAnswer + "-" + secondAnswer;
    // res.end(valueToReturn)

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



