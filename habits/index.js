var express = require('express')
var cors = require('cors')
var app = express()
var url = require("url");
var path = require("path");

fs = require('fs')

app.use(cors())

app.get('/', function (req, res, next) {
  /*var pathname = url.parse(req.url).pathname;
  var isImage = 0, contentType, fileToLoad;
  var extension = pathname.split('.').pop();
  var file = "." + pathname;
  var dirs = pathname.split('/');*/
    fs.readFile('output/index.html', 'utf8', function (err,data) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    
})


app.get('/get-habit-progress-journal', function (req, res, next) {

    fs.readFile('test/habits.json', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(data);
        //res.json(data);
        res.end();
      });
      
      
})

app.get('/index.html', function (req, res, next) {

    fs.readFile('output/index.html', 'utf8', function (err,data) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    
})


app.get('/manifest.json', function (req, res, next) {

  fs.readFile('output/manifest.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  
})

app.get('/getItemByKey', function (req, res, next) {
  var data = '{"id":"164655054444102","habitId":"16422714834470","habitDescription":"real push ups ","target":20,"progressDate":"2022-03-06","isNew":"true","isNegative":"undefined","numberOfCompletions":25}';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
 
})

app.get('/removeItemByKey', function (req, res, next) {
  var data = '{"msg":"success"}';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
 
})

app.get('/setItemValue', function (req, res, next) {
  var data = '{"msg":"success"}';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
 
})

app.get('/updateParamInItem', function (req, res, next) {
  var data = '{"msg":"success"}';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
 
})



app.get('/components/full.css', function (req, res, next) {

  fs.readFile('components/full.css', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });

  
})

app.get('/output/bundle-min.js', function (req, res, next) {

  fs.readFile('output/bundle-min.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  
})

app.get('/poc_pwa_test.html', function (req, res, next) {

  fs.readFile('poc_pwa_test.html', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  
})


app.get('/pwa-icon-256.png', function (req, res, next) {

  var fileToLoad  = fs.readFileSync('output/pwa-icon-256.png')
     
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(fileToLoad, 'binary');
  /* https://stackoverflow.com/questions/21235696/display-images-in-html-nodejs*/
})


app.get('/sw-min.js', function (req, res, next) {

  fs.readFile('output/sw-min.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  
})


app.get('/pwa-icon-512.png', function (req, res, next) {

  var fileToLoad  = fs.readFileSync('output/pwa-icon-512.png')
     
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(fileToLoad, 'binary');
  /* https://stackoverflow.com/questions/21235696/display-images-in-html-nodejs*/
})


app.get('/poc_pwa.html', function (req, res, next) {

  fs.readFile('poc_pwa.html', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });

  
})


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})


