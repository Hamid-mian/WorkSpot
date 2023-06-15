const common = require("../helper/common");
const Messages = require("../helper/constants/Messages");
const enums = require("../helper/constants/Enums");
const service=require("./homeService");

module.exports={

    //...................job post.................................
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

    //...................job post update....................................
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

    //...................getting all posts..............................
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

   //...................getting specific post.........................
    getPostById:(req,res)=>{
        const body=req.body;
        service.getPostById(body,(err,result)=>{
            if(err)
            {
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            
            const data=common.success(result,Messages.Messages.MSG_DATA_FOUND,enums.ErrorCode.success);
            res.json({data});
    })
    },

    //...................getting specific employer posts.........................
    getEmployerPost:(req,res)=>{
        const body=req.body;
        service.getEmployerPost(body,(err,result)=>{
            if(err)
            {
                const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==0)
            {
                const data=common.error(Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist,);
                return res.json({data});
            }
            const data=common.success(result,Messages.Messages.MSG_DATA_FOUND,enums.ErrorCode.success);
            res.json({data});
    })
    },
    //
    //..................getting all tags.............................
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
    //.................getting all skills.........................
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

    //...................delete a job.....................
    deletePostById:(req,res)=>
{
    const body=req.body;
    service.deletePostById(body,(err,result)=>{
        if(err){
            const data=common.error(err,Messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
            return res.json({data});
        }
        if(result.affectedRows==0)
         {
             const data=common.error(Messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist,);
             return res.json({data});
         }
        const data=common.success(result,Messages.Messages.MSG_DELETE_SUCCESS,enums.ErrorCode.success);
        res.json({data});
    });
  
},
}