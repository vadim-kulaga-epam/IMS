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
    }, function (code, message) {
        errorCallback(code, message, response);
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
    }, function (code, message) {
        errorCallback(code,message, response);
    });
};

exports.authorization = function (request, response) {
    var login = request.body.login;
    var password = request.body.password;
    mongodb.user.getByLogin(login, function (results, dbCloseCallback) {
        if (password === results.password) {
            logger.info("User logined!");
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(results));
            response.end();
        } else {
            logger.warn("Invalid password!");
            errorCallback(403, "Invalid password!", response);
        }
        dbCloseCallback();
    }, function (code, message) {
        errorCallback(code, message, response);       
    });
}

var errorCallback = function(code, message, response) {
    response.writeHead(code, {"Content-Type": "application/json"});
    response.write(message);
    response.end();
};
