const common = require("../common");
const Messages = require("../constants/Messages");
const enums = require("../constants/Enums");
const service=require("./dashboardServices");

module.exports={

    hiredProfile:(req,res)=>{
        const body=req.body;
        service.hiredProfile(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==null)
            {
                const data=common.error(err,Messages.Messages.MS,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
            res.json({data});
        })
    },
}