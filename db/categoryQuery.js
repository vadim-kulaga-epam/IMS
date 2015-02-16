var logger = require("../logger");

var getAll = function (db, criteria, callback) {
    db.collection('Category').find(criteria).toArray(function (err, result) {
        callback(err, db, result);
    });
};

var getOneByName = function (db, categoryName, callback) {
    var reg = new RegExp(categoryName, 'i');
    var coll = db.collection('Category');
    coll.findOne({"name": reg}, {"_id": 1}, function (err, result) {
        if (err)
            next(err);
        if (!result) {
            err = new Error("Category not found");
            err.http_code = 404;
        }
        callback(err, db, result);
    });
}

exports.getAll = getAll;
exports.getOneByName = getOneByName;
