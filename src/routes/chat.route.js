const express=require('express');
const {getChats,createChat,addMessage,getMessages}=require('../controllers/chat.controller');
var verifyToken=require('../verify-token');

const router=express.Router();


router.get('/chats',verifyToken,getChats);
router.post('/create',verifyToken,createChat);
router.post('/message',verifyToken,addMessage);
router.post('/messages',verifyToken,getMessages);

module.exports=router;