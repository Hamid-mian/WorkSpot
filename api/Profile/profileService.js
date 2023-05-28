const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={

    //.................Get All Users only those who are employees...............//
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
         //getting count for pagination
         pool.query(
           `select count(*) from employee `,
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



//............................getting user to show profile...............................
    getUser: (body,callback)=>{

      //query to get all data from user table, all data from respective employee table and also the tags,skills
      pool.query (
       `SELECT u.*, e.*, et.tag_id, es.skill_id
       FROM user u
       JOIN employee e ON e.user_id = u.id
       LEFT JOIN (
           SELECT employee_id, GROUP_CONCAT(tag_id) AS tag_id
           FROM employee_tag
           GROUP BY employee_id
       ) et ON et.employee_id = e.id
       LEFT JOIN (
           SELECT employee_id, GROUP_CONCAT(skill_id) AS skill_id
           FROM employee_skill
           GROUP BY employee_id
       ) es ON es.employee_id = e.id
       WHERE u.id = ?`,
       [body.user_id],
        (err, result) => {
        if(err)
        {
          return callback(err,null);
        }
        return callback(null,result);
        }

      )
       
    },
}
