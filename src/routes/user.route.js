const express=require('express');
const{getUserProfile,applyForExpert,votePost,commentOnPost,raiseAQuery,modifyQuery,requestConsulation,reportUser,reportQuery,followUnfollowUser,getFollowerFollowing}=require('../controllers/user.controller');
var verifyToken=require('../verify-token');
const uploader =require('../middleware/upload');

const router=express.Router();

router.get('/profile',verifyToken,getUserProfile);
router.get('/apply-expert',verifyToken,applyForExpert);
router.post('/vote-post',verifyToken,votePost);
router.post('/comment-post',verifyToken,commentOnPost);
router.post('/raise-query',uploader.any(),verifyToken,raiseAQuery);
router.post('/modify-query',uploader.any(),verifyToken,modifyQuery);
router.post('/request-consultation',verifyToken,requestConsulation);
router.post('/report-user',verifyToken,reportUser);
router.post('/report-query',verifyToken,reportQuery);
router.post('/follow-unfollow',verifyToken,followUnfollowUser);
router.post('/friends',verifyToken,getFollowerFollowing);

module.exports=router;