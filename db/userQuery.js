var connectToDataBase = require("./connectorMongoDB");
var common = require("./common");
var logger = require("../logger");
var ObjectID = require('mongodb').ObjectID;

exports.getAll = function (handleCallback) {
    common.getFromCollectionByFilter('User', {}, handleCallback);
};

exports.getById = function (id, handleCallback) {
    getUserByFilterWithRole({"_id": ObjectID(id)}, {password: 0}, handleCallback);
};

exports.getByLogin = function (login, handleCallback) {
    getUserByFilterWithRole({"login": login}, {"_id": 1}, handleCallback);
};

exports.authorization = function (login, handleCallback) {
    getUserByFilterWithRole({"login": login}, {}, handleCallback);
};

exports.registration = function (user, callback) {
    connectToDataBase(function (db) {
        var collUser = db.collection('User');
        collUser.findOne({"login": user.login}, {"_id": 1}, function (err, userDB) {
            if (err) {
                next(err);
            }
            if (!userDB) {
                collUser.insert(user, function (err, user) {
                    if (err) {
                        next(err);
                    }
                    logger.info("User added");
                    delete user[0].password;
                    callback(user[0], function () {
                        logger.info("db close");
                        db.close();
                    });
                });
            } else {
                callback(null, function () {
                    logger.info("db close");
                    db.close();
                });
            }
        });

    });
};

var getUserByFilterWithRole = function (filter, projection, callback) {
    connectToDataBase(function (db) {
        db.collection('User').findOne(filter, projection, function (err, user) {
            if (err)
                next(err);
            callback(user, function (callback) {
                delete user.password;
                var roleCollection = db.collection('Role');
                roleCollection.findOne({"_id": ObjectID(user.id_role)}, {"name": 1}, function (err, role) {
                    if (err)
                        next(err);
                    if (role) {
                        user.role = role.name;
                        callback(user);
                    } else {
                        logger.warn("Role not found");
                    }
                });
            }, function () {
                logger.info("db close");
                db.close();
            });
        });
    });
};


