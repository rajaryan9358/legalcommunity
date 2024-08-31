const express=require('express');
const{searchLibrary,searchPost,getLegalExperts,getCategories}=require('../controllers/public.controller');
var verifyToken=require('../verify-token');

const router=express.Router();

function maybe(fn) {
    return function(req, res, next) {
        var token = req.headers['x-access-token'];

        if (token==null||token=='') {
            next();
        } else {
            fn(req, res, next);
        }
    }
}

router.post('/libraries',searchLibrary);
router.post('/posts',maybe(verifyToken),searchPost);
router.post('/experts',maybe(verifyToken),getLegalExperts);
router.get('/categories',getCategories);

module.exports=router;