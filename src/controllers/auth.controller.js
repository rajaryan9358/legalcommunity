const request = require('request-promise');
const { createNewAccount, loginUser } = require('../services/auth.service');


module.exports = {
    createNewAccount: (req, res) => {
        createNewAccount(req.body, function (error, result) {
            if (error) {
                console.log(error);
                if (error.code == 500) {
                    return res.json({
                        code: error.code,
                        status: "FAILED",
                        message: "Database connection error",
                    });
                } else {
                    return res.json({
                        code: error.code,
                        status: "FAILED",
                        message: error.message,
                    });
                }
            } else {

                return res.json({
                    code: result.code,
                    status: "SUCCESS",
                    message: result.message,
                    data: result.data,
                });
            }
        });
    },


    loginUser: (req, res) => {
        loginUser(req.body, function (error, result) {
            if (error) {
                if (error.code == 500) {
                    return res.json({
                        status: "FAILED",
                        code: error.code,
                        message: "Database connection error",
                    });
                } else {
                    return res.json({
                        status: "FAILED",
                        code: error.code,
                        message: error.message,
                    });
                }
            } else {
                res.json({
                    status: "SUCCESS",
                    code: result.code,
                    message: result.message,
                    data: result.data,
                })
            }
        })
    }
}