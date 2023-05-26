const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");
const helperfunctions = require("../helper/helperfunctions");

module.exports={

    hiredProfile:(data,callback)=>{
        pool.query(
            `select jobpost_id from notification where id=?`,
            [data.notification_id],
            (error,result)=>
            {
                if(error)
                {
                    return callback(error,null);
                }
                if(result.length==0)
                {
                    return null;
                }
                console.log("job post id is",result[0].jobpost_id);
                pool.query(
                    `select * from jobpost where id=?`,
                    [
                        result[0].jobpost_id,
                    ],
                    (err,results)=>{
                        if(err)
                        {
                            return callback(err,null);
                        }
                        const price=helperfunctions.calculateTotalAmount(results[0].start_time,results[0].end_time,results[0].start_date.toISOString().substring(0, 10),results[0].end_date.toISOString().substring(0, 10),results[0].rate);
                        const timeDiff=results.start_date - new Date().toISOString().substring(0,19);
                        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                        let id=0;
                        if(days>0)
                        {
                            id=13
                        }else
                        {
                            id=12
                        }

                        pool.query(
                            `insert into hired_profile (employee_id, employer_id, job_post_id, price, status_id,created_on,action_type) values(?,?,?,?,?,?,?)`,
                            [
                            data.employee_id,
                            data.employer_id,
                            result[0].jobpost_id,
                            price,
                            id,
                            new Date().toISOString().substring(0, 19).replace('T', ' '),
                            1
                            ],
                            (error_insert,result_insert)=>
                            {
                                if(error_insert)
                                {
                                    return callback(error_insert,null);
                                }
                                return callback(null,result_insert);
                            }
                        )
                    }
                )
            }
        )
    },
 
    dashboardApi:(data,callback)=>
    {
        pool.query(
            `update hired_profile h join jobpost j on h.job_post_id = j.id set h.status_id=12 where j.start_date<? and j.end_date>?`,
            [                           
                 new Date().toISOString().substring(0, 19).replace('T', ' '),    
                 new Date().toISOString().substring(0, 19).replace('T', ' '),
            ],
            (err,result)=>{
                if(err)
                {
                    return callback(err,null);
                }
                pool.query(
                    `update hired_profile h join jobpost j on h.job_post_id = j.id set h.status_id = 14 where j.end_date<?`,
                [new Date().toISOString().substring(0,19).replace('T', ' ' )],
                (error,results)=>{
                    if(error)
                    {
                        return callback(error,null);
                    }
                }
                )
            }
        )

                            
         pool.query
         (
             `select user_identity from user where id=?`,
            [data.user_id],
             (err,result_user_identity)=>
             {
               if(err)
                 {
                    return callback(err,null);
                 }
                 if(result_user_identity[0].user_identity=="employee")
                 {
                     pool.query(
                         `select count (*) as total from hired_profile where employee_id=?`,
                         [data.user_id],
                         (error,totalCount)=>
                         {
                             if(error)
                             {
                                 return callback(error,null);
                             }
                             pool.query(
                                 `select count(*) as complete from hired_profile where employee_id=? and status_id=14 `,
                                 [
                                     data.user_id,
                                 ],
                                 (error,completeCount)=>
                                 {
                                     if(error)
                                     {
                                         return callback(error,null);
                                     }
                                     let order=helperfunctions.percentageCalculate(totalCount[0].total,completeCount[0].complete);
                                     pool.query(
                                         `select h.status_id, h.price, e.name, e.image_path, j.title, j.end_date from hired_profile h join user u on h.employer_id=u.id join jobpost j on h.job_post_id=j.id join employer e on u.id=e.user_id where h.employee_id=?`,
                                         [data.user_id],
                                         (error,result)=>
                                         {
                                             if (error)
                                             {
                                                 return callback(error,null);
                                             }
                                             let finalResult={
                                                 order:order,
                                                 status_id:result[0].status_id,
                                                 price:result[0].price,
                                                 employer_name:result[0].employer_name,
                                                 image_path:result[0].image_path,   
                                                 title:result[0].title,
                                                 end_date:result[0].end_date,
                                             }
                                             return callback(null,finalResult);
                                         }
                                     )
                                    
                                 }
                             )
                         }
         
                     )
         
         
                    
                 }
                 if(result_user_identity[0].user_identity=="employer")
                 {
                     pool.query(
                         `select h.status_id, h.price, e.name, e.image_path, j.title, j.end_date from hired_profile h join user u on h.employee_id=u.id join jobpost j on h.job_post_id=j.id join employee e on u.id=e.user_id where h.employer_id=?`,
                         [data.user_id],
                         (error,result)=>
                         {
                             if (error)
                             {
                                 return callback(error,null);
                             }
                             let finalResult={
                                 status_id:result[0].status_id,
                                 price:result[0].price,
                                 employer_name:result[0].employer_name,
                                 image_path:result[0].image_path,
                                 title:result[0].title,
                                 end_date:result[0].end_date,
                             }
                             return callback(null,finalResult);
                         }
                     )
                 }
            }
       )
    }



}


