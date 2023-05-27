const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={

    //Posting a new job

    jobPost:(data,callback)=>{
      pool.query(
        `select id from user where email=?`,
        [data.email],
        (error,result)=>{
          if(error)
          {
            return callback(error,null);
          }
          pool.query(
            `select id from employer where user_id=?`,
            [result[0].id],
            (error,results)=>{
              if(error)
              {
                return callback(error,null);
              } 
              pool.query(
                `insert into jobpost(Employer_id,title,description,location,start_time,end_time,start_date,end_date,rate,req_employee,created_on,updated_on,action_type) values(?,?,?.?,?,?,?,?,?,?,?,?,?)`,
                [
                  results[0].id,
                    data.title,
                    data.description,
                    data.location,
                    data.startTime,
                    data.endTime,
                    data.startDate,
                    data.endDate,
                    data.req_employee,
                    data.rate,
                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                    1
                ],
                (err,result)=>{
                    if(err){
                        return callback(err,null);
                    }
                    for (const tag of data.tag)
                    {
                      pool.query(
                        `insert into jobpost_tag(tag_id, jobpost_id) values(?,?)`,
                        [
                          tag.tag_id,
                          result.insertId
                        ],
                        (err,result)=>{
                          if(err)
                          {
                            return callback(err,null);
                          }
                        })
                    }
                    //this query is used to get all tags of employees
                    // pool.query(
                    //  `select tag_id, employee_id from employee_tag groupBy employee_id`,
                    //  [],
                    //  (err,result)=>{
                    //   if(err)
                    //   {
                    //     return callback(err,null);
                    //   }
                    //   const numbers = [];
                    //   var i=0;
                    //   foreach(tag in result)
                    //   {
                    //    //here you need to store count and id of employee then apply algorithem
                    //    number[i]= helper.countMatchingElements(data.tag,tag.tag_id)
                    //    i++
                    //   }
                    // })
                    return callback(null,result);
                }
            )

            }
          )    
         
        }
      )
       
    },


    //updating post
    jobPostUpdate:(data,callback)=>{
      pool.query(
        `select * from jobpost where id=?`,
        [data.id],
        (error,result)=>{
          if(error)
          {
            return callback(error,null);
          }
          if(result==0)
          {
            let finalResult={
              err_code:enums.NotFound.id
            }
            return callback(null,finalResult);
          }

           
            
          let query="update jobpost set "
          let values=[];
          let isFirst=true;
          if(data.title)
          {
            query+=` title=?, `;
            values.push(data.title);
            isFirst=false;
          }
          if(data.description)
          {
            query+=`${isFirst ? ' ': ' '}description=?, `;
            values.push(data.description);
            isFirst=false;
          }
          if(data.location){
            query+=`${isFirst ? ' ': ' '}location=?, `;
            values.push(data.location);
            isFirst=false;
          }
          if(data.startTime){
            query+=`${isFirst ? ' ': ' '}start_time=?, `;
            values.push(data.startTime);
            isFirst=false;
          }
          if(data.endTime){
            query+=`${isFirst ? ' ': ' '}end_time=?, `;
            values.push(data.endTime);
            isFirst=false;
          }
          if(data.startDate){
            query+=`${isFirst ? ' ': ' '}start_date=?, `;
            values.push(data.startDate);
            isFirst=false;
          }
          if(data.endDate){
            query+=`${isFirst ? ' ': ' '}end_date=?, `;
            values.push(data.endDate);
            isFirst=false;
          }
          if(data.req_employee){
            query+=`${isFirst ? ' ': ' '}req_employee = ?, `;
            values.push(data.req_employee);
            isFirst=false;
          }
          //updating tags

          if(data.tag)
          {
            for (const tag of data.tag)
            {
                      pool.query(
                        `update jobpost_tag set name=? where jobpost_id=? `,
                        [tag.name,data.id],
                        (err,result)=>{
                          if(err)
                          {
                            return callback(err,null);
                          }
                          return callback(null,result);
                        })
                    }
          }
            query+=`${isFirst ? ' ': ' '}updated_on=?, `;
            values.push(new Date().toISOString().substring(0, 19).replace('T', ' '));
            
           
            query+=`${isFirst ? ' ': ' '}action_type=? `;
            values.push(2);

          query+=`where id=?`;
          values.push(data.id);

      
      pool.query(query, values, (err, result) => 
      {
          if (err) 
          {
              return callback(err);
          } else {
              return callback(null, result);
          }
      });

            })
    },

    //getting all posts
    getAllPost: (body, callback) => {
  
      pool.query(
        `update jobpost set jobpost_status =0 where end_date<?`,
        [new Date().toISOString().substring(0.19).replace(`T`, ` `)],
      (errr, resultr) => {
        if (errr) {
          return callback(errr,null);
      }
      const startingLimit=(body.page-1)*body.limit;
      pool.query(
        `select j.*, e.image_path from jobpost j join employer e on j.employer_id = e.id where j.action_type	<> 3 Order By j.id desc LIMIT ${startingLimit},${body.limit}  `,
        [],
        (err, result)=>{
          if (err){
            return callback(err,null);
          } 
          pool.query(
            `select count(*) from jobpost where action_type <> 3 `,
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
      }
      )
       
        },
    

    getPostById: (body, callback)=>
    {
      pool.query(
        `select j.*, e.image_path from jobpost j join employer e on j.employer_id = e.id where j.id = ?`,
        [body.jobPost_id],
        (err, result)=>{
          if(err)
          {
            return callback(err,null);
          }
          console.log(result[0].image_path)
          return callback(null,result);
        }
      )
    },

    //get all tags
    getAllTags: (body,callback)=>{
    pool.query(
      `select id from lookup where name = "tag" `,
      [],
      (err,result)=>{
        if(err)
        {
          return callback(err,null);
        }
        pool.query(
          `select * from lookup where parent_id=?`,
          [result[0].id],
          (error,result)=>{
            if(error)
            {
              return callback(error,null);
            }
            return callback(null,result);
          }
        )
      }
    )
    },

    //get all skills
    getAllSkills: (body,callback)=>{
      pool.query(
        `select id from lookup where name = "skill" `,
        [],
        (err,result)=>{
          if(err)
          {
            return callback(err,null);
          }
          pool.query(
            `select * from lookup where parent_id=?`,
            [result[0].id],
            (error,result)=>{
              if(error)
              {
                return callback(error,null);
              }
              return callback(null,result);
            }
          )
        }
      )
      }
    

}
