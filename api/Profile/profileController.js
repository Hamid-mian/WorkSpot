const service = require("./profileService");
const common = require("../helper/common");
const messages= require("../helper/constants/Messages");
const Enums=require("../helper/constants/Enums");
module.exports ={

 //.......................Get All User...................

 getAllUsers:(req,res)=>
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
     service.getAllUsers(body,(err,result)=>
     {
         if (err)
         {
             const data=common.error(err,messages.Messages.MSG_INVALID_DATA,Enums.ErrorCode.failed);
             return res.json({data});
         }
         if(result==0)
         {
             const data=common.error(messages.Messages.MSG_NO_RECORD,Enums.ErrorCode.not_exist,);
             return res.json({data});
         }
    
         //call pagination here in place of success
         const data=common.pagination(result.users,result.totalCount,body.page,body.limit);
         return res.json({data});
     });  
},

        //.......................Get User By ID...................
        getUser:(req,res)=>
        {
           const body = req.body;
           service.getUser(body,(err,result)=>
           {
            if (err)
            {
                const data=common.error(err,messages.Messages.MSG_INVALID_DATA,Enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==0)
            {
                const data=common.error(messages.Messages.MSG_NO_RECORD,Enums.ErrorCode.not_exist,);
                return res.json({data});
            }
                const data=common.success(result,messages.Messages.MSG_DATA_FOUND,Enums.ErrorCode.success);
                return res.json({data});
            
           
           });  
        },



    //.......................Get reviews By ID...................
    getreviews:(req,res)=>
    {
        const body=req.body;
     if(!body.page||isNaN(body.page)||body.page<0)
     {
         body.page=1;
     }
     if(!body.limit||isNaN(body.limit)||body.limit<0)
     {
         body.limit=5;
     }
       service.getreviews(body,(err,result)=>
       {
        if (err)
        {
            const data=common.error(err,messages.Messages.MSG_INVALID_DATA,Enums.ErrorCode.failed);
            return res.json({data});
        }
        if(result==0)
        {
            const data=common.error(messages.Messages.MSG_NO_RECORD,Enums.ErrorCode.not_exist,);
            return res.json({data});
        }
   
        //call pagination here in place of success
        const data=common.pagination(result.users,result.totalCount,body.page,body.limit);
        return res.json({data});
       });  
    },


    //

    postReview:(req,res)=>
        {
           const body = req.body;
           service.postReview(body,(err,result)=>
           {
            if (err)
            {
                const data=common.error(err,messages.Messages.MSG_INVALID_DATA,Enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==0)
            {
                const data=common.error(messages.Messages.MSG_no_to_user_exist,Enums.ErrorCode.not_exist,);
                return res.json({data});
            }
                const data=common.success(result,messages.Messages.MSG_SAVED,Enums.ErrorCode.success);
                return res.json({data});
            
           
           });  
        },

        
        getEmployeeSkillTag:(req,res)=>
        {
           const body = req.body;
           service.getEmployeeSkillTag(body,(err,result)=>
           {
            if (err)
            {
                const data=common.error(err,messages.Messages.MSG_INVALID_DATA,Enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result==0)
            {
                const data=common.error(messages.Messages.MSG_no_to_user_exist,Enums.ErrorCode.not_exist,);
                return res.json({data});
            }
                const data=common.success(result,messages.Messages.MSG_DATA_FOUND,Enums.ErrorCode.success);
                return res.json({data});
            
           
           });  
        },
}

