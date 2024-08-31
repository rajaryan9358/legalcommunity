const request = require('request-promise');
var path = require('path')

const{updateConsultationStatus,submitPreviousCase,getMySubmittedCase,requestAccountPromotion}=require('../services/lawyer.service');

module.exports={
    updateConsultationStatus:(req,res)=>{
        req.body.user_id=req.userId;
        updateConsultationStatus(req.body,function(error,result){
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

    submitPreviousCase:(req,res)=>{
        req.body.author_id=req.userId;
        submitPreviousCase(req.body,function(error,result){
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

    getMySubmittedCase:(req,res)=>{
        req.body.user_id=req.userId;
        getMySubmittedCase(req.body,function(error,result){
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

    requestAccountPromotion:(req,res)=>{
        req.body.user_id=req.userId;
        requestAccountPromotion(req.body,function(error,result){
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
    }
};