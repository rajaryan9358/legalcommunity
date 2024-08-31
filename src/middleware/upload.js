var path = require('path')
const multer=require('multer');
const fs = require('fs-extra');


const fileStrogrageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir="files/";
        fs.ensureDirSync(dir);
        cb(null,dir)
    },
    filename:(req,file,cb)=>{
        cb(null,""+Date.now()+path.extname(file.originalname));
    }
})

const upload =multer({storage:fileStrogrageEngine});

module.exports=upload;