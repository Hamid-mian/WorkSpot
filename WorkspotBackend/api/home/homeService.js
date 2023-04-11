const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={



    jobPost:(data,callback)=>{
      pool.query(
        `select * from user where email=?`,
        [data.email],
        (error,results)=>{
          if(error)
          {
            return callback(error,null);
          }
          const user = results[0];
          pool.query(
            `insert into jobpost(Employer_id,title,description,location,start_time,end_time,duration,start_date,end_date,rate,tags) values(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                user.id,
                data.title,
                data.description,
                data.location,
                data.startTime,
                data.endTime,
                data.duration,
                data.startDate,
                data.endDate,
                data.rate,
                data.tags
            ],
            (err,result)=>{
                if(err){
                    return callback(err,null);
                }
                return callback(null,result);
            }
        )
        }
      )
       
    },

    getAllCards: (body, callback) => {
  
        const startingLimit=(body.page-1)*body.limit;
        pool.query(
          `select * from jobpost LIMIT ${startingLimit},${body.limit}`,
          [],
          (err, result)=>{
            if (err){
              return callback(err,null);
            } // desc arrangement            //1.get all 2.tags 3.
            pool.query(
              `select count(*) from jobpost `,
              [],
              (error,results)=>
              {
                if(error){
                  return callback(error,null);
                }
      
                const data={
                  users:result,
                  totalCount:results[0]["count(*)"],
                }
                return callback(null,data);
              }
            )
          }
        )
        },
}