var logger = require("../logger");

exports.JSON = function (response, code, jsonObject) {
    logger.debug("response: " + JSON.stringify(jsonObject, null, 4));
    response.writeHead(code, {"Content-Type": "application/json"});
    response.write(JSON.stringify(jsonObject));
    response.end();
};

exports.error = function (response, code, message) {
    logger.warn(message);
    response.writeHead(code, {"Content-Type": "text/plain"});
    response.write(message);
    response.end();
};


