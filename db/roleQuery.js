var common = require("./common");

exports.getAll = function (handleCallback) {
    common.getFromCollectionByFilter('Role', {}, handleCallback);
};
