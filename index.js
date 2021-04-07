const express = require('express');
const answerProvider = require('./helpers/answerProvider')

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log("request received")
    answerProvider.giveAnswer().then((value) => { res.end(value); console.log("request received") });
    console.log("next action")
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



