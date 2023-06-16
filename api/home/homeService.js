const pool =require("../../config/database");
const paths=require("../helper/constants/Paths");
const helper=require("../helper/helperfunctions");

module.exports={

    //................Posting a new job....................

    jobPost:(data,callback)=>{

    
      pool.query(
        `select id from user where email=?`,
        [data.email],
        (error,result)=>{
          if(error)
          {
            return callback(error,null);
          }

          //if user exists then get the id and name of the employer as we need it in jobpost
          pool.query(
            `select id, name from employer where user_id=?`,
            [result[0].id],
            (error,results)=>{
              if(error)
              {
                return callback(error,null);
              } 
              //know we have the complete data know post the job
              pool.query(
                `insert into jobpost(Employer_id,title,description, location,start_time,end_time,start_date,end_date,rate,req_employee,created_on,updated_on,action_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                  results[0].id,
                    data.title,
                    data.description,
                    data.location,
                    data.startTime,
                    data.endTime,
                    data.startDate,
                    data.endDate,
                    data.rate,
                    data.req_employee,
                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                    1
                ],
                (err,resultss)=>{
                    if(err){
                        return callback(err,null);
                    }
                    for (const tag of data.tag)
                    {
                      //
                      // insert tags of jobpost
                      pool.query(
                        `insert into jobpost_tag(tag_id, jobpost_id) values(?,?)`,
                        [
                          tag.tag_id,
                          resultss.insertId
                        ],
                        (err,resultee)=>{
                          if(err)
                          {
                            return callback(err,null);
                          }
                        })
                    }

                    //filer 5
                    //after inserting tags know with the help of query match employee tags and jobpost tags if matching entries are more then 5 then get 
                    //employee name and id of those employees
                    pool.query(
                      `SELECT employee.user_id, employee.name FROM employee_tag e1 
                      JOIN employee_tag e ON e1.employee_id = e.employee_id 
                      JOIN employee ON employee.id = e.employee_id 
                      WHERE e1.tag_id 
                      IN ( SELECT tag_id FROM jobpost_tag WHERE jobpost_id = ? ) 
                      GROUP BY e.employee_id HAVING COUNT(DISTINCT e1.tag_id) >= 5;
                      `,
                      [   
                         resultss.insertId
                      ],
                      (error_filter_5,result_filter_5)=>
                      { 


                       if(error_filter_5)
                       {
                        return callback(error_filter_5,null);
                       }
                       //checks if no of employees query got is less then 5 times of total required employees then send them all notifications and further go on to 
                       //get those employees with 4 tags maching
                       var count=0;
                       if(result_filter_5.length<data.req_employee*5)
                       { 
                        //know make body of the notification
                        for(const item of result_filter_5)
                        {
                             //making the body of notification
                             var employee_name=item.name;
                             var employee_id=item.user_id;
                             var body="Hey "+employee_name+
                             "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";

                             // send all of them notifications
                          pool.query(
                            `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                            [
                                data.title,
                                body,
                                result[0].id,
                                employee_id,
                                resultss.insertId,
                                1,
                                new Date().toISOString().substring(0, 19).replace('T', ' '),
                                1
                            ],
                            (error_inserts,result_inserts)=>
                            {
                                if(error_inserts)
                                {
                                    return callback(error_inserts,null);
                                }
                            }
                        )
                          count++;
                        }
                        //again run here pool.query to get tags greater equal 4
                         
                        // towards employees with 4 tags matching
                        pool.query(
                          `SELECT employee.user_id, employee.name FROM employee_tag e1 
                          JOIN employee_tag e ON e1.employee_id = e.employee_id 
                          JOIN employee ON employee.id = e.employee_id 
                          WHERE e1.tag_id 
                          IN ( SELECT tag_id FROM jobpost_tag WHERE jobpost_id = ? ) 
                          GROUP BY e.employee_id HAVING COUNT(DISTINCT e1.tag_id) >= 4 AND COUNT(DISTINCT e1.tag_id) < 5;
                          `,
                          [   
                             resultss.insertId
                          ],
                          (error_filter_4,result_filter_4)=>
                          { 
    
                           if(error_filter_4)
                           {
                            return callback(error_filter_4,null);
                           }
                           if(result_filter_4.length==0)
                           {
                            console.log("no data")
                           }
                           if(result_filter_4.length<(data.req_employee*5 - count))
                           { // console.log("if for part 4");
                            for(const item of result_filter_4)
                            {
                              //console.log("if for part 4");
                                 //making the body of notification
                                 var employee_name=item.name;
                                 var employee_id=item.user_id;
                                 var body="Hey "+employee_name+
                                 "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";
    
                                 //send the notifcations
                              pool.query(
                                `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                                [
                                    data.title,
                                    body,
                                    result[0].id,
                                    employee_id,
                                    resultss.insertId,
                                    1,
                                    new Date().toISOString().substring(0, 19).replace('T', ' '),
                                    1
                                ],
                                (error_inserts,result_inserts)=>
                                {
                                    if(error_inserts)
                                    {
                                        return callback(error_inserts,null);
                                    }
                                }
                            )
                              count++;
                            }
                            //again run here pool.query to get tags greater equal 3
                             
                            pool.query(
                              `SELECT employee.user_id, employee.name FROM employee_tag e1 
                              JOIN employee_tag e ON e1.employee_id = e.employee_id 
                              JOIN employee ON employee.id = e.employee_id 
                              WHERE e1.tag_id 
                              IN ( SELECT tag_id FROM jobpost_tag WHERE jobpost_id = ? ) 
                              GROUP BY e.employee_id HAVING COUNT(DISTINCT e1.tag_id) >= 3 AND COUNT(DISTINCT e1.tag_id) < 4;
                              `,
                              [   
                                 resultss.insertId
                              ],
                              (error_filter_3,result_filter_3)=>
                              { 
        
                               if(error_filter_3)
                               {
                                return callback(error_filter_3,null);
                               }
                              //  if(result_filter_3.length==0)
                              //  {
                              //   console.log("no data")
                              //  }
                               if(result_filter_3.length<(data.req_employee*5 - count))
                               { // console.log("if for part 3");
                                for(const item of result_filter_3)
                                {
                                  //console.log("if for part 3");
                                     //making the body of notification
                                     var employee_name=item.name;
                                     var employee_id=item.user_id;
                                     var body="Hey "+employee_name+
                                     "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";
        
                                     //send the notifcations
                                  pool.query(
                                    `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                                    [
                                        data.title,
                                        body,
                                        result[0].id,
                                        employee_id,
                                        resultss.insertId,
                                        1,
                                        new Date().toISOString().substring(0, 19).replace('T', ' '),
                                        1
                                    ],
                                    (error_inserts,result_inserts)=>
                                    {
                                        if(error_inserts)
                                        {
                                            return callback(error_inserts,null);
                                        }
                                    }
                                )
                                  count++;
                                }
                                 
                              
                               }
    
                               //else part of filter 3 mean if filter 3 got employees more then 3 times of required then send on first 5 times
                               //of employees and stop
                               else{
                                for(const item in result_filter_3)
                                {
                                  if(count>=data.req_employee*5)
                                  {
                                    return callback(null,result);
                                  }
                                  //send notification query
    
                                     
                                //making the body of notification
                                var employee_name=item.name;
                                var employee_id=item.user_id;
                                var body="Hey "+employee_name+
                                "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";
    
                                 //sending notifications
                                 pool.query(
                                  `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                                  [
                                      data.title,
                                      body,
                                      result[0].id,
                                      employee_id,
                                      resultss.insertId,
                                      1,
                                      new Date().toISOString().substring(0, 19).replace('T', ' '),
                                      1
                                  ],
                                  (error_inserts,result_inserts)=>
                                  {
                                      if(error_inserts)
                                      {
                                          return callback(error_inserts,null);
                                      }
                                  }
                              )
                                 console.log("else part 4th filter");
                                  count++;
                                }
                               }
        
                              }
                            )
                           }

                           //else part of filter 4 mean if filter 4 got employees nore then 5 times of required then send on first 5 times
                           //of employees and stop
                           else{
                            for(const item in result_filter_4)
                            {
                              if(count>=data.req_employee*5)
                              {
                                return callback(null,result);
                              }
                              //send notification query

                                 
                            //making the body of notification
                            var employee_name=item.name;
                            var employee_id=item.user_id;
                            var body="Hey "+employee_name+
                            "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";

                                        //sending notifications
                         pool.query(
                          `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                          [
                              data.title,
                              body,
                              result[0].id,
                              employee_id,
                              resultss.insertId,
                              1,
                              new Date().toISOString().substring(0, 19).replace('T', ' '),
                              1
                          ],
                          (error_inserts,result_inserts)=>
                          {
                              if(error_inserts)
                              {
                                  return callback(error_inserts,null);
                              }
                          }
                      )
                             console.log("else part 4th filter");
                              count++;
                            }
                           }
    
                          }
                        )
                       }

                       //else part of filter 5 mean if filter 4 got employees nore then 5 times of required then send on first 5 times
                           //of employees and stop
                       else{
                        for(const item in result_filter_5)
                        {
                          if(count>=data.req_employee*5)
                          {
                            return callback(null,result);
                          }
                          //send notification query

                            //making the body of notification
                            var employee_name=item.name;
                            var employee_id=item.user_id;
                            var body="Hey "+employee_name+
                            "! "+results[0].name +" posted a job "+data.title+" which we have found matching to your profile. Have a look into it. ";

                            //sending notifications
                             pool.query(
                           `insert into notification (title, body, sender_id, reciever_id, jobpost_id, notification_type, created_on, action_type) values(?,?,?,?,?,?,?,?)`,
                           [
                               data.title,
                               body,
                               result[0].id,
                               employee_id,
                               resultss.insertId,
                               1,
                               new Date().toISOString().substring(0, 19).replace('T', ' '),
                               1
                           ],
                           (error_inserts,result_inserts)=>
                           {
                               if(error_inserts)
                               {
                                   return callback(error_inserts,null);
                               }
                           }
                       )

                         console.log("else part 5th filter");
                          count++;
                        }
                       }

                      }
                    )


                    return callback(null,result);

                }
            )

            }
          )    
         
        }
      )
       
    },


    //..................updating post.......................
    jobPostUpdate:(data,callback)=>{

      //cheking if the user exists ir not
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

    //................getting all posts.........................
    getAllPost: (body, callback) => {
  
      //getting all the jobposts regardless of those which are expired
      pool.query(
        `update jobpost set jobpost_status =0 where end_date<?`,
        [new Date().toISOString().substring(0.19).replace(`T`, ` `)],
      (errr, resultr) => {
        if (errr) {
          return callback(errr,null);
      }
      const startingLimit=(body.page-1)*body.limit;
      //getting postcard required from different tables
      pool.query(
        `select j.*, e.image_path from jobpost j join employer e on j.employer_id = e.id where j.action_type	<> 3 Order By j.id desc LIMIT ${startingLimit},${body.limit}  `,
        [],
        (err, result)=>{
          if (err){
            return callback(err,null);
          } 
          //getting count for pagination
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
    

    //.................grtting specific post......................
    getPostById: (body, callback)=>
    {
      pool.query(
        `select j.*, e.image_path,e.name from jobpost j join employer e on j.employer_id = e.id where j.action_type <> 3 and j.id=?`,
        [body.jobpost_id],
        (err, result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, result);
        }
      );
      
    },

    //.................grtting all post of specific employer......................
    getEmployerPost: (body, callback)=>
    {
      pool.query(
        `select j.*, e.image_path from jobpost j 
        join employer e on j.employer_id = e.id 
        where j.action_type <> 3 and j.employer_id=? 
        Order By j.id desc`,
        [body.employer_id],
        (err, result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, result);
        }
      );
      
    },


    ///.................get all tags................................
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

    //....................get all skills.............................
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
      },
    

       //...................delete a Job.....................

       deletePostById:(body,callback)=>{
      pool.query(
          `DELETE FROM jobpost WHERE id=?`,
          [body.jobpost_id],
          (err, result) => {
              if(err)
              {
                return callback(err,null);
              }
              return callback(null,result);
              }
      )
  }

}
