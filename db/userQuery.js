var connectToDataBase = require("./connectorMongoDB");
var common = require("./common");
var logger = require("../logger");
var ObjectID = require('mongodb').ObjectID;

exports.getAll = function (handleCallback) {
    common.getFromCollectionByFilter('User', {}, handleCallback);
};

exports.getById = function (id, handleCallback, errorCallback) {
    getUserByFilterWithRole({"_id": ObjectID(id)}, handleCallback, errorCallback);
};

exports.getByLogin = function (login, handleCallback, errorCallback) {
    getUserByFilterWithRole({"login": login}, handleCallback, errorCallback);
};

var getUserByFilterWithRole = function (filter, callback, errorCallback) {
    connectToDataBase(function (db) {
        db.collection('User').find(filter).toArray(function (err, resultsUser) {
            if (resultsUser.length === 0) {
                logger.warn("No find user.");
                errorCallback();
                logger.warn("db close");
                db.close();
                return;
            }
            var user = resultsUser[0];
            logger.info("User loaded %s", user.login);
            var cursor = db.collection('Role').find({"_id": ObjectID(user.id_role)});
            cursor.toArray(function (err, resultsRole) {
                if (resultsRole.length === 0) {
                    logger.warn("No find role.");
                    errorCallback();
                    logger.warn("db close");
                    db.close();
                    return;
                }
                var role = resultsRole[0];
                logger.info("Role loaded %s", role.name);
                var results = user;
                results.role = role.name;
                callback(results, function () {
                    logger.info("db close");
                    db.close();
                });
            });

        });
    });
}
;


