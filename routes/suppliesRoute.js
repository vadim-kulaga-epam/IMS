var async = require('async');
var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");

exports.getAll = function (request, response) {
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.supplies.getAll, {}, function (err, result) {
            if (err) 
                next(err); 
            handleResults(response, result);
        }),
        mongodb.close
    ]);
};

exports.getByCategory = function (request, response) {
    var category = request.param('category');
    logger.debug("Begin supplies category=%s", category);
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.supplies.getByCategory, category, function (err, results) {
            if (err) {
                transmit.error(response, err.http_code, err.message);
                return;
            }    
            handleResults(response, results);
        }),
        mongodb.close
    ]);
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
    transmit.JSON(response, 200, resultData);
};
