var config = require('../config');
var db = config.getConnection;
var path = require('path')


//1. Get user profile
//2. Apply for expert
//3. Vote post
//4. Comment on post
//5. Raise query
//6. Request consulation
//7. Update/Modify query
//8. Report user
//9. Report query
//10. Follow Unfollow user
//11. Get follower & following


module.exports = {
    getUserProfile: (data, callback) => {
        const userId = data.user_id;
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT *,concat('" + config.PROFILE_URL + "',profile) as profile FROM users WHERE id=" + userId;

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if (results.length == 0) {
                    connection.release();
                    return callback(null, { code: 300, message: "User not found" });
                } else {
                    const result = results[0];

                    var responseData = {
                        'id': result.id,
                        'name': result.name,
                        'email': result.email,
                        'profile': result.profile,
                        'follower_count': result.follower_count,
                        'following_count': result.following_count,
                        'user_type': result.user_type,
                    };

                    connection.release();
                    return callback(null, { code: 200, message: "User details fetched successfully", data: responseData });
                }
            });
        });
    },


    applyForExpert: (data, callback) => {
        const userId = data.user_id;
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT * FROM applications WHERE user_id=" + userId;

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if (results.length == 0) {
                    var sql = "INSERT INTO applications(user_id,status) VALUES('" + userId + "','Applied')";

                    connection.query(sql, function (err, res) {
                        if (err) {
                            connection.release();
                            return callback({ code: 500, error: err });
                        }

                        connection.release();
                        return callback(null, { code: 200, message: "Applied for lawyer" });
                    });
                } else {
                    const result = results[0];

                    var responseData = {
                        'id': result.id,
                        'status': result.status
                    };

                    connection.release();
                    return callback(null, { code: 201, message: "Application already submitted", data: responseData });
                }
            });
        });
    },


    votePost: (data, callback) => {
        const userId = data.user_id;
        const queryId = data.query_id;
        const vote = data.vote;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT * FROM votes WHERE user_id=" + userId + " and query_id=" + queryId;

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                var voteName = vote == -1 ? "Downvote" : "Upvote";
                var sql = "";

                if (results.length == 0) {
                    if (vote == 0) {
                        connection.release();
                        return callback(null, { code: 200, message: "Vote successful" });
                    }

                    sql = "INSERT INTO votes(user_id,query_id,vote) VALUES('" + userId + "','" + queryId + "','" + voteName + "')";

                } else {
                    if (vote == 0) {
                        sql = "DELETE FROM votes WHERE user_id=" + userId + " and query_id=" + queryId;
                    } else {
                        sql = "UPDATE votes SET vote='" + voteName + "' WHERE user_id=" + userId + " and query_id=" + queryId;
                    }
                }

                connection.query(sql, function (err, results) {
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Vote successful" });
                });
            })

        })
    },

    commentOnPost: (data, callback) => {
        const userId = data.user_id;
        const queryId = data.query_id;
        const comment = data.comment;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO queries_comments(query_id,user_id,comment) VALUES('" + queryId + "','" + userId + "','" + comment + "')";

            connection.query(sql, function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                const id = result.insertId;

                sql = "SELECT * FROM queries_comments WHERE id=" + id;

                connection.query(sql, function (err, results) {
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    const result = results[0];

                    var responseData = {
                        'id': result.id,
                        'query_id': result.query_id,
                        'user_id': result.user_id,
                        'comment': result.comment
                    };

                    sql = "SELECT *,concat('" + config.PROFILE_URL + "',profile) as profile FROM users WHERE id=" + responseData['user_id'];

                    connection.query(sql, function (err, results) {
                        if (err) {
                            connection.release();
                            return callback({ code: 500, error: err });
                        }

                        const result = results[0];

                        responseData['user_name'] = result.name;
                        responseData['user_profile'] = result.profile;

                        connection.release();
                        return callback(null, { code: 200, message: "Comment added successfully", data: responseData });
                    })
                })
            });
        })
    },

    raiseAQuery: (data, callback) => {
        const userId = data.user_id;
        const queryContent = data.query_content;
        const filepath = data.filepath;

        var filetype ="";

        if(filepath!=null&&filepath!=""){
            const ext=path.extname(filepath).replace('.','');

            if(ext=='pdf'){
                filepath="Pdf"
            }else if(ext=='docx'){
                filepath="Docx";
            }else if(ext=='png'||ext=='jpg'||ext=='jpeg'){
                filepath="Image";
            }
        }

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO queries(author_id,query_content,file,file_type) VALUES('" + userId + "','" + queryContent + "','"+filepath+"','"+filetype+"')";

            connection.query(sql, async function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                const id = result.insertId;

                for (var i = 0; i < queryFiles.length; i++) {
                    const file = queryFiles[i];
                    sql = "INSERT INTO legal_files(filepath,file_type,owner,owner_type) VALUES('" + file['path'] + "','" + file['type'] + "','" + id + "','Query')";

                    await connection.query(sql);
                }


                connection.release();
                return callback(null, { code: 200, message: "Query raised successfully" });
            })
        })
    },


    modifyQuery: (data, callback) => {
        const id = data.id;
        const queryContent = data.query_content;
        const deletedFileIds = data.deleted_file_ids;
        const filepath = data.filepath;

        var filetype ="";

        if(filepath!=null&&filepath!=""){
            const ext=path.extname(filepath).replace('.','');

            if(ext=='pdf'){
                filepath="Pdf"
            }else if(ext=='docx'){
                filepath="Docx";
            }else if(ext=='png'||ext=='jpg'||ext=='jpeg'){
                filepath="Image";
            }
        }

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT * FROM queries WHERE id=" + id;

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if (results.length == 0) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if(filepath!=null&&filepath!=''){
                    sql = "UPDATE queries SET query_content='" + queryContent + "',file='"+filepath+"',file_type='"+filetype+"' where id=" + id;
                }else{
                    sql = "UPDATE queries SET query_content='" + queryContent + "' where id=" + id;
                }

                connection.query(sql, async function (err, results) {
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    //delete real files

                    for (var i = 0; i < deletedFileIds.length; i++) {
                        var did = deletedFileIds[i];

                        await connection.query("DELETE legal_files WHERE id=" + did);
                    }

                    for (var i = 0; i < queryFiles.length; i++) {
                        const file = queryFiles[i];
                        sql = "INSERT INTO legal_files(filepath,file_type,owner,owner_type) VALUES('" + file['path'] + "','" + file['type'] + "','" + id + "','Query')";

                        await connection.query(sql);
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Query updated successfully" });
                })
            })
        })
    },

    requestConsulation: (data, callback) => {
        const userId = data.user_id;
        const expertId = data.expert_id;
        const title = data.title;
        const filepath = data.file_path;

        var filetype ="Text";

        if(filepath!=null&&filepath!=""){
            const ext=path.extname(filepath).replace('.','');

            if(ext=='pdf'){
                filepath="Pdf"
            }else if(ext=='docx'){
                filepath="Docx";
            }else if(ext=='png'||ext=='jpg'||ext=='jpeg'){
                filepath="Image";
            }
        }

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO chats(user_id,expert_id,type,title,status,last_message,last_message_type) VALUES('" + userId + "','" + expertId + "','Lawyer','" + title + "','Pending','"+filepath+"','"+filetype+"')";

            connection.query(sql, async function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                const id = result.insertId;

                for (var i = 0; i < chatFiles.length; i++) {
                    const file = chatFiles[i];
                    sql = "INSERT INTO legal_files(filepath,file_type,owner,owner_type) VALUES('" + file['path'] + "','" + file['type'] + "','" + id + "','Chat')";

                    await connection.query(sql);
                }

                connection.release();
                return callback(null, { code: 200, message: "Consultation requested successfully" });
            })
        })
    },

    reportUser: (data, callback) => {
        const userId = data.user_id;
        const reportedId = data.reported_id;
        const comment = data.comment;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO reports(user_id,comment,type,type_id,status) VALUES('" + userId + "','" + comment + "','User','" + reportedId + "','Pending')";

            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }


                connection.release();
                return callback(null, { code: 200, message: "Report submitted successfully" });
            })
        })
    },

    reportQuery: (data, callback) => {
        const userId = data.user_id;
        const queryId = data.query_id;
        const comment = data.comment;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "INSERT INTO reports(user_id,comment,type,type_id,status) VALUES('" + userId + "','" + comment + "','Query','" + queryId + "','Pending')";

            connection.query(sql, function (err, result) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Report submitted successfully" });
            })
        })
    },


    followUnfollowUser: (data, callback) => {
        const userId = data.user_id;
        const friendId=data.friend_id;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "";
            
            sql="SELECT * FROM followers WHERE follower_id="+userId+" AND user_id="+friendId;

            connection.query(sql,function(err,results){
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if(results.length==0){
                    sql="INSERT INTO followers(follower_id,user_id) VALUES('" + userId + "','" + friendId + "')";
                }else{
                    sql="DELETE FROM followers WHERE follower_id="+userId+" AND user_id="+friendId;
                }

                connection.query(sql, function (err, result) {
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }
    
                    connection.release();
                    return callback(null, { code: 200, message: "Follow status changed successfully" });
                })
            })
        })
    },

    getFollowerFollowing: (data, callback) => {
        const userId = data.user_id;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT *,concat('" + config.PROFILE_URL + "',profile) as profile,'' as password FROM users WHERE id in (SELECT follower_id FROM followers WHERE user_id="+userId+")";

            console.log(sql);
            connection.query(sql, function (err, followers) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                sql= "SELECT *,concat('" + config.PROFILE_URL + "',profile) as profile,'' as password FROM users WHERE id in (SELECT user_id FROM followers WHERE follower_id="+userId+")";

                connection.query(sql,function(err,followings){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    const resultData={
                        'followers':followers,
                        'followings':followings
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Report submitted successfully" ,data:resultData});
                })

                
            })
        })
    }
}