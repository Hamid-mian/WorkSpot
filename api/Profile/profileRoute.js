const path=require("../helper/constants/Paths");
const router = require("express").Router();
const user_controller=require("./profileController");




//....................Get All Employees..........................
router.get("/getAll",user_controller.getAllUsers);

//.....................Get specigic Employee........................
router.get("/getuser",user_controller.getUser);

router.get("/getreviews",user_controller.getreviews);


module.exports=router;