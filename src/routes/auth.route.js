const express=require('express');
const {createNewAccount,loginUser}=require('../controllers/auth.controller');

const router=express.Router();


router.post('/register',createNewAccount);
router.post('/login',loginUser);

module.exports=router;