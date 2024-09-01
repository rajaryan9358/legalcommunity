var config = require('../config');
var db = config.getConnection;
var jwt = require('jsonwebtoken');
const moment = require('moment');

//1. Create new account
//2. Login to account

module.exports = {
    createNewAccount: (data, callback) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            connection.query("SELECT * FROM users WHERE email='" + email+"'", function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if (results.length > 0) {
                    connection.release();
                    return callback(null, { code: 300, message: "User already registered" });
                }


                var sql = "INSERT INTO users(name,email,password) VALUES('" + name + "','" + email + "','" + password + "')";


                connection.query(sql, function (err, results) {
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    connection.query("SELECT *,concat('" + config.FILE_URL + "',profile) as profile FROM users WHERE email='" + email + "' AND password='" + password + "'", function (err, results) {
                        if (err) {
                            connection.release();
                            return callback({ code: 500, error: err });
                        }

                        const result = results[0];

                        var token = jwt.sign({ user_id: result.id, user_type: result.user_type }, config.secret);

                        var responseData = {
                            'id': result.id,
                            'name': result.name,
                            'email': result.email,
                            'profile': result.profile,
                            'follower_count': result.follower_count,
                            'following_count': result.following_count,
                            'user_type': result.user_type,
                            'token': token,
                        };

                        connection.release();
                        return callback(null, { code: 200, message: "User registered successfully", data: responseData });
                    });
                });
            });
        });
    },

    loginUser: (data, callback) => {
        const email = data.email;
        const password = data.password;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            connection.query("SELECT *,concat('" + config.FILE_URL + "',profile) as profile FROM users WHERE email='" + email + "' AND password='" + password + "'", function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if (results.length == 0) {
                    connection.release();
                    return callback(null, { code: 300, message: "User doesn't exist" });
                }

                const result = results[0];

                if (result.status == 'Blocked') {
                    connection.release();
                    return callback(null, { code: 300, message: "User account blocked" });
                }

                var token = jwt.sign({ user_id: result.id, user_type: result.user_type }, config.secret);

                var responseData = {
                    'id': result.id,
                    'name': result.name,
                    'email': result.email,
                    'profile': result.profile,
                    'follower_count': result.follower_count,
                    'following_count': result.following_count,
                    'user_type': result.user_type,
                    'token': token,
                };

                connection.release();
                return callback(null, { code: 200, message: "User logged in successfully", data: responseData });
            });
        });
    }
}