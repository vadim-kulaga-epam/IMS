var async = require('async');
var ObjectID = require('mongodb').ObjectID;
var logger = require("../logger");
var role = require('./roleQuery');

var getAll = function (db, criteria, callback) {
    db.collection('User').find(criteria,{password:0}).toArray(function (err, result) {
        callback(err, db, result);
    });
};

var getOneById = async.seq(
        function (db, id, callback) {
            var coll = db.collection('User');
            coll.findOne({"_id": ObjectID(id)}, {password: 0}, function (err, result) {
                if (err)
                    next(err);
                if (!result) {
                    err = new Error("User not found");
                    err.http_code = 404;
                }
                callback(err, db, result);
            });
        },
        function (db, user, callback) {
            role.getById(db, user.id_role, function (err, db, result) {
                if (!err)
                    user.role = result.name;
                callback(null, db, user);
            });
        }
);

var getOneByLogin = function (db, login, callback) {
    var coll = db.collection('User');
    coll.findOne({"login": login}, function (err, result) {
        callback(err, db, result);
    });
};

var insertUser = function (db, user, callback) {
    db.collection("User").insert(user, function (err, result) {
        callback(err, db, result);
    });
};

var authorization = async.seq(
        function (db, login, callback) {
            getOneByLogin(db, login, function (err, db, result) {
                if (err)
                    next(err);
                if (!result) {
                    err = new Error("Login not exists!");
                    err.http_code = 403;
                }
                callback(err, db, result);
            });
        },
        function (db, user, callback) {
            role.getById(db, user.id_role, function (err, db, result) {
                if (!err)
                    user.role = result.name;
                callback(null, db, user);
            });
        }
);

var registration = async.seq(
        function (db, userNew, callback) {
            getOneByLogin(db, userNew.login, function (err, db, result) {
                if (err)
                    next(err);
                if (result) {
                    err = new Error("User exists");
                    err.http_code = 403;
                }
                callback(err, db, userNew);
            });
        },
        insertUser
);

exports.getAll = getAll;
exports.getById = getOneById;
exports.getByLogin = getOneByLogin;
exports.authorization = authorization;
exports.registration = registration;
