const common = require("../helper/common");
const Messages = require("../helper/constants/Messages");
const enums = require("../helper/constants/Enums");
const service=require("./dashboardServices");

module.exports={

    // ...........................Hired Profile.................................
    hiredProfile:(req,res)=>{
        const body=req.body;
        service.hiredProfile(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==null){
                const data=common.error(err,Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
            res.json({data});
        })
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
                const data=common.error(err,Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SAVED,enums.ErrorCode.success);
            res.json({data});
        })
    }
}