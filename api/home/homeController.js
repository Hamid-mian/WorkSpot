const common = require("../helper/common");
const Messages = require("../helper/constants/Messages");
const enums = require("../helper/constants/Enums");
const service=require("./homeService");

module.exports={

    jobPost:(req,res)=>{
        const body=req.body;
        service.jobPost(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
            res.json({data});
        })
    },

    jobPostUpdate:(req,res)=>{
        const body=req.body;
        service.jobPostUpdate(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==0)
            {
                const data=common.error(Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist, )
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
            res.json({data});

        })
    },
    getAllPost:(req,res)=>{
        const body=req.body;
        if(!body.page||isNaN(body.page)||body.page<0)
        {
            body.page=1;
        }
        if(!body.limit||isNaN(body.limit)||body.limit<0)
        {
            body.limit=5;
        }
        service.getAllPost(body,(err,result)=>{
            if(err)
            {
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                res.json({data});
            }
            if(result==0)
            {
                const data=common.error(Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist,);
                return res.json({data});
            }
            const data=common.pagination(result.users,result.totalCount,body.page,body.limit);
            res.json({data});
        })
    },

    getAllTags:(req,res)=>{
        const body=req.body;
        service.getAllTags(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_DATA_FOUND,enums.ErrorCode.success);
            res.json({data});
        })
    },

    getAllSkills:(req,res)=>{
        const body=req.body;
        service.getAllSkills(body,(err,result)=>{
            if(err){
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_DATA_FOUND,enums.ErrorCode.success);
            res.json({data});
        })
    },
}