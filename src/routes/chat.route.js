const express=require('express');
const {getChats,createChat,addMessage}=require('../controllers/chat.controller');

const router=express.Router();


router.post('/chats',getChats);
router.post('/create',createChat);
router.post('/message',addMessage);

module.exports=router;