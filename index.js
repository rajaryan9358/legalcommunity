var express=require('express');
var bodyParser = require('body-parser');

const multer=require('multer');
const upload=multer();
var app=express();

var http=require('http').Server(app);

const { now } = require('moment');

//   const allowCrossDomain = (req, res, next) => {
//     res.header(`Access-Control-Allow-Origin`, `*`);
//     res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//     res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
//   };
  
// app.use(allowCrossDomain);

var auth=require('./src/routes/auth.route');
var user=require('./src/routes/user.route');
var public=require('./src/routes/public.route');
var lawyer=require('./src/routes/lawyer.route');


app.use(bodyParser.json());
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth',auth);
app.use('/user',user);
app.use('/public',public);
app.use('/lawyer',lawyer);


http.listen(4000,function(){
    console.log('Connected');
})