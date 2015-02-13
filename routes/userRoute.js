var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");

exports.getAll = function (request, response) {
    mongodb.user.getAll(function (results, dbCloseCallback) {
        transmit.JSON(response, 200, results);
        dbCloseCallback();
    });
};

exports.getOneById = function (request, response) {
    var id = request.param('id');
    mongodb.user.getById(id, function (userDB, callback, dbCloseCallback) {
        if (!userDB) {
            transmit.error(response, 404, "User not found!");
            dbCloseCallback();
        } else {
            logger.info("User loaded %s", userDB.login);
            callback(function (userWithRole) {
                transmit.JSON(response, 200, userWithRole);
                dbCloseCallback();
            });
        }
    });
};

exports.getIdByLogin = function (request, response) {
    var login = request.param('login');
    mongodb.user.getByLogin(login, function (userDB, callback, dbCloseCallback) {
        if (!userDB) {
            transmit.error(response, 404, "User not found!");
        } else {
            logger.info("User loaded _id=%s", userDB._id);
            transmit.JSON(response, 200, userDB);
        }
        dbCloseCallback();
    });
};

exports.authorization = function (request, response) {
    var login = request.body.login;
    var password = request.body.password;
    mongodb.user.authorization(login, function (userDB, callback, dbCloseCallback) {
        if (!userDB) {
            transmit.error(response, 403, "Login not exists!");
            dbCloseCallback();
        } else {
            logger.info("User loaded %s", userDB.login);
            if (userDB.password === password) {
                logger.info("User logined!");
                callback(function (userWithRole) {
                    transmit.JSON(response, 202, userWithRole);
                    dbCloseCallback();
                });
            } else {
                transmit.error(response, 403, "Invalid password!");
                dbCloseCallback();
            }
        }
    });
};

exports.registration = function (request, response) {
    var user = {
        "login": request.body.login,
        "password": request.body.password,
        "id_role": "54da1880e4b04aad9bbdef4e"
    };
    mongodb.user.registration(user, function (userDB, dbCloseCallback) {
        if (userDB) {
            transmit.JSON(response, 201, userDB);
        } else {
            transmit.error(response, 403, "User exists!");
        }
        dbCloseCallback();
    });
};

