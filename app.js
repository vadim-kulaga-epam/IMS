var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    express = require('express');

var routes = require("./routes")

var app = express();

app.set('port', port);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/test', routes.supplies);
app.get('/supplies', routes.supplies);
app.get('/supplies/:category', routes.supplies);

var server = http.createServer(app);

server.listen(port, ipaddress, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});

wss.on('connection', function (ws) {
    console.log("New connection");
    ws.on('message', function (message) {
        ws.send("Received: " + message);
    });
    ws.send('Welcome!');
});

console.log("Listening to " + ipaddress + ":" + port + "...");
