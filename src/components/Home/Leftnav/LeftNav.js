import React from 'react'
import './LeftNav.css'
import { NavLink } from 'react-router-dom'

function LeftNav() {
    
  return (
    <>
      <div className="h-25 w-100 d-flex justify-content-center rounded-top style">
        <div className="d-flex align-self-end">
            <NavLink to="/">
            <img className='rounded-circle border' 
                width='70'
                height='70' src={require("../../../Assets/images/profilepicture.jpeg")} alt="avatar" /></NavLink>
        </div>
      </div>
      <div className="d-flex pt-4 justify-content-center flex-column border-bottom">
        <p className='fw-bold d-flex justify-content-center' style={{fontSize: "1.2em"}}>Jhon James</p>
        <span className='d-flex fw-light text-muted justify-content-center mb-4 ps-5 pe-5' style={{fontSize: "0.8em"}}>
            Creative Thinker | Decor
        </span>
      </div>
    </>
  )}
export default LeftNav
