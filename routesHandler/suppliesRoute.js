var mongodb = require('../db');

module.exports = function (request, response) {
  var res = "response";
  mongodb.getAll(function (results, dbCloseCallback) {
    //var db = {game: []};
    console.log("results[0].name=" + results[0].name);
    res = results[0].name;
    dbCloseCallback();
    response.write(res);
    response.end();
  });
  console.log("Join in supplies route.");
  return res;
};


