const pool =require("../../config/database");
const Messages = require("../helper/constants/Messages");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");
const helperfunctions = require("../helper/helperfunctions");

module.exports={


    // ..........................Hired Profile.........................................

    //when ever an employee get hired data saved in hired profile and notification generated

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
                                var employer_name="hy";
                                pool.query(`select name from employer where user_id=?`,
                                [data.employer_id],
                                (e,r)=>
                                {
                                    if(e)
                                    {return callback(e,nul);} 
                                    employer_name=r[0].name;
                                    var job_post_name;
                                    pool.query(
                                        `select title from jobpost where id=?`,
                                        [result[0].jobpost_id],
                                        (e,r)=>{
                                            if(e)
                                            {return callback(e,nul);} 
                                            job_post_name=r[0].title;
                                            var body=
                                            "Congratulations "+employer_name+
                                            " has selected you for the job "+job_post_name;
                                            
                                            pool.query(
                                                `insert into notification (title, body, sender_id, reciever_id, jobpost_id, hiredprofile_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?,?)`,
                                                [
                                                    Messages.Messages.MSG_NOTIFICATION_HIRED,
                                                    body,
                                                    data.employer_id,
                                                    data.employee_id,
                                                    result[0].jobpost_id,
                                                    result_insert.insertId,
                                                    18,
                                                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                                                    1
                                                ],
                                                (error_inserts,result_inserts)=>
                                                {
                                                    if(error_inserts)
                                                    {
                                                        return callback(error_inserts,null);
                                                    }
                                                    return callback(result_inserts);
                                                }
                                            )
                                        } )
                               
                                })
                               
                               
                            }
                        )
                    }
                )
            }
        )
    },
 
    //..........................Dash Board API................................................
    dashboardApi:(data,callback)=>
    {

        //when ever user load dashboard job statuses updated on the bases of current date
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

                     
        //getting all required data to employee or employer

        //seeking is the required user id employee or employer
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

                 //if user is employee then getting required data for employee 
                 if(result_user_identity[0].user_identity=="employee")
                 {
                   //getting total jobs of an employee for order
                     pool.query(
                         `select count (*) as total from hired_profile where employee_id=?`,
                         [data.user_id],
                         (error,totalCount)=>
                         {
                             if(error)
                             {
                                 return callback(error,null);
                             }
                             //getting completed jobs of an employee for order
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
                                     //calculating order percentage
                                     let order=helperfunctions.percentageCalculate(totalCount[0].total,completeCount[0].complete);
                                    
                                     //getting employee data from different tables
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

                 //if user is employer then getting required data for employer
                 
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
    },
    
    //..........................Notification generating when ever an employee showed interest on job post.............
    applyJob:(data,callback)=>{
        //only two inputs are here jobpost_id and employee_id
        //getting employee name to use it in title and body of notification
        var employee_name;
        pool.query(`select name from employee where user_id=?`,
        [data.employee_id],
        (e,r)=>
        {
            if(e)
            {return callback(e,null);} 
            employee_name=r[0].name;

            //title of notification
            var title=employee_name+ " is interested";

            //getting title of jobpost which will serve in body of notification and employer id
            //to use it to get employer name which will also be used inside body also id will be used
            //in reciever id
            var job_post_name;
            pool.query(
                `select title, employer_id from jobpost where id=?`,
                [data.jobpost_id],
                (e,r)=>{
                    if(e)
                    {return callback(e,null);} 
                    job_post_name=r[0].title;
                   
                    //getting employer user_id and name 

                    pool.query(
                        `select user_id, name from employer where id=? `,
                        [r[0].employer_id],
                        (er,re)=>{
                            if(er)
                            {
                                return callback(er,null);
                            }

                            //making the body of notification
                            var employer_name=re[0].name;
                            var employer_id=re[0].user_id;
                            var body="Hey "+employer_name+
                            "! "+employee_name+" showed interest on your job "+job_post_name;

                            //saving data in to the notification table
                            pool.query(
                                `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                                [
                                    title,
                                    body,
                                    data.employee_id,
                                    employer_id,
                                    data.jobpost_id,
                                    17,
                                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                                    1
                                ],
                                (error_inserts,result_inserts)=>
                                {
                                    if(error_inserts)
                                    {
                                        return callback(error_inserts,null);
                                    }
                                    return callback(null,result_inserts);
                                }
                            )
                        }
                    )
                   
                } )
       
        })
    }

}


