const path=require("../helper/constants/Paths");
const router = require("express").Router();
const user_controller=require("./profileController");




//....................Get All Employees..........................
router.get("/getAll",user_controller.getAllUsers);

//.....................Get specigic Employee........................
router.post("/getuser",user_controller.getUser);

router.post("/getreviews",user_controller.getreviews);
router.post("/postReview",user_controller.postReview);
router.post("/getEmployeeSkillTag",user_controller.getEmployeeSkillTag);


module.exports=router;