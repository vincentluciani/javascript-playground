var express = require('express')
var app = express()


fs = require('fs')



app.get('/', function (req, res, next) {

    fs.readFile('adding_habits.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    
})

app.get('/output/bundle-min.js', function (req, res, next) {

    fs.readFile('output/bundle-min.js', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    
})
app.get('/', function (req, res, next) {

    fs.readFile('adding_habits.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    
})






app.listen(5000, function () {
    console.log('Web server listening on port 5000')
})

