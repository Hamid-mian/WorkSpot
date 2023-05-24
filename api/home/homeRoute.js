
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const Controller=require("./homeController");



router.post("/jobpost",Controller.jobPost);
router.post("/jobPostUpdate",Controller.jobPostUpdate);
router.get("/getAllPost",Controller.getAllPost);

router.get("/getAllTags",Controller.getAllTags);
router.get("/getAllSkills",Controller.getAllSkills);

module.exports=router;