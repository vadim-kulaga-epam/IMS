var async = require('async');
var logger = require('../logger');
var category = require('./categoryQuery');

var getAll = function (db, criteria, callback) {
    db.collection('Item').find(criteria).toArray(function (err, result) {
        callback(err, db, result);
    });
};

var getByCategory = async.seq(
        category.getOneByName,
        function (db, category, callback) {
            var coll = db.collection('Item');
            coll.find({"id_category": category._id.toString()}).toArray(function (err, result) {
                if (err)
                    next(err);
                if (result < 1)
                    logger.warn("Empty result item");
                callback(err, db, result);
            });
        }
);

exports.getAll = getAll;
exports.getByCategory = getByCategory;