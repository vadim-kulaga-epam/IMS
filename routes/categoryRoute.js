var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");

exports.getAll = function (request, response) {
    mongodb.category.getAll(function (results, dbCloseCallback) {
        transmit.JSON(response, 200, results);
        dbCloseCallback();
    });
};



