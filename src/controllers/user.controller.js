const request = require('request-promise');
var path = require('path')

const{getUserProfile,applyForExpert,votePost,commentOnPost,raiseAQuery,modifyQuery,requestConsulation,reportUser,reportQuery,followUnfollowUser,getFollowerFollowing,getMyQueries}=require('../services/user.service');

module.exports={
    getUserProfile:(req,res)=>{
        req.body.user_id=req.userId;
        getUserProfile(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    applyForExpert:(req,res)=>{
        req.body.user_id=req.userId;
        applyForExpert(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    votePost:(req,res)=>{
        req.body.user_id=req.userId;
        votePost(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    commentOnPost:(req,res)=>{
        req.body.user_id=req.userId;
        commentOnPost(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    raiseAQuery:(req,res)=>{
        req.body.user_id=req.userId;
        if(req.file!=null){
            req.body.file_path=req.file.filename;
        }else{
            req.body.file_path='';
        }
        raiseAQuery(req.body,function(error,result){
            if(error){
                console.log(error);
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    modifyQuery:(req,res)=>{
        req.body.user_id=req.userId;
        if(req.file!=null){
            req.body.file_path=req.file.filename;
        }else{
            req.body.file_path='';
        }
        modifyQuery(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    requestConsulation:(req,res)=>{
        req.body.user_id=req.userId;
        if(req.file!=null){
            req.body.file_path=file.filename;
        }else{
            req.body.file_path='';
        }
        requestConsulation(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    reportUser:(req,res)=>{
        req.body.user_id=req.userId;
        reportUser(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    reportQuery:(req,res)=>{
        req.body.user_id=req.userId;
        reportQuery(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    followUnfollowUser:(req,res)=>{
        req.body.user_id=req.userId;
        followUnfollowUser(req.body,function(error,result){
            if(error){
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    getFollowerFollowing:(req,res)=>{
        req.body.user_id=req.userId;
        getFollowerFollowing(req.body,function(error,result){
            if(error){
                console.log(error);
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },

    getMyQueries:(req,res)=>{
        req.body.user_id=req.userId;
        getMyQueries(req.body,function(error,result){
            if(error){
                console.log(error);
                if(error.code==500){
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:"Database connection error",
                    });
                }else{
                    return res.json({
                        status:"FAILED",
                        code:error.code,
                        message:error.message,
                    });
                }
            }else{
                return res.json({
                    status:"SUCCESS",
                    code:result.code,
                    message: result.message,
                    data:result.data,
                })
            }
        })
    },
};