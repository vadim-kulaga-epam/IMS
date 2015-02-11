var connectToDataBase = require("./connectorMongoDB");
var logger = require("../logger");

exports.getFromCollectionByFilter = function (collection, filter, handleCallback) {
    connectToDataBase(function (db) {
        db.collection(collection).find(filter).toArray(function (err, result) {
            logger.info("db loaded");
            handleCallback(result, function () {
                logger.info("db close");
                db.close();
            });
        });
    });
};

