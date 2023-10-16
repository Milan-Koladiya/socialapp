const multer = require('multer')
const path = require('path');

const Storage = multer.diskStorage({

        destination:function(req,file,callbk){
            callbk(null,"public/posts")
            // callbk(null,path.join(__dirname,"uploadFolder"))
        }, 
        filename:function(req,file,callbk){
            // callbk(null, file.name + "-" + Date.now())
            callbk(null,file.originalname);
            console.log("filename")
        }
    })
    


const UploadFile = multer({
    storage:Storage
}).single('image');

module.exports = UploadFile;

// app.post("/upload",upload,(req,res)=>{

//      res.send("file upload")
// });

// ======================
// const multer = require('multer')
// const Storage = multer.diskStorage({

//     destination:`public/posts/`,
//     filename:(req,file,cb)=>{
//         console.log("multer")
//         const imageNAme = `${file.fieldname}--${req.user._id}-${file.originalname}`
//        const UserDirectory = path.join(__dirname,'../public/post',req.user._id);

//        if(!UserDirectory)
//        {
//         fs.mkdirSync(UserDirectory,{recursive:true});
//        }
//        const ImagePath = path.join(UserDirectory,imageNAme);
//        fs.writeFileSync(ImagePath,req.file.buffer)
//         // cb(null,imageNAme);
//     }
// });

// var UploadFile = multer({
    
//     storage:Storage
// }).single('image');

// module.exports = UploadFile;

// ===================

// //npm i multer
// const multer = require("multer");
// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// try {
//   var Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const UserDirectory = path.join(
//         __dirname,
//         "../public/posts",
//         req.user._id.toString()
//       );

//       // Create a subdirectory for the user's files if it doesn't exist
//       if (!fs.existsSync(UserDirectory)) {
//         fs.mkdirSync(UserDirectory);
//       }

//       cb(null, UserDirectory); // Set the destination directory to the user's subdirectory
//     },
//     filename: (req, file, cb) => {
//       const imageName = `${file.fieldname}--${file.originalname}`;
//       const ImagePath = path.join(Storage.destination, imageName);

//       // Write the file asynchronously
//       fs.writeFile(ImagePath, req.file.buffer, (err) => {
//         if (err) {
//           return cb(err);
//         }
//         cb(null, imageName);
//       });
//     },
//   });

//   var UploadFile = multer({
//     storage: Storage,
//   }).single("image");
  
// } catch (error) {
//   res.status(404).json({
//     error: error.message,
//   });
// }

// module.exports = UploadFile;
