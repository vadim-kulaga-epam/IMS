var async = require('async');
var mongodb = require('../db');
var logger = require("../logger");
var transmit = require("../transmit");

exports.getAll = function (request, response) {
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.user.getAll, {}, function (err, result) {
            if (err) {
                transmit.error(response, err.http_code, err.message);
                return;
            }
            transmit.JSON(response, 200, result);
        }),
        mongodb.close
    ]);
};

exports.getOneById = function (request, response) {
    var id = request.param('id');
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.user.getById, id, function (err, result) {
            if (err) {
                transmit.error(response, err.http_code, err.message);
                return;
            }
            transmit.JSON(response, 200, result);
        }),
        mongodb.close
    ]);
};

exports.getIdByLogin = function (request, response) {
    var login = request.param('login');
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.user.getByLogin, login, function (err, result) {
            if (err)
                next(err);
            if (!result) {
                transmit.error(response, 404, "User not found");
                return;
            }
            delete result.password;
            logger.info("User loaded _id=%s", result._id);
            transmit.JSON(response, 200, result);
        }),
        mongodb.close
    ]);
};

exports.authorization = function (request, response) {
    var login = request.body.login;
    var password = request.body.password;
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.user.authorization, login, function (err, result) {
            if (err) {
                transmit.error(response, err.http_code, err.message);
                return;
            }
            if (result.password === password) {
                logger.info("User logined!");
                delete result.password;
                transmit.JSON(response, 202, result);
            } else {
                transmit.error(response, 403, "Invalid password!");
            }
        }),
        mongodb.close
    ]);
};

exports.registration = function (request, response) {
    var user = {
        "login": request.body.login,
        "password": request.body.password,
        "id_role": "54da1880e4b04aad9bbdef4e"
    };
    async.waterfall([
        mongodb.connect,
        mongodb.query(mongodb.user.registration, user, function (err, result) {
            if (err) {
                transmit.error(response, err.http_code, err.message);
                return;
            }
            delete result[0].password;
            transmit.JSON(response, 201, result);
        }),
        mongodb.close
    ]);
};

