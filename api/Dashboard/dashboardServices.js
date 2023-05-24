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
    }

}
