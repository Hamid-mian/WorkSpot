const common = require("../helper/common");
const Messages = require("../helper/constants/Messages");
const enums = require("../helper/constants/Enums");
const service=require("./dashboardServices");

module.exports={

    // ...........................Hired Profile.................................
    hiredProfile: (req, res) => {
        const body = req.body;
        service.hiredProfile(body, (err, result) => {
          if (err) {
            const data = common.error(err, Messages.Messages.MSG_DB_CONNECTION_ERROR, enums.ErrorCode.failed);
            res.json(data);
          } else if (result == null) {
            const data = common.error(err, Messages.Messages.MSG_ALREADY_EXIST, enums.ErrorCode.failed);
            res.json(data);
          } else {
            const data = common.success(result, Messages.Messages.MSG_SUCCESS, enums.ErrorCode.success);
            res.json(data);
          }
        });
      },

    //............................DashBoard users................................
    dashboardApi:(req,res)=>
    {
        const body =req.body;
        service.dashboardApi(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==null){
                const data=common.error(err,Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_DATA_FOUND,enums.ErrorCode.success);
            res.json({data});
        })
        
    },

    //..........................Apply Job notification generation................
    applyJob:(req,res)=>
    {
        const body =req.body;
        service.applyJob(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==null){
                const data=common.error(err,Messages.Messages.MSG_ALREADY_EXIST,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SAVED,enums.ErrorCode.success);
            res.json({data});
        })
    },

    
 //.......................Get All Notifications...................

 getAllNotifications:(req,res)=>
 {
    //this extra code is helpful in applying pagination in case user do not tell us pages then we can assume ourself
     const body=req.body;
     if(!body.page||isNaN(body.page)||body.page<0)
     {
         body.page=1;
     }
     if(!body.limit||isNaN(body.limit)||body.limit<0)
     {
         body.limit=5;
     }
     service.getAllNotifications(body,(err,result)=>
     {
         if (err)
         {
             const data=common.error(err,Messages.Messages.MSG_INVALID_DATA,enums.ErrorCode.failed);
             return res.json({data});
         }
         if(result==0)
         {
             const data=common.error(Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist,);
             return res.json({data});
         }
    
         //call pagination here in place of success
         const data=common.pagination(result.users,result.totalCount,body.page,body.limit);
         return res.json({data});
     });  
},
}