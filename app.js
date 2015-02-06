var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    express = require('express');
    
var router = require("./router"),
    routes = require("./routesHandler")
    
var app = express();    

app.set('port', port );
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/test', routes.supplies);

var server = http.createServer(app);

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

