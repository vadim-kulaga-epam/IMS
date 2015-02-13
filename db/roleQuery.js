var common = require("./common");
var logger = require("../logger");

//exports.getAll = function (handleCallback) {
//    common.getFromCollectionByFilter('Role', {}, handleCallback);
//};
//
//exports.getFromCollectionByFilter = function (collection, filter, handleCallback) {
//    connectToDataBase(function (db) {
//        db.collection(collection).find(filter).toArray(function (err, result) {
//            logger.info("db loaded");
//            handleCallback(result, function () {
//                logger.info("db close");
//                db.close();
//            });
//        });
//    });
//};

exports.getAll = function (callback, db) {
    logger.debug(arguments);
    db.collection('Role').find().toArray(callback);
};
