var async = require('async');
var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");

exports.getAll = function (request, response) {
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.category.getAll, {}, function (err, result) {
            if (err) 
                next(err); 
            transmit.JSON(response, 200, result);
        }),
        mongodb.close
    ]);
};



