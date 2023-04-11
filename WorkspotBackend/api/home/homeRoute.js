
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const Controller=require("./homeController");



router.post("/jobpost",Controller.jobPost);
router.get("/getAllCards",Controller.getAllCards);


module.exports=router;