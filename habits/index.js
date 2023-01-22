var express = require('express')
var cors = require('cors')
var app = express()
var url = require("url");
var path = require("path");
const https = require('https');
let options = {}
var qs = require('querystring');

fs = require('fs')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");



var keyFile = fs.readFileSync('C:\\software\\certificate\\vince.com.key');
var certFile = fs.readFileSync('C:\\software\\certificate\\vince.com.crt');

options = {
    key: keyFile,
    cert: certFile
};

let httpServer = https.createServer(options,app);

app.use(cors())

app.get('/uat', function (req, res, next) {
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

//app.get('/^\/(components|language|libraries|synchronization)\/.+$/', function (req, res, next) {
app.get('/:directory(components|language|libraries|synchronization)/:component.:extension', function (req, res, next) {

    fs.readFile(req.params.directory+'/'+req.params.component+"."+req.params.extension, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        let componentType = "application/javascript"
        if (req.params.extension === "css"){
          componentType = "text/css"
        }
        res.writeHead(200, {'Content-Type': componentType});
        res.write(data);
        res.end();
      });

    
})

app.post('/', function(req, res, next) {

  var body = '';

  req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
          req.connection.destroy();
  });

  req.on('end', function () {
      var post = qs.parse(body);
      // use post['blah'], etc.
      console.log(post['credential'])

      async function verify(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "YOUR_GOOGLE_CLIENT_ID",  
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify(post['credential']).catch(console.error);

  });

})

app.get('/habits_main.js', function (req, res, next) {

  fs.readFile('habits_main.js', 'utf8', function (err,data) {
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  
})

app.get('/habits_main_transformed.js', function (req, res, next) {

  fs.readFile('habits_main_transformed.js', 'utf8', function (err,data) {
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

      if (err) {
        return console.log(err);
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

  
})


app.get('/', function (req, res, next) {
  /*var pathname = url.parse(req.url).pathname;
  var isImage = 0, contentType, fileToLoad;
  var extension = pathname.split('.').pop();
  var file = "." + pathname;
  var dirs = pathname.split('/');*/
    fs.readFile('adding_habits_transformed.html', 'utf8', function (err,data) {
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

httpServer.listen(3000,() => {
  console.log(`Server started on port 3000`);
});



