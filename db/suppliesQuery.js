var connectToDataBase = require("./connectorMongoDB");
var common = require("./common");
var logger = require("../logger");

exports.getAll = function (handleCallback) {
    common.getFromCollectionByFilter('Item', {}, handleCallback);
};

exports.getByCategory = function (category, callback) {
    connectToDataBase(function (db) {
        var collectionCategory = db.collection('Category');
        var cursor = collectionCategory.find({"name": category});
        cursor.toArray(function (err, results) {
            if (results.length == 0) {
                logger.warn("No find category.");
                return;
            }
            var collectionItem = db.collection('Item');
            var cursor = collectionItem.find({"id_category": results[0]._id.toString()});
            cursor.toArray(function (err, results) {
                logger.info("db loaded");                   
                callback(results, function () {
                    logger.info("db close");
                    db.close();
                });
            });
        });
    });
};


