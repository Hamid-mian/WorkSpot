import { React,useState } from 'react'
import './Home.css'
import Post from "./postApi";
import Job from './JobApi';
import RightNav from './Rightnav/RightNav'
import ScrollNav from './Middlenav/ScrollNav';
import LeftNav from './Leftnav/LeftNav';

function HomePage() {
    const [postData, setPostData] = useState (Post);
    const [jobData, setJobData] = useState (Job);
    
  return (
    <>
       <main className='container-fluid px-0 pt-5 mt-5'>
            <div className="row p-0 ps-md-2 ps-lg-5">
                <div className="d-none d-md-none d-lg-block col-md-2 bg-white m-3 p-0 rounded-top sticky-top" style={{height:"550px", position: 'sticky',top: '85px'}}>
                      <LeftNav></LeftNav>
                 </div>

                <div className="col-sm-7 col-lg-5 col-xl-6 p-sm-0 m-3 px-3">
                  <ScrollNav postData={postData} />
                </div>

                <div className="d-none d-sm-block col-sm-4 col-lg-3 mx-sm-1 m-3 px-sm-0 pt-2 rounded bg-white sticky-top" style={{height:"680px", position: 'sticky',top: '85px'}} >
                  <div className="heading bg-dark p-2" style={{height:"45px"}}>
                    <h5 className='font text-warning'>Available Jobs</h5>
                  </div>
                  <div className="overflow-auto" style={{height:"600px"}}>
                    <RightNav jobData={jobData} />
                  </div>
                </div>

            </div>
            
        </main>
    </>
    
  
  )
}

export default HomePage
