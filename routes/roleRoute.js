var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");
var async = require('async');

exports.getAll = function (request, response) {
    async.series([
        mongodb.connectToMongoDB,
        mongodb.getAll,
        mongodb.closeMongoDB
    ], function (err, results) {
        logger.debug(arguments);
        transmit.JSON(response, 200, results[1]);
    });
};



