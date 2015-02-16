var async = require('async');
var logger = require("../logger");
var ObjectID = require('mongodb').ObjectID;

var getAll = function (db, criteria, callback) {
    db.collection('Role').find(criteria).toArray(function (err, result) {
        callback(err, db, result);
    });
};

var getOneById = function (db, idRole, callback) {
    var coll = db.collection('Role');
    coll.findOne({"_id": ObjectID(idRole)}, function (err, result) {
        if (err)
            next(err);
        if (!result) {
            err = new Error("Role not found");
            err.http_code = 404;
        }
        callback(err, db, result);
    });
};

exports.getAll = getAll;
exports.getById = getOneById;