const pool = require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");
const enums=require("../helper/constants/Enums");
const Paths= require("../helper/constants/Paths");


module.exports={


  //.................post employee......................
  post:(data,callback)=>
  {
        
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;


        //check if the user is here for new entry or update 
        //For new entry


        if(data.id===0)
        {
          const query = `INSERT INTO user(user_identity,email, password, verification_code,code_generation_time,is_verified,action_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          
          pool.query(
            query,
            [
              data.role_type,
              data.email,
              data.password,
              randomNumber,
              new Date().toISOString().substring(0, 19).replace('T', ' '),
              0,
              1,
            ],
            (err, result) => 
            {

              //store error code in variable in order to show it on the screen

              
              if (err) 
              {
                let finalResult={
                  err_code:enums.NotFound.duplicateMail
                  
                }
              return callback(null, finalResult);
              }

              //if user_identity is employee then adding data into the employee table
              if(data.user_identity=='employee')
              {
                console.log("employee");
                pool.query(
                  `insert into employee(user_id,name,created_on) values(?,?,?)`,
                  [
                    result.insertId,
                    data.name,
                    new Date().toISOString().substring(0, 19).replace('T', ' ')
                  ],
                  (error,results)=>{
                    if(error)
                    {
                      return callback(error,null);
                    }
                    data.code=randomNumber;
                    helper.sendingEmail(data);
                    return callback(null,results)
                  }
                )
              }else
                //if user_identity is employee then adding data into the employee table

              if(data.user_identity=="employer")
              {
                pool.query(
                  `insert into employer(user_id,name,created_on) values(?,?,?)`,
                  [
                    result.insertId,
                    data.name,
                    new Date().toISOString().substring(0, 19).replace('T', ' ')
                  ],
                  (error,results)=>{
                    if(error)
                    {
                      return callback(error,null);
                    }
                    data.code=randomNumber;
                    helper.sendingEmail(data);
                    return callback(null,results)
                  }
                )
              }  else{
                return callback(null, result);
              }
             
            }
          )  
        }
    

        //if user is already exists the update data of that user
        if(data.id>0)
        {
          const query=`select * from user where id = ?`;
          pool.query(
            query,
            [data.id],
            (err,result)=>
            {
              if(err)
              {
                return callback(err,null);
              }
              if(result==0)
              {
                let finalResult={
                  err_code:enums.NotFound.Id
                }
                return callback(null,finalResult);
              }


              // code for employee to update his profile 
             if(result[0].user_identity=="employee")
             {
              let query1="update employee set "
              let values=[];
              let isFirst=true;

              if(data.name)
              {
                query1+=`name=?, `;
                values.push(data.name);
                isFirst=false;
              }
              if(data.cnic)
              {
                query1+=`${isFirst ? ' ': ' '}cnic=?,`;
                values.push(data.cnic);
                isFirst=false;
              }
              if(data.description)
              {
                query1+=`${isFirst ? ' ': ' '}description=?,`;
                values.push(data.description);
                isFirst=false;
              }
              if(data.location)
              {
                query1+=`${isFirst ? ' ': ' '}location=?,`;
                values.push(data.location);
                isFirst=false;
              }
              // if(file){
              //   query+=`${isFirst ? ' ': ' '}image_path=?`;
              //   values.push(Paths.Paths.USER_IMAGE+"/"+ file.filename);
              //   isFirst=false;
              // }
              if(data.education)
              {
                query1+=`${isFirst ? ' ': ' '}education=?,`;
                values.push(data.education);
                isFirst=false;
              }
              if(data.phone)
              {
                query1+=`${isFirst ? ' ': ' '}phone=?,`;
                values.push(data.phone);
                isFirst=false;
              }

              query1+=` edited_on=?, action_type=? where user_id=?`;
              values.push(new Date().toISOString().substring(0, 19).replace('T', ' '));
              values.push(2);
              values.push(data.id);
              pool.query(query1, values, (err, result_update) => 
              {
                  if (err) 
                  {
                      return callback(err);
                  } 
              });

              //......................getting employee id for the purpose to store tags in employee table 
              pool.query(
                `select * from employee where user_id=? and action_type<>3 `,
                [
                  result[0].id
                ],
                (error,result_employee)=>{
                  if(error)
                  {
                    return callback(error,null);
                  }
                  // if employee exists then it will add tags into the table
                 if(result_employee.length > 0)
                 {
                    // storing tags into the employee tag table and get 
                    if(data.tag)
                    {
                      //first delete existing tags then add new tags
                      pool.query(
                        `delete from employee_tag where employee_id=?`,
                        [result_employee[0].id],
                        (error,result_delete_tag)=>{
                          if(error)
                          {
                            return callback(error,null);
                          }
                          for (const item of data.tag)
                          {
                            pool.query(
                              `insert into employee_tag(tag_id, employee_id, created_on) values(?,?,?)`,
                              [
                                item.tag_id,
                                result_employee[0].id,
                                new Date().toISOString().substring(0, 19).replace('T', ' ')
                              ],
                              (error,result_tag)=>
                              {
                                if(error)
                                {
                                  return callback(error,null);
                                }
                              }
                            )
                          }

                        }
                      )
                      
                     
                    }

                    // will delete all previous skills of specific employee and add new skills
                    if(data.skill)
                    {
                      pool.query(
                        `delete from employee_skill where employee_id=?`,
                        [result_employee[0].id],
                        (error,result_delete_tag)=>{
                          if(error)
                          {
                            return callback(error,null);
                          }
                          
                            for (const item of data.skill)
                            {
                              pool.query(
                                `insert into employee_skill(employee_id, skill_id, created_on) values(?,?,?)`,
                                [
                                  result_employee[0].id,
                                  item.skill_id,
                                  new Date().toISOString().substring(0, 19).replace('T', ' ')
                                ],
                                (error,result_tag)=>
                                {
                                  if(error)
                                  {
                                    return callback(error,null);
                                  }
                                }
                              )
                            }
                           
                          }
                          )                 
                    }
                  
                 }
                 return callback(null,result_employee);
                }
              )
             }


             // code for employer to update his profile    

             if(result[0].user_identity=="employer")
             {
              let query1="update employer set "
              let values=[];
              let isFirst=true;

              if(data.name)
              {
                query1+=`name=?, `;
                values.push(data.name);
                isFirst=false;
              }
              if(data.brand_name)
              {
                query1+=`${isFirst ? ' ': ' '}brand_name=?,`;
                values.push(data.brand_name);
                isFirst=false;
              }
              if(data.reg_no)
              {
                query1+=`${isFirst ? ' ': ' '}reg_no=?,`;
                values.push(data.reg_no);
                isFirst=false;
              }
              if(data.no_of_employee)
              {
                query1+=`${isFirst ? ' ': ' '}no_of_employee=?,`;
                values.push(data.no_of_employee);
                isFirst=false;
              }
              // if(file){
              //   query+=`${isFirst ? ' ': ' '}image_path=?`;
              //   values.push(Paths.Paths.USER_IMAGE+"/"+ file.filename);
              //   isFirst=false;
              // }
              if(data.description)
              {
                query1+=`${isFirst ? ' ': ' '}description=?,`;
                values.push(data.description);
                isFirst=false;
              }
              if(data.location)
              {
                query1+=`${isFirst ? ' ': ' '}location=?,`;
                values.push(data.location);
                isFirst=false;
              }
              if(data.phone)
              {
                query1+=`${isFirst ? ' ': ' '}phone=?,`;
                values.push(data.phone);
                isFirst=false;
              }
              if(data.business_type)
              {
                query1+=`${isFirst ? ' ': ' '}business_type=?,`;
                values.push(data.business_type);
                isFirst=false;
              }

              query1+=` edited_on=?, action_type=? where user_id=?`;
              values.push(new Date().toISOString().substring(0, 19).replace('T', ' '));
              values.push(2);
              values.push(data.id);
              pool.query(query1, values, (err, result_update) => 
              {
                  if (err) 
                  {
                      return callback(err);
                  } 
                  return callback(null,result_update);
              });

              
             }
            }
          )
        }
  },

  //....................login user...................

  login:(data,callback)=>{
   //first verify email and user is not deleted
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

        //Match password and email of user
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

            //if password match then check is user verified or not

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

                //if user is employee then all the employee data to scree
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


                }else 
                //if user is employer then send all the data to screen
                
                if(user.user_identity=="employer")
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

  //............reset password............

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

    //if user is login then get email and password and update new password
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

//....................generate verification code...................
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

  //.............Verify Code ...............

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

  //...........forget password .............

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

    //if user forget the password then generate new verification code and send email to that verification code 
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

     //................Create User Image .........................
     imageUpload:(body,file,callback)=>{

      //as we are getting user id we need to check employee or employer then update that table
      pool.query(
        `select * from user where id =?`,
        [body.id],
        (err,result)=>{
          if(err)
          {
            return callback(err,null);
          }
          if(result==0)
          {
            let finalResult={
              err_code:enums.NotFound.Id
            }
            return callback(null,finalResult);
          }
          if(result[0].user_identity=="employee")
          {
            pool.query(
              `update employee set image_path=? where user_id=? `,
              [
                Paths.Paths.USER_IMAGE+ "/" +file.filename,
                result[0].id
              ],
              (error,results)=>{
                if(error){
                 return  callback(error,null);
                }
                return callback(null,results)
              }
              )  
          }
          if(result[0].user_identity=="employer")
          {
            pool.query(
              `update employer set image_path=? where user_id=? `,
              [
                Paths.Paths.USER_IMAGE+ "/" +file.filename,
                result[0].id
              ],
              (error,results)=>{
                if(error){
                 return  callback(error,null);
                }
                return callback(null,results)
              }
              )  
          }
        
        }
      )
      
},
}