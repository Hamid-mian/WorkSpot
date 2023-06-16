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
     
      `SELECT IFNULL(SUM(r.rating)/COUNT(r.rating), 0) AS stars, e.*, u.email, u.user_identity, u.id
       FROM user u JOIN employee e ON u.id = e.user_id
       LEFT JOIN review r ON r.to = u.id
       WHERE u.id = ?
       GROUP BY e.id, u.email, u.user_identity`,
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
        `SELECT r.*,
        CASE WHEN u.user_identity = 'employee' THEN e.image_path ELSE er.image_path END AS image_path,
        CASE WHEN u.user_identity = 'employee' THEN e.name ELSE er.name END AS name
        FROM user u
        JOIN review r ON r.from = u.id
        LEFT JOIN employee e ON e.user_id = u.id
        LEFT JOIN employer er ON er.user_id = u.id
        WHERE r.to = ?
        LIMIT ${startingLimit},${body.limit}`,
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

    postReview:(body,callback)=>{
      pool.query(
        `select * from user where id=?`,
        [body.to],
        (err,result)=>{
          if(err){
            return callback(err,null)
          }
          if(result==0)
          {
            return callback(null,result)
          }
          pool.query(
            "Insert into review (rating,review,`to`,`from`) values(?,?,?,?)",
            [
              body.stars,
              body.review,
              body.to,
              body.from
            ],
            (error,results)=>
            {
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

    getEmployeeSkillTag: (body,callback)=>{

      //query to get all data from user table, all data from respective employee table and also the tags
      pool.query (
     
      `SELECT s.skill_id,l.name ,e.user_id 
      from employee_skill s join lookup l on s.skill_id=l.id 
      join employee e on e.id=s.employee_id 
      where e.user_id=?`,
       [body.user_id],
        (err, skills) => {
        if(err)
        {
          return callback(err,null);
        }
        pool.query(
          `SELECT s.tag_id,l.name ,e.user_id 
           from employee_tag s join lookup l on s.tag_id=l.id
           join employee e on e.id=s.employee_id 
           where e.user_id=?;
          `,
          [body.user_id],
          (error, tags) => {
          if(error)
          {
            return callback(error,null);
          }
          let finalResult={
            tag:tags,
            skill:skills
          }
          return callback(null,finalResult);
        }
        )
        }

      )
       
    },
}
