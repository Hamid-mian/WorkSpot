const pool = require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");
const enums=require("../helper/constants/Enums");


module.exports={


  //.................post employee......................
  post:(data,callback)=>
  {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        if(data.id===0)
        {
          const query = `INSERT INTO user(user_identity,email, password, verification_code,code_generation_time,is_verified,action_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          
          pool.query(
            query,
            [
              data.user_identity,
              data.email,
              data.password,
              randomNumber,
              new Date().toISOString().substring(0, 19).replace('T', ' '),
              0,
              1,
            ],
            (err, result) => 
            {
              if (err) 
              {
              return callback(err, null);
              }
              if(data.user_identity=='employee')
              {
                console.log("employee");
                pool.query(
                  `insert into employee(user_id,name) values(?,?)`,
                  [
                    result.insertId,
                    data.name
                  ],
                  (error,results)=>{
                    if(error)
                    {
                      return callback(error,null);
                    }
                    return callback(null,results)
                  }
                )
              }else
              if(data.user_identity=="employer")
              {
                pool.query(
                  `insert into employer(user_id,name) values(?,?)`,
                  [
                    result.insertId,
                    data.name
                  ],
                  (error,results)=>{
                    if(error)
                    {
                      return callback(error,null);
                    }
                    return callback(null,results)
                  }
                )
              }  else{
                return callback(null, result);
              }
             
            }
          )  
        }
    
        // if(data.id>0)
        // {
        //   const query=`select * from user where id = ?`;
        //   pool.query(
        //     query,
        //     [data.id],
        //     (err,result)=>
        //     {
        //       if(err)
        //       {
        //         return callback(err,null);
        //       }
        //       if(result==0)
        //       {
        //         return callback(null,result);
        //       }
    
        //       let query1="update user set "
        //       let values=[];
        //       let isFirst=true;
        //       if(data.email)
        //       {
        //         query1+=` email=?, `;
        //         values.push(data.email);
        //         isFirst=false;
        //       }
        //       if(data.page)
        //       {
        //         query+=`${isFirst ? ' ': ' '}password=?,`;
        //         values.push(data.password);
        //         isFirst=false;
        //       }
        //       if(data.){
        //         query+=`${isFirst ? ' ': ' '}Phone=?`;
        //         values.push(data.Phone);
        //         isFirst=false;
        //       }
        //   // if(file){
        //   //   query+=`${isFirst ? ' ': ' '}image_path=?`;
        //   //   values.push(Paths.Paths.USER_IMAGE+"/"+ file.filename);
        //   //   isFirst=false;
        //   // }
        //       query+=`where id=?`;
        //       values.push(data.id);
    
          
        //   pool.query(query, values, (err, result) => 
        //   {
        //       if (err) 
        //       {
        //           return callback(err);
        //       } else {
        //           return callback(null, result);
        //       }
        //   });
    
    
    
    
    
        //     }
        //   )
        // }
  },

  //............Post employer.............

  // postEmployer:(data,callback)=>
  // {
  //       const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  //       if(data.id===0)
  //       {
  //         const query = `INSERT INTO useremployer(email, password, verification_code,code_generation_time,is_verified,action_type) VALUES (?, ?, ?, ?, ?, ?)`;
          
  //         pool.query(
  //           query,
  //           [
  //             data.email,
  //             data.password,
  //             randomNumber,
  //             new Date().toISOString().substring(0, 19).replace('T', ' '),
  //             0,
  //             1,
  //           ],
  //           (err, result) => 
  //           {
  //             if (err) 
  //             {
  //             return callback(err, null);
  //             }  
  //             data.code=randomNumber;
  //             helper.sendingEmail(data);
  //             return callback(null, result);
  //           }
  //         )  
  //       }
    
  //       // if(data.id>0)
  //       // {
  //       //   const query=`select * from user where id = ?`;
  //       //   pool.query(
  //       //     query,
  //       //     [data.id],
  //       //     (err,result)=>
  //       //     {
  //       //       if(err)
  //       //       {
  //       //         return callback(err,null);
  //       //       }
  //       //       if(result==0)
  //       //       {
  //       //         return callback(null,result);
  //       //       }
    
  //       //       let query1="update user set "
  //       //       let values=[];
  //       //       let isFirst=true;
  //       //       if(data.email)
  //       //       {
  //       //         query1+=` email=?, `;
  //       //         values.push(data.email);
  //       //         isFirst=false;
  //       //       }
  //       //       if(data.page)
  //       //       {
  //       //         query+=`${isFirst ? ' ': ' '}password=?,`;
  //       //         values.push(data.password);
  //       //         isFirst=false;
  //       //       }
  //       //       if(data.){
  //       //         query+=`${isFirst ? ' ': ' '}Phone=?`;
  //       //         values.push(data.Phone);
  //       //         isFirst=false;
  //       //       }
  //       //   // if(file){
  //       //   //   query+=`${isFirst ? ' ': ' '}image_path=?`;
  //       //   //   values.push(Paths.Paths.USER_IMAGE+"/"+ file.filename);
  //       //   //   isFirst=false;
  //       //   // }
  //       //       query+=`where id=?`;
  //       //       values.push(data.id);
    
          
  //       //   pool.query(query, values, (err, result) => 
  //       //   {
  //       //       if (err) 
  //       //       {
  //       //           return callback(err);
  //       //       } else {
  //       //           return callback(null, result);
  //       //       }
  //       //   });
    
    
    
    
    
  //       //     }
  //       //   )
  //       // }
  // },

  //............login Employee...............

  login:(data,callback)=>{
   
    pool.query(
      `select * from user where email=? and action_type<>3`,
      [
        data.email
      ],
      (err, result)=>
      {
        if(err){
          return callback(err,null);
        }
        if(result==0)
        {
          let finalResult={
            err_code:enums.NotFound.Email
          }
          return callback(null,finalResult);
        }
        pool.query(
          `select * from user where email=? and password=?`,
          [ 
            data.email,
            data.password
          ],
          (error,results)=>{
            if(error)
            {
              return callback(error,null);
            }
            if(results==0)
            {
              let finalResult={
                err_code:enums.NotFound.Password
              }
              return callback(null,finalResult);
            }
            pool.query(
              `select * from user where email=? and is_verified=1`,
              [
                data.email
              ],
              (error1,resultverify)=>{
                if(error1){
                  return callback(error1,null);
                }
                if(resultverify==0)
                {
                  let finalResult={
                    err_code:enums.ErrorCode.not_verified
                  }
                  return callback(null,finalResult);
                }
                var user=resultverify[0];
                if(user.user_identity=="employee")
                {
                  pool.query(
                    `select * from employee where user_id=? `,
                    [user.id],
                    (error2,resultemployee)=>
                    {
                      if(error2)
                      {
                        return callback(error2,null);
                      }
                      return callback(null,resultemployee);
                    }

                  )
                }else if(user.user_identity=="employer")
                {
                  pool.query(
                    `select * from employer where user_id=? `,
                    [user.id],
                    (error2,resultemployee)=>
                    {
                      if(error2)
                      {
                        return callback(error2,null);
                      }
                      return callback(null,resultemployee);
                    }

                  )
                }else{
                  return callback(null,resultverify);
                }
              }
            )
          }
        )
      }
    )
  },

  //............login Employer............

  // loginEmployer:(data,callback)=>{
  //   pool.query(
  //     `select * from useremployer where email=? and action_type<>3`,
  //     [
  //       data.email
  //     ],
  //     (err,result)=>{
  //       if(err){
  //         return callback(err,null);
  //       }
  //       if(result==0)
  //       {
  //         let finalResult={
  //           err_code:enums.NotFound.Email
  //         }
  //         return callback(null,finalResult);
  //       }
  //       pool.query(
  //         `select * from useremployer where email=? and password=?`,
  //         [ 
  //           data.email,
  //           data.password
  //         ],
  //         (error,results)=>{
  //           if(error)
  //           {
  //             return callback(error,null);
  //           }
  //           if(results==0)
  //           {
  //             let finalResult={
  //               err_code:enums.NotFound.Password
  //             }
  //             return callback(null,finalResult);
  //           }
  //           pool.query(
  //             `select * from useremployer where email=? and is_verified=1`,
  //             [
  //               data.email
  //             ],
  //             (error1,resultverify)=>{
  //               if(error1){
  //                 return callback(error1,null);
  //               }
  //               if(resultverify==0)
  //               {
  //                 let finalResult={
  //                   err_code:enums.ErrorCode.not_verified
  //                 }
  //                 return callback(null,finalResult);
  //               }
  //               return callback(null,resultverify);
  //             }
  //           )
  //         }
  //       )
  //     }
  //   )
  // },

  // logout:(data,callback)=>{
  //   pool.query(
  //     `update user set logout=1 where email=?`,
  //     [data.email],
  //     (err,result)=>{
  //       if(err)
  //       {
  //         return callback(err,null);
  //       }
  //       return callback(null,result);
  //     }
  //   )
  // },

//.................reset password employee...................
  resetPassword:(data,callback)=>{
    pool.query(
      `select * from user where email=? and password=?`,
      [
        data.email,
        data.oldPassword,
      ],
      (err,result)=>
      {
        if(err){
          callback(err,null);
        }
        if(result==0)
        {
          let finalResult={
            err_code:enums.NotFound.Password
          }
          return callback(null,finalResult);
        }  
        pool.query(
          `update user set password=? where email=?`,
          [
            data.newPassword,
            data.email,
          ],
          (error,results)=>{
            if(error)
            {
              return callback(error,null);
            }
            return callback(null,results);
          }
        ) 
      }
    )
  },

//....................reset apassword employer...................
//   resetPasswordEmployer:(data,callback)=>{
//   pool.query(
//     `select * from useremployer where email=? and password=?`,
//     [
//       data.email,
//       data.oldPassword,
//     ],
//     (err,result)=>
//     {
//       if(err){
//         callback(err,null);
//       }
//       if(result==0)
//       {
//         let finalResult={
//           err_code:enums.NotFound.Password
//         }
//         return callback(null,finalResult);
//       }  
//       pool.query(
//         `update useremployer set password=? where email=?`,
//         [
//           data.newPassword,
//           data.email,
//         ],
//         (error,results)=>{
//           if(error)
//           {
//             return callback(error,null);
//           }
//           return callback(null,results);
//         }
//       ) 
//     }
//   )
// },
  //...........generate verification code................
  generateVerificationCode:(data,callback)=>{
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    pool.query(
      `update user set verification_code=?, code_generation_time=? where email=?`,
      [
        randomNumber,
        new Date().toISOString().substring(0,19).replace("T", " "),
        data.email,
      ],
      (err,result)=>{
        if(err)
        {
          return callback(err,null);
        }
        return callback(null,result)
      }
    )
  },

  //.............Verify Code Emplloyee...............

  verifyCode:(data,callback)=>{
    //checking is there user exist at this id?
      pool.query(
      `select * from user where email=?`,
      [data.email],
      (err,result)=>
      {
        if(err)
        {
          return callback(err,null);
        }
        if(result==0)
        {
          let finalResult={
            data:result,
            err_code:enums.NotFound.Email,
          }
          return callback(null,finalResult);
        }
        //matching verification code
        pool.query(
          `select * from user where email=? and verification_code=?` ,
          [
            data.email,
            data.verification_code,
            new Date().toISOString().substring(0,19).replace("T", " "),
          ],
          (error,results)=>{
            if(error)
            {
              return callback(error,null);
            }
            if(results==0)
            {
              let finalResult={
                data:results,
                err_code:enums.NotFound.Code,
              }
              return callback(null,finalResult);
            }
            const datetimeString = new Date(results[0].code_generation_time);
            const currentTime=new Date();
            const isWithin3Min =helper.timeDifference(currentTime,datetimeString);

            //.......If timer is expired...............
            if(isWithin3Min>=3)
            {
              const randomNumber = Math.floor(Math.random() * 900000) + 100000;
              pool.query(
                `update user set verification_code=?, code_generation_time=? where email=?`,
                [
                  randomNumber,
                  new Date().toISOString().substring(0,19).replace("T", " "),
                  data.email,
                ],
                (err,resut)=>{
                  if(err)
                  {
                    return callback(err,null);
                  }
                  let finalResult=
                  {
                     data:results,
                     err_code:enums.NotFound.Time,
                   }
                   data.code=randomNumber;
                   helper.sendingEmail(data);
                   return callback(null,finalResult);
                }
              )
            }
            else{
              //updating verified status
              pool.query(
                `update user set is_verified=1,verification_code=null,code_generation_time=null where email=?`,
                [data.email],
                (errors,resultUpdate)=>
                {
                  if(errors)
                  {
                    return callback(errors,null);
                  }
                  return callback(null,resultUpdate);
                }
                
              ) 
            }

          }
        )
      }
    )
  },

  //...........Verify Code Employer.............

  // verifyCodeEmployer:(data,callback)=>{
  //   //checking is there user exist at this id?
  //     pool.query(
  //     `select * from useremployer where email=?`,
  //     [data.email],
  //     (err,result)=>
  //     {
  //       if(err)
  //       {
  //         return callback(err,null);
  //       }
  //       if(result==0)
  //       {
  //         let finalResult={
  //           data:result,
  //           err_code:enums.NotFound.Email,
  //         }
  //         return callback(null,finalResult);
  //       }
  //       //matching verification code
  //       pool.query(
  //         `select * from useremployer where email=? and verification_code=?` ,
  //         [
  //           data.email,
  //           data.verification_code,
  //           new Date().toISOString().substring(0,19).replace("T", " "),
  //         ],
  //         (error,results)=>{
  //           if(error)
  //           {
  //             return callback(error,null);
  //           }
  //           if(results==0)
  //           {
  //             let finalResult={
  //               data:results,
  //               err_code:enums.NotFound.Code,
  //             }
  //             return callback(null,finalResult);
  //           }
  //           const datetimeString = new Date(results[0].code_generation_time);
  //           const currentTime=new Date();
  //           const isWithin3Min =helper.timeDifference(currentTime,datetimeString);

  //           //.......If timer is expired...............
  //           if(isWithin3Min>=3)
  //           {
  //             const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  //             pool.query(
  //               `update useremployer set verification_code=?, code_generation_time=? where email=?`,
  //               [
  //                 randomNumber,
  //                 new Date().toISOString().substring(0,19).replace("T", " "),
  //                 data.email,
  //               ],
  //               (err,resut)=>{
  //                 if(err)
  //                 {
  //                   return callback(err,null);
  //                 }
  //                 let finalResult=
  //                 {
  //                    data:results,
  //                    err_code:enums.NotFound.Time,
  //                  }
  //                  data.code=randomNumber;
  //                  helper.sendingEmail(data);
  //                  return callback(null,finalResult);
  //               }
  //             )
  //           }
  //           else{
  //             //updating verified status
  //             pool.query(
  //               `update useremployer set is_verified=1,verification_code=null,code_generation_time=null where email=?`,
  //               [data.email],
  //               (errors,resultUpdate)=>
  //               {
  //                 if(errors)
  //                 {
  //                   return callback(errors,null);
  //                 }
  //                 return callback(null,resultUpdate);
  //               }
                
  //             ) 
  //           }

  //         }
  //       )
  //     }
  //   )
  // },

  //...........Forget Password Employee..............

  forgetPassword:(data,callback)=>{
    pool.query(
      `select * from user where email=?`,
      [data.email],
      (err,result)=>{
        if(err)
        {
          return callback(err,null);
        }
        if(result==0)
        {
          let finalResult=
          {
             data:result,
             err_code:enums.NotFound.Email,
           }
         return callback(null,finalResult);
        }
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        pool.query(
          `update user set verification_code=?, code_generation_time=? where email=?`,
          [
            randomNumber,
            new Date().toISOString().substring(0,19).replace("T", " "),
            data.email,
          ],
          (err,result)=>{
            if(err)
            {
              return callback(err,null);
            }
            data.code=randomNumber;
            helper.sendingEmail(data);
            return callback(null,result)
          }
        )
      }
    )
  },

  //..........Forget Password Employer................

  // forgetPasswordEmployer:(data,callback)=>{
  //   pool.query(
  //     `select * from useremployer where email=?`,
  //     [data.email],
  //     (err,result)=>{
  //       if(err)
  //       {
  //         return callback(err,null);
  //       }
  //       if(result==0)
  //       {
  //         let finalResult=
  //         {
  //            data:result,
  //            err_code:enums.NotFound.Email,
  //          }
  //        return callback(null,finalResult);
  //       }
  //       const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  //       pool.query(
  //         `update useremployer set verification_code=?, code_generation_time=? where email=?`,
  //         [
  //           randomNumber,
  //           new Date().toISOString().substring(0,19).replace("T", " "),
  //           data.email,
  //         ],
  //         (err,result)=>{
  //           if(err)
  //           {
  //             return callback(err,null);
  //           }
  //           data.code=randomNumber;
  //           helper.sendingEmail(data);
  //           return callback(null,result)
  //         }
  //       )
  //     }
  //   )
  // },
}