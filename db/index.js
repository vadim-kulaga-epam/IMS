var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://diralf:qwerty@ds041851.mongolab.com:41851/ims';

var connectToDataBase = function (dataCallback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Error: unable to connect to database");
            return;
        }
        console.log("Connected correctly to server");
        dataCallback(db);
    });
};

exports.getAllItem = function (handleCallback) {
    connectToDataBase(function (db) {
        var collItem = db.collection('Item');
        var cursor = collItem.find();
        cursor.toArray(function (err, result) {
            console.log("db loaded");
            handleCallback(result, function () {
                console.log("db close");
                db.close();
            });
        });
    });
};

exports.getItemCategory = function (category, callback) {
    connectToDataBase(function (db) {
        var collectionCategory = db.collection('Category');
        var cursor = collectionCategory.find({"name": category});
        cursor.toArray(function (err, results) {
            if (results.length == 0) {
                console.log(err);
                console.log("Error: no find category.");
                return;
            }
            var collectionItem = db.collection('Item');
            console.log(results[0]._id);
            var cursor = collectionItem.find({"id_category": results[0]._id.toString()});
            cursor.toArray(function (err, results) {
                console.log("db loaded");

                callback(results, function () {
                    console.log("db close");
                    db.close();
                });
            })

        });
    });
};
