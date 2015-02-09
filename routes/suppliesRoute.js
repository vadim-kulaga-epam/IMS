var mongodb = require('../db');

module.exports = function (request, response) {
    var handleResponse = function (results, dbCloseCallback) {
        var resultData = [];
        results.forEach(function (val) {
            console.log("item=" + val.name);
            resultData.push({
               "name": val.name,
               "status": "Available",
               "lastModified": "now"
            });
        });
        response.writeHead(404, {"Content-Type": "application/json"});
        response.write(JSON.stringify(resultData));
        response.end();
        dbCloseCallback();
    };

    var category = request.param('category');
    if (category) {
        var reg = new RegExp(category, 'i');
        mongodb.getItemCategory(reg, handleResponse);
    } else {
        mongodb.getAllItem(handleResponse);
    }
};


