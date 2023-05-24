
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const Controller=require("./dasboardController");



router.post("/hiredProfilePost",Controller.hiredProfile);



module.exports=router;