const express=require('express');
const{updateConsultationStatus,submitPreviousCase,getMySubmittedCase,requestAccountPromotion}=require('../controllers/lawyer.controller');
var verifyToken=require('../verify-token');
const uploader =require('../middleware/upload');

const router=express.Router();

router.post('/update-consultation',verifyToken,updateConsultationStatus);
router.post('/submit-case',verifyToken,submitPreviousCase);
router.get('/cases',verifyToken,getMySubmittedCase);
router.get('/request-promotion',verifyToken,requestAccountPromotion);

module.exports=router;