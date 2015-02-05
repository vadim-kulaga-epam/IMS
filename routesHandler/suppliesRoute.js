var mongodb = require('../db');

module.exports = function () {
  mongodb.getAll(function (results, cb) {
    //var db = {game: []};
    console.log("results[0].name=" + results[0].name);
    cb();
  });
  console.log("Join in supplies route.");
  return "Hello supplies";
};


