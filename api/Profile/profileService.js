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

      //query to get all data from user table, all data from respective employee table and also the tags
      pool.query (
      //  `SELECT u.*, e.*, et.tag_id, es.skill_id
      //  FROM user u
      //  JOIN employee e ON e.user_id = u.id
      //  LEFT JOIN (
      //      SELECT employee_id, GROUP_CONCAT(tag_id) AS tag_id
      //      FROM employee_tag
      //      GROUP BY employee_id
      //  ) et ON et.employee_id = e.id
      //  LEFT JOIN (
      //      SELECT employee_id, GROUP_CONCAT(skill_id) AS skill_id
      //      FROM employee_skill
      //      GROUP BY employee_id
      //  ) es ON es.employee_id = e.id
      //  WHERE u.id = ?`,
      //`SELECT e.*, GROUP_CONCAT(r.rating) AS ratings, GROUP_CONCAT(r.review) AS reviews FROM user u LEFT JOIN employee e ON u.id = e.user_id LEFT JOIN review r ON r.to = u.id WHERE u.id = 10 GROUP BY e.id`,
      `SELECT
      IFNULL(SUM(r.rating)/COUNT(r.rating), 0) AS stars,
      e.*,
      u.email,
      u.user_identity,
      u.id
    FROM
      user u
    JOIN
      employee e ON u.id = e.user_id
    LEFT JOIN
      review r ON r.to = u.id
    WHERE
      u.id = ?
    GROUP BY
      e.id, u.email, u.user_identity
    
    
      `,
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


    getreviews:(body,callback)=>{
      const startingLimit=(body.page-1)*body.limit;
      pool.query(
        `select r.* from review r where r.to=? LIMIT ${startingLimit},${body.limit}`,
        [body.user_id],
        (err, result) => {
          if(err)
          {
            return callback(err,null);
          }
           //getting count for pagination
         pool.query(
          `select count(r.id) as count from review r where r.to=? `,
          [body.user_id],
          (error,results)=>
          {
            if(error){
              return callback(error,null);
            }
     
            const data={
              users:result,
              totalCount:results[0].count,
            }
            return callback(null,data);
          }
        )
          }
      )
    },
}
