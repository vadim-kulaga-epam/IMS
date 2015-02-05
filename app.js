var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    
var router = require("./router"),
    routesHandler = require("./routesHandler")
    

var server = http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd() + '/public', uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      
      router(routesHandler.handle, uri);
  
      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
   });
});

server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});
wss.on('connection', function(ws) {
  console.log("New connection");
  ws.on('message', function(message) {
    ws.send("Received: " + message);
  });
  ws.send('Welcome!');
});

console.log("Listening to " + ipaddress + ":" + port + "...");

// var express = require('express')

// // Config
// var DEV_PORT = 3000
// var PROD_PORT = 80
//
// var app = express()
//
// // Actually, it should be a build directory, e.g. .tmp
// app.use('/', express.static(__dirname + '/public'))
//
// // Environment-dependent configuration
// var env = process.env.NODE_ENV || 'development'
// if (env == 'production') {
//   var PORT = PROD_PORT
// } else {
//   var PORT = DEV_PORT
// }
//
// // Run server
// app.listen(PORT, function() {
//   console.info('Server is listening on port ' + PORT)
// })

