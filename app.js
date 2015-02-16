var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var WebSocketServer = require('ws').Server

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    express = require('express');

var routes = require("./routes");
var logger = require("./logger");

var app = express();

app.set('port', port);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/supplies', routes.supplies.getAll);
app.get('/supplies/category/:category', routes.supplies.getByCategory);
app.get('/category', routes.category.getAll);

app.get('/user', routes.user.getAll);
app.get('/user/:id', routes.user.getOneById);
app.get('/user/login/:login', routes.user.getIdByLogin);
app.post('/user',routes.user.authorization);
app.put('/user',routes.user.registration);

app.get('/role', routes.role.getAll);

var server = http.createServer(app);

server.listen(port, ipaddress, function () {
    logger.info('%s Server is listening on port %d', new Date(), port);
});

wss = new WebSocketServer({
    server: server,
    autoAcceptConnections: false
});

wss.on('connection', function (ws) {
    logger.info("New connection");
    ws.on('message', function (message) {
        ws.send("Received: " + message);
    });
    ws.send('Welcome!');
});

logger.info("Listening to %s:%d...", ipaddress, port);