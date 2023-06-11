
const path=require("../helper/constants/Paths");
const router = require("express").Router();
const Controller=require("./dasboardController");



router.post("/hiredProfilePost",Controller.hiredProfile);
router.post(`/dashboardApi`,Controller.dashboardApi);
router.post("/applyJob",Controller.applyJob);



//....................Get All Employees..........................
router.post("/getAllNotification",Controller.getAllNotifications);

router.post("/deletenotification",Controller.deleteNotification);

module.exports=router;