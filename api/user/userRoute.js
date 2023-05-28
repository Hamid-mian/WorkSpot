
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const user_controller=require("./userController");
const Paths= require("../helper/constants/Paths");

//........................multer for image storage ..................

//this is used to store file and get path of that file give file uniwue name 
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/"+ Paths.Paths.USER_IMAGE);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});
var uploadSingle = multer({
    storage: storage,
}).single("image_path");
router.post("/imageUpload",uploadSingle, user_controller.imageUpload);



router.post("/post", user_controller.post);

router.get("/verifyCode",user_controller.verifyCode);

router.post("/login",user_controller.login);
router.post("/resetPassword",user_controller.resetPassword);

router.post("/forgetPassword",user_controller.forgetPassword);
module.exports= router;