const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={

    //.................Get All Users...............//
  getAllUsers: (body, callback) =>
   {
  
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

      //code not working
    //   pool.query (
    //     `select * from user u join employee e on e.user_id=u.id join employee_tag et on et.employee_id=e.id join employee_skill es on es.employee_id=e.id  where u.id=?`,
    //     [data.user_id],
    //     (err, result) => {
    //     if(err)
    //     {
    //       return callback(err,null);
    //     }
    //     const image_path = result.image_path;
    // console.log(image_path);
    //     return callback(null,result);
    //     }

    //   )
       
    }
}
