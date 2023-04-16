import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'

function LeftNav() {

 
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse (localStorage.getItem("user")))
  }, [])
  
    
  return (
    <>
      <div className='bg-succes d-flex flex-column'>
        <div className="h-2 w-100 d-flex justify-content-center rounded-top emplr-leftnav">
          <div className="d-flex align-self-end">
              <NavLink to="">
              <img className='rounded-circle border' 
                  width='80'
                  height='80' src={require("../../Assets/images/profilepicture.jpeg")} alt="avatar" /></NavLink>
          </div>
        </div>
        <div className="d-flex pt-4 justify-content-center flex-column border-bottom">
          <div className='d-flex flex-column align-items-center justify-content-center mb-2'>
            <div className='fw-bold'>{user.name?user.name:"Muhammad Zubair"}</div>
            <div className='text-muted fs-6 mb-1'>@m.zubi</div>
            <div className='text-warning'>( 5.0 )</div>
            </div>
        </div>
        <div className='m-xl-3 mt-lg-4 m-md-1 my-md-3'>
          <div className='d-flex justify-content-between mt-4 mb-4'>
            <div className='emplr-ln-info'>Brand</div>
            <div className='emplr-ln-infoVar d-flex align-self-end fst-italic text-muted'>Arbour Clothing</div>
          </div>
          <div className='d-flex justify-content-between mb-4'>
            <div className='emplr-ln-info'>From</div>
            <div className='emplr-ln-infoVar fst-italic text-muted'>Lahore</div>
          </div>
          <div className='d-flex justify-content-between my-3'>
            <div className='emplr-ln-info'>Here-Since</div>
            <div className='emplr-ln-infoVar fst-italic text-muted'>March, 2022</div>
          </div>
          <div>
            <div className='mt-5 fw-bold text-muted'>Description</div>
            <div className='text-muted' style={{fontSize:'0.8rem'}}>
                {user.description ? user.description :
                <>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Enim esse est neque. Ipsam reprehenderit accusantium aspernatur 
                voluptates sint sapiente perspiciatis necessitatibus ad tenetur, 
                enim, tempora eos libero cupiditate est animi!</>}
            </div>
          </div>
        </div>
      </div>
    </>
  )}
export default LeftNav
