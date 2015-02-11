var mongodb = require('../db');
var logger = require("../logger");

exports.getAll = function (request, response) {
    mongodb.user.getAll(function (results, dbCloseCallback) {
        logger.debug("results: " + JSON.stringify(results, null, 4));
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(results));
        response.end();
        dbCloseCallback();
    });
};

exports.getOneById = function (request, response) {
    var id = request.param('id');
    mongodb.user.getById(id, function (results, dbCloseCallback) {
        logger.debug("results: " + JSON.stringify(results, null, 4));
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(results));
        response.end();        
        dbCloseCallback();
    });
};

exports.getOneByLogin = function (request, response) {
    var login = request.param('login');
    mongodb.user.getByLogin(login, function (results, dbCloseCallback) {
        logger.debug("results: " + JSON.stringify(results, null, 4));
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(results));
        response.end();        
        dbCloseCallback();
    });
};
