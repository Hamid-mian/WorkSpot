const path=require("../helper/constants/Paths");
const router = require("express").Router();
const user_controller=require("./profileController");




//router.post("/profileData",Controller.jobPost);

router.get("/getAll",user_controller.getAllUsers);
router.get("/getuser",user_controller.getUser);
module.exports=router;