
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const user_controller=require("./userController");


// //........................multer for image storage ..................
// const multer = require("multer");
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./upload/"+ Paths.Paths.USER_IMAGE);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
// });
// var uploadSingle = multer({
//     storage: storage,
// }).single("image_path");
// var upload = multer({
//     storage: storage,
// }).array("image_path");


router.post("/post", user_controller.post);
//router.post("/postEmployer", user_controller.postEmployer);

router.get("/verifyCode",user_controller.verifyCode);
//router.get("/verifyCodeEmployer",user_controller.verifyCodeEmployer);


// router.post("/generateCode",user_controller.generateVerificationCode);

router.post("/login",user_controller.login);
//router.get("/loginEmployer",user_controller.loginEmployer);

 
router.post("/resetPassword",user_controller.resetPassword);
//router.post("/resetPasswordEmployer",user_controller.resetPasswordEmployer);

router.post("/forgetPassword",user_controller.forgetPassword);
//router.post("/forgetPasswordEmployer",user_controller.forgetPasswordEmployer);


// router.post("/logout",user_controller.logout);

// router.post("/create",upload, user_controller.createUser);
// router.post("/createUserImage",uploadSingle, user_controller.createUserImage);

// router.get("/getById",user_controller.getUserById);
// router.get("/getAll",user_controller.getAllUsers);

// router.patch("/update",user_controller.updateUser);
// router.patch("/updateUserImage",uploadSingle,user_controller.updateUserImage);

// router.delete("/delete",user_controller.deleteUser);
// router.delete("/deleteUserImage",user_controller.deleteUserImage);
module.exports= router;