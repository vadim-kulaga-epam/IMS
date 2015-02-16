var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require("../config");
var logger = require("../logger");

exports.supplies = require("./suppliesQuery");
exports.category = require("./categoryQuery");
exports.user = require("./userQuery");
exports.role = require("./roleQuery");

var url = 'mongodb://'
        + config.dbUser + ':'
        + config.dbPassword + '@'
        + config.dbURL;

var connect = function (callback) {
    logger.debug("Connecting to database...");
    MongoClient.connect(url, callback);
};

var close = function (db, callback) {
    logger.debug("Closing to database...");
    db.close();
};

var query = function (query, criteria, callbackResponse) {
    return function (db, callbackDB) {
        logger.debug("Doing query...");
        query(db, criteria, function (err, db, result) {
            if (err) {
                if (err.http_code) {
                    callbackResponse(err);
                } else
                    next(err);
            } else {
                callbackResponse(null, result);
            }
            callbackDB(null, db);
        });
    };
};

exports.connect = connect;
exports.close = close;
exports.query = query;

