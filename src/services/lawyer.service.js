var config = require('../config');
var db = config.getConnection;


//1. Update consultation status.
//2. Submit law or case
//3. Get my submitted law or case
//4. Request promote account page
//5. 


module.exports = {
    updateConsultationStatus: (data, callback) => {
        const userId = data.user_id;
        const chatId=data.chat_id;
        const status=data.status;
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql = "SELECT * FROM chats WHERE id="+chatId+" and expert_id="+userId;

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if(results.length==0){
                    connection.release();
                    return callback(null, { code: 300, message: "Consultation doesn't exist" });
                }

                var result=results[0];

                if(result.status!='Pending'&&(status!='Accepted'||status!='Rejected')){
                    connection.release();
                    return callback(null, { code: 300, message: "Cannot accept consultation" });
                }

                sql="UPDATE chats SET status='"+status+"' where id="+chatId;

                connection.query(sql,function(err,result){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }

                    connection.release();
                    return callback(null, { code: 200, message: "Status updated successfully"});
                })
            });
        });
    },

    submitPreviousCase:(data,callback)=>{
        const authorId = data.author_id;
        const title=data.title;
        const catId=data.category_id;
        const caseData=data.data;


        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="INSERT INTO libraries(title,category_id,data,type,author_id,is_verified) VALUES('"+title+"','"+catId+"','"+caseData+"','Case','"+authorId+"','0')";

            connection.query(sql,function(err,result){
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Case submitted to admin successfully"});
            })
        });
    },

    getMySubmittedCase:(data,callback)=>{
        const userId = data.user_id;


        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            sql = "SELECT * FROM libraries WHERE author_id="+userId+" and type='Case'";

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Cases fetched successful", data: results });
            });
        });
    },

    requestAccountPromotion:(data,callback)=>{
        const userId = data.user_id;

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="SELECT * FROM promotions WHERE user_id="+userId;

            connection.query(sql,function(err,results){
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                if(results.length==0){
                    sql= "INSERT INTO promotions(user_id,status) VALUES('"+userId+"','Pending')";
                }else{
                    sql= "UPDATE promotions SET status='Pending' WHERE user_id="+userId;
                }

                connection.query(sql,function(err,result){
                    if (err) {
                        connection.release();
                        return callback({ code: 500, error: err });
                    }
    
                    connection.release();
                    return callback(null, { code: 200, message: "Promotion request submitted successfully"});
                })
            })
        });
    },
};