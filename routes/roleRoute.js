var mongodb = require('../db');
var logger = require("../logger");

exports.getAll = function (request, response) {
    mongodb.role.getAll(function (results, dbCloseCallback) {
        logger.debug("results: " + JSON.stringify(results, null, 4));
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(results));
        response.end();
        dbCloseCallback();
    });
};



