const enums=require ("../helper/constants/Enums");
const service =require("./userService");
const messages=require("../helper/constants/Messages");
const common=require("../helper/common");

module.exports={

    //...........Post Employee..........
    post:(req,res)=>{
        const body=req.body;
        service.post(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
            return res.json({data});
        })
    },

    //..............Post Employer...............
    // postEmployer:(req,res)=>{
    //     const body=req.body;
    //     service.postEmployer(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }
    //         const data=common.success(result,messages.Messages.MSG_SUCCESS,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },

    //................Login Employee................

    login:(req,res)=>{
        const body=req.body;
        service.login(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result.err_code==enums.NotFound.Email)
            {
                const data=common.error(messages.Messages.MSG_EMAIL_NOT_FOUND_OR_USER_DELETED,enums.ErrorCode.not_exist,);
                return res.json({data});
            }
            if(result.err_code==enums.NotFound.Password){
                const data=common.error(messages.Messages.MSG_LOGIN_FAILED,enums.ErrorCode.not_exist,);
                return res.json({data});
            }
            if(result.err_code==enums.ErrorCode.not_verified){
                const data=common.error(messages.Messages.MSG_NOT_VERIFIED,enums.ErrorCode.not_exist,);
                return res.json({data});
            }
            const data=common.success(result,messages.Messages.MSG_LOGIN_SUCCESS,enums.ErrorCode.success);
            return res.json({data});
        })
    },

    //..............Login Employer................

    // loginEmployer:(req,res)=>{
    //     const body=req.body;
    //     service.loginEmployer(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }
    //         if(result.err_code==enums.NotFound.Email)
    //         {
    //             const data=common.error(messages.Messages.MSG_EMAIL_NOT_FOUND_OR_USER_DELETED,enums.ErrorCode.not_exist,);
    //             return res.json({data});
    //         }
    //         if(result.err_code==enums.NotFound.Password){
    //             const data=common.error(messages.Messages.MSG_LOGIN_FAILED,enums.ErrorCode.not_exist,);
    //             return res.json({data});
    //         }
    //         if(result.err_code==enums.ErrorCode.not_verified){
    //             const data=common.error(messages.Messages.MSG_NOT_VERIFIED,enums.ErrorCode.not_exist,);
    //             return res.json({data});
    //         }
    //         const data=common.success(result,messages.Messages.MSG_LOGIN_SUCCESS,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },

    
    // logout:(req,res)=>{
    //     const body =req.body;
    //     service.logout(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_LOGOUT_FAILED,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }
    //         const data=common.success(result,messages.Messages.MSG_LOGOUT_SUCCESS,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },


    generateVerificationCode:(req,res)=>{
        const body=req.body;
        service.generateVerificationCode(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            const data=common.success(result,messages.Messages.MSG_CODE_GENERATED_SUCCESSFULLY,enums.ErrorCode.success);
            return res.json({data});
        })
    },

    //................Reset password of Employee ..................
    resetPassword:(req,res)=>{
        const body=req.body;
        service.resetPassword(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }else if(result.err_code==enums.NotFound.Password)
            {
                const data=common.error(messages.Messages.MSG_INVALID_OLD_PASSWORD,enums.ErrorCode.not_exist,);
                return res.json({data});
            } 
            const data=common.success(result,messages.Messages.MSG_UPDATE_PASSWORD_SUCCESS,enums.ErrorCode.success);
            return res.json({data});
        })
    },
    //...............Reset password of employer................
    // resetPasswordEmployer:(req,res)=>{
    //     const body=req.body;
    //     service.resetPasswordEmployer(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }else if(result.err_code==enums.NotFound.Password)
    //         {
    //             const data=common.error(messages.Messages.MSG_INVALID_OLD_PASSWORD,enums.ErrorCode.not_exist,);
    //             return res.json({data});
    //         } 
    //         const data=common.success(result,messages.Messages.MSG_UPDATE_PASSWORD_SUCCESS,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },

    //.................Forget Password Employer............

    // forgetPasswordEmployer:(req,res)=>{
    //     const body=req.body;
    //     service.forgetPasswordEmployer(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }
    //         if(result.err_code==enums.NotFound.Email)
    //         {
    //             const data=common.error(err,messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist);
    //             return res.json({data});
    //         }
    //         const data=common.success(result,messages.Messages.MSG_CODE_GENERATED_SUCCESSFULLY,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },

    //..............Forget Password Employee.............

    forgetPassword:(req,res)=>{
        const body=req.body;
        service.forgetPassword(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }
            if(result.err_code==enums.NotFound.Email)
            {
                const data=common.error(err,messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist);
                return res.json({data});
            }
            const data=common.success(result,messages.Messages.MSG_CODE_GENERATED_SUCCESSFULLY,enums.ErrorCode.success);
            return res.json({data});
        })
    },

    //...............Verify Code Employee...............

    verifyCode:(req,res)=>
    {
        const body=req.body;
        service.verifyCode(body,(err,result)=>{
            if(err){
                const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
                return res.json({data});
            }else if(result.err_code==enums.NotFound.Email)
            {
                const data=common.error(err,messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist);
                return res.json({data});
            } else if(result.err_code==enums.NotFound.Code)
            {
                const data=common.error(err,messages.Messages.MSG_INVALID_CODE,enums.ErrorCode.not_exist);
                return res.json({data});
            }else if(result.err_code==enums.NotFound.Time)
            {
                const data=common.error(err,messages.Messages.MSG_EXPIRED_CODE_AND_NEW_GENERATED,enums.ErrorCode.not_exist);
                return res.json({data});
            }
            const data=common.success(result,messages.Messages.MSG_CODE_MATCHED_SUCCESSFULLY,enums.ErrorCode.success);
            return res.json({data});
        })
    },

    //..............Verify Code Employer.............

    // verifyCodeEmployer:(req,res)=>
    // {
    //     const body=req.body;
    //     service.verifyCodeEmployer(body,(err,result)=>{
    //         if(err){
    //             const data=common.error(err,messages.Messages.MSG_DB_CONNECTION_ERROR,enums.ErrorCode.failed);
    //             return res.json({data});
    //         }else if(result.err_code==enums.NotFound.Email)
    //         {
    //             const data=common.error(err,messages.Messages.MSG_NO_RECORD,enums.ErrorCode.not_exist);
    //             return res.json({data});
    //         } else if(result.err_code==enums.NotFound.Code)
    //         {
    //             const data=common.error(err,messages.Messages.MSG_INVALID_CODE,enums.ErrorCode.not_exist);
    //             return res.json({data});
    //         }else if(result.err_code==enums.NotFound.Time)
    //         {
    //             const data=common.error(err,messages.Messages.MSG_EXPIRED_CODE_AND_NEW_GENERATED,enums.ErrorCode.not_exist);
    //             return res.json({data});
    //         }
    //         const data=common.success(result,messages.Messages.MSG_CODE_MATCHED_SUCCESSFULLY,enums.ErrorCode.success);
    //         return res.json({data});
    //     })
    // },

}