var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;
// Connection URL
var url = "mongodb://diralf:qwerty@ds063869.mongolab.com:63869/ims";
//var url = 'mongodb://diralf:mongo531mongo@ds063869.mongolab.com:63869/ims';

var findBase = function (filter, callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      console.log("Error: unable to connect to database");
      return;
    }
    console.log("Connected correctly to server");
    var collItem = db.collection('item');
    var cursor = collItem.find(filter);
    cursor.toArray(function (err, results) {
      console.log("db loaded");
      var dataRes = results;
      callback(results, function () {
        console.log("db close");
        db.close();
      });
    });
  });
};

exports.getAll = function (callback) {
  findBase({}, callback);
};



