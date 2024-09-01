const { request } = require('express');
var config = require('../config');
var db = config.getConnection;

//1. Get chats
//2. Create a chat
//3. Send a message
//4. Get messages


module.exports = {
    getChats: (data, callback) => {
        const userId = data.user_id;
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT users.name,(CASE WHEN users.profile IS NOT NULL AND users.profile!='' THEN concat('" + config.FILE_URL + "',users.profile) ELSE '' END) as profile FROM chats LEFT JOIN users ON chats.expert_id=users.id WHERE chats.user_id="+userId;

            connection.query(sql, function (err, messages) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                sql = "SELECT users.name,(CASE WHEN users.profile IS NOT NULL AND users.profile!='' THEN concat('" + config.FILE_URL + "',users.profile) ELSE '' END) as profile FROM chats LEFT JOIN users ON chats.user_id=users.id WHERE chats.expert_id="+userId;

                connection.query(sql,function(err,requests){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    const resultData={
                        'requests':requests,
                        'messages':messages
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Chats fetched successfully",data:resultData});
                })
            });
        });
    },

    createChat: (data, callback) => {
        const userId = data.user_id;
        const title=data.title;
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO chats(user_id,expert_id,type,title,status,last_message,last_message_type) VALUES('" + userId + "','-1','Bot','" + title + "','Accepted','"+title+"','Text')";

            connection.query(sql, function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                const id=result.insertId;

                sql="SELECT * FROM chats WHERE id="+id;

                connection.query(sql,function(err,results){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Chat created successfully",data:results});
                })
            });
        });
    },

    addMessage: (data, callback) => {
        const userId = data.user_id;
        const chatId=data.chat_id;
        const messageType=data.message_type;
        const message=data.message;
        
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO messages(chat_id,message_type,message,is_read,sender_id) VALUES('" + chatId + "','"+messageType+"','"+message+"','0','"+userId+"')";

            connection.query(sql, function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                const id=result.insertId;

                sql="SELECT * FROM messages WHERE id="+id;

                connection.query(sql,function(err,results){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Message added successfully",data:results});
                })
            });
        });
    },


    getMessages: (data, callback) => {
        const userId = data.user_id;
        const chatId=data.chat_id;
        
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT * FROM messages WHERE chat_id="+chatId+" order by created_at asc";

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                    return callback(null, { code: 200, message: "Message fetched successfully",data:results});
            });
        });
    },

};