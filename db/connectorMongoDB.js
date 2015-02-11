var MongoClient = require('mongodb').MongoClient;
var logger = require("../logger");

var url = 'mongodb://diralf:qwerty@ds041851.mongolab.com:41851/ims';

module.exports = function (dataCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            logger.error(err);
            return;
        }
        logger.info("Connected correctly to server");
        dataCallback(db);
    });
};


