const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={

    //.................Get All Users...............//
  getAllUsers: (body, callback) => {
  
    const startingLimit=(body.page-1)*body.limit;
    pool.query(
      `select * from employee LIMIT ${startingLimit},${body.limit}`,
      [],
      (err, result)=>{
        if (err){
          return callback(err,null);
        }
        pool.query(
          `s{
            elect count(*) from employee `,
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
    getUser: (data,callback)=>{

        //code is not working need to see 

        // pool.query(
        //     "select * from user where email=?",
        //     [
        //       data.email
        //     ],
        //     (err, result)=>{
        //       if (err){
        //         return callback(err,null);
        //       }
        //       console.log(result.insertId);
        //       pool.query(
        //         "select * from employee where user_id=?",
        //         [
        //             result.insertId
        //         ],
        //         (error,results)=>{
        //             if(err){
        //                 return callback(error,null);
        //             }
        //             return callback(null,results);
        //         }
        //       )
               
    
        //     }
        //   )
    }
}
