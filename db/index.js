var config = require("../config");
var MongoClient = require('mongodb').MongoClient;
var logger = require("../logger");

exports.supplies = require("./suppliesQuery");
exports.category = require("./categoryQuery");
exports.user = require("./userQuery");
exports.role = require("./roleQuery");

//var url = 'mongodb://diralf:qwerty@ds041851.mongolab.com:41851/ims';
var url = 'mongodb://' + config.dbUser + ':' + config.dbPassword + '@' + config.dbURL;

var mdb;

exports.connectToMongoDB = function (callback) {
    logger.debug(arguments);
    MongoClient.connect(url, function(err,db){
        mdb = db;
        callback(err);
    });
};

exports.closeMongoDB = function (callback) {
    logger.debug(arguments);
    mdb.close(callback);
};

exports.getAll = function (callback) {
    logger.debug(arguments);
    mdb.collection('Role').find().toArray(callback);
};