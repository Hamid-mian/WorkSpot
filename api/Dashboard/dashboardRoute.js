
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const Controller=require("./dasboardController");



router.post("/hiredProfilePost",Controller.hiredProfile);
router.get(`/dashboardApi`,Controller.dashboardApi);
router.post("/applyJob",Controller.applyJob);

module.exports=router;