const request = require('request-promise');
var path = require('path')

const{searchLibrary,searchPost,getLegalExperts,getAllCategories}=require('../services/public.service');

module.exports={
    searchLibrary:(req,res)=>{
        req.body.user_id=req.userId;
        searchLibrary(req.body,function(error,result){
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

    searchPost:(req,res)=>{
        req.body.user_id=req.userId;
        console.log("user id "+req.body.user_id);
        searchPost(req.body,function(error,result){
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

    getLegalExperts:(req,res)=>{
        req.body.user_id=req.userId;
        getLegalExperts(req.body,function(error,result){
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

    getCategories:(req,res)=>{
        getAllCategories(req.body,function(error,result){
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
    }
};