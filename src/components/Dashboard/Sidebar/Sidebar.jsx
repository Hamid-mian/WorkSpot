import React from 'react'
import { MdStars } from "react-icons/md";

function Sidebar() {
  const iconStyles={
    height:"15px",
    width: "15px",
    margin:"auto",
  }

  return (
    <>
      <div className="card ms-5 mt-4" style={{width: '20rem'}}>
        <div className='card-img-top'>
          <img className ='ms-2 mt-1 rounded-circle border' 
                    width='70'
                    height='70' src="./images/profilepicture.jpeg" alt="..."
          /> 
          <span className='ms-4'><span style={iconStyles}><MdStars/></span> Ratings</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">User Name</h5>
          <p className="card-text">About Ptich Line</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-ite d-flex justify-content-between p-2">
            Ongoing Jobs
            <span className="progress w-25 mt-2" style={{height: '7px'}}>
              <span className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></span>
              </span>98%
              
          </li>
            <li className="list-group-itm p-2 d-flex justify-content-between">
              Completed Jobs
              <span className="progress w-25 mt-2" style={{height: '7px'}}>
                <span className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></span>
                </span>98%
            </li>
          <li className="list-group-item p-2">A third item</li>
        </ul>
        <div className="card-body bg-success text-white px-2 d-flex justify-content-between">
          <span href="/" className="card-link">Total Earnings</span><span>$100</span>
        </div>
      </div>
        {/* <div className="sidebar bg-danger">
          <div className="h-25 w-100 d-flex justify-content-center rounded-top">
            <div className="d-flex align-self-end">
                <a href="/">
                <img className='rounded-circle border' 
                    width='70'
                    height='70' src="./images/profilepicture.jpeg" alt="avatar" /></a>
            </div>
          </div>
          <div className="widgets">
            widgets
          </div>
        </div> */}
    </>
  )
}

export default Sidebar
