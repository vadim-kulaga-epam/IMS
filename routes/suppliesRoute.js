var mongodb = require('../db');
var logger = require("../logger");

exports.getAll = function (request, response) {
    mongodb.supplies.getAll(function (results, dbCloseCallback) {
        handleResults(response, results);
        dbCloseCallback();
    });
};

exports.getByCategory = function (request, response) {
    var category = request.param('category');
    var reg = new RegExp(category, 'i');
    mongodb.supplies.getByCategory(reg, function (results, dbCloseCallback) {
        handleResults(response, results);        
        dbCloseCallback();
    });
};

var handleResults = function (response, results) {
    var resultData = [];
    results.forEach(function (val) {
        resultData.push({
            "name": val.name,
            "status": "Available",
            "lastModified": "now"
        });
    });
    logger.debug("results: " + JSON.stringify(resultData, null, 4));
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(resultData));
    response.end();
};
