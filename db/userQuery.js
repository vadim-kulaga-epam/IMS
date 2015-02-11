var connectToDataBase = require("./connectorMongoDB");
var common = require("./common");
var logger = require("../logger");
var ObjectID = require('mongodb').ObjectID;

exports.getAll = function (handleCallback) {
    common.getFromCollectionByFilter('User', {}, handleCallback);
};

exports.getById = function (id, handleCallback) {
    getUserByFilterWithRole({"_id": ObjectID(id)}, handleCallback);
};

exports.getByLogin = function (login, handleCallback) {
    getUserByFilterWithRole({"login": login}, handleCallback);
};

var getUserByFilterWithRole = function (filter, callback) {
    connectToDataBase(function (db) {
        db.collection('User').find(filter).toArray(function (err, resultsUser) {
            if (resultsUser.length === 0) {
                logger.warn("No find user.");
                return;
            }
            var user = resultsUser[0];
            logger.info("User loaded %s", user.login);
            var cursor = db.collection('Role').find({"_id": ObjectID(user.id_role)});
            cursor.toArray(function (err, resultsRole) {
                if (resultsRole.length === 0) {
                    logger.warn("No find role.");
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


