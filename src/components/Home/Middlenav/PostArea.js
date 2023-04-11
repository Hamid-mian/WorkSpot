import React from 'react'
import { BsArrowRightCircle } from "react-icons/bs";

export default function PostArea({postData}) {
  
  // const {Title, body, id} = postData
  
  return (
    <>
    {postData.map((curElem)=>{
        return(
          <>
          <div className="card mb-2" style={{width: "100%"}} key={curElem.id}>
                    <div className="card-body">
                        <h5 className="card-title text-muted">{curElem.job_category}</h5>
                        <h6 className='d-flex py-1 mb-3 justify-content-between'>
                          <span className="card-subtitle mb-2 text-muted">{curElem.Employer}</span> 
                          <span className="me-5 text-muted fw-bold">Offer: {curElem.price}</span>
                        </h6>
                        <div className="info d-flex flex-column my-2 text-muted">
                          <div className='my-1 fw-bold'>Hours: <span className='fw-normal ms-5'>{curElem.hours}</span></div>
                          <div className='my-1 fw-bold'>Duration: <span className='fw-normal ms-4'>{curElem.duration} | 4-23-2023 - 4-25-2023</span></div>
                          <div className='my-1 fw-bold'>Location: <span className='fw-normal ms-4'>{curElem.location}</span></div>
                        </div>
                          <p className="card-text" style={{ width:"95%"}}>
                            <b className='text-muted fs-6'>Description: </b>  {curElem.description}
                          </p>
                        
                        <a href="/" className="btn btn-outline-primary ms-lg-1 link">Apply  <BsArrowRightCircle /></a>
                    </div>
                </div>
          </>
        );
      }
      )} 
    </>
  )
}
