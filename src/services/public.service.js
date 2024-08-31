var config = require('../config');
const { use } = require('../routes/user.route');
var db = config.getConnection;

//1. Search library
//2. Search posts
//3. Get legal experts
//4. Get all categories
//5.



module.exports = {
    searchLibrary: (data, callback) => {
        const userId = data.user_id;
        const search=data.search;
        const type=data.type;
        const catId=data.category_id;
        
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="";
            var searchQuery="";
            if(search!=''){
                searchQuery=" AND (libraries.title like '%"+search+"%' or libraries.data like '%"+search+"%')";
            }
            var catQuery="";

            if(catId!=-1){
                catQuery=" AND libraries.category_id="+catId;
            }
            sql = "SELECT libraries.*,users.name,concat('" + config.PROFILE_URL + "',users.profile) as profile FROM libraries LEFT JOIN users ON libraries.author_id=users.id WHERE libraries.is_verified=1 and libraries.type='"+type+"' "+catQuery+searchQuery+" order by libraries.created_at desc";

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Library search successful", data: results });
            });
        });
    },

    searchPost:(data,callback)=>{
        var userId = data.user_id;
        const search=data.search;

        if(userId===undefined){
            userId=-1;
        }

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="";
            var searchQuery="";
            if(search!=''){
                searchQuery=" AND queries.query_content like '%"+search+"%' ";
            }
            sql = "SELECT queries.*,((SELECT COUNT(*) FROM votes WHERE query_id=queries.id and vote='Upvote') - (SELECT COUNT(*) FROM votes WHERE query_id=queries.id and vote='Downvote')) as vote_count,COALESCE((select vote from votes where user_id="+userId+" and query_id=queries.id),'None') as vote_status,users.name,concat('" + config.PROFILE_URL + "',users.profile) as profile FROM queries LEFT JOIN users ON queries.author_id=users.id WHERE queries.is_active=1 "+searchQuery+" order by queries.created_at desc";

            console.log(sql);
            connection.query(sql, async function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                var resultData=[];

                results.forEach(async function(ress,i){
                    connection.query("select id,filepath,file_type from legal_files where owner_type='Query' and owner=queries.id",function(err,fileresults){
                        // ress['files']=fileresults;
                    })

                    resultData.push(ress);

                })

                connection.release();
                return callback(null, { code: 200, message: "Post search successful", data: resultData });
            });
        });
    },

    getLegalExperts:(data,callback)=>{
        var userId = data.user_id;
        const search=data.search;

        if(userId===undefined){
            userId=-1;
        }

        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="";
            var searchQuery="";
            if(search!=''){
                searchQuery=" AND (users.name like '%"+search+"%' ";
            }
            console.log(userId);
            sql = "SELECT *,concat('" + config.PROFILE_URL + "',profile) as profile,'' as password FROM users WHERE status='Active' and user_type='Lawyer' AND id!='"+userId+"' "+searchQuery+" order by follower_count desc";

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Experts search successful", data: results });
            });
        });
    },

    
    getAllCategories:(data,callback)=>{
        db(function (err, connection) {
            if (err) {
                return callback({ code: 500, error: err });
            }

            var sql="";
            
            sql = "SELECT * FROM categories";

            connection.query(sql, function (err, results) {
                if (err) {
                    connection.release();
                    return callback({ code: 500, error: err });
                }

                connection.release();
                return callback(null, { code: 200, message: "Categories fetched successfully", data: results });
            });
        });
    },
};