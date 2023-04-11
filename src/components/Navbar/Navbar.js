import React from 'react';
import './NavStyle.css';
import { SiHomebridge } from "react-icons/si";
import { RiDashboardFill } from "react-icons/ri";
import { ImMakeGroup } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Navbar() {
  const iconStyles={
    height:"24px",
    width: "24px",
    margin:"auto",
    fontSize: "0.8em",
  }
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-white fixed-top py-1 px-sm-3 px-2 navBar border-bottom">
          
          <a href= "/" className="navbar-brand ms-2 ms-sm-5 fw-bold fst-italic">
            <img src={require("../../Assets/images/Brandlogo.PNG")} alt="Logo" width='100' height='40' />
              <span className='ms-1'>Workspot</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ml-auto offset-md-3 offset-lg-5 offset-xl-" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <NavLink className="nav-link p-0 pt-1" to="/">
                        <div style={iconStyles}><SiHomebridge/></div> 
                        <span style={iconStyles}>Home</span>
                         
                      </NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/emplyDashboard" className="nav-link p-0 pt-1">
                        <div style={iconStyles}><RiDashboardFill/></div> 
                        <span style={iconStyles}>Dashboard</span>
                        </NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/jobPost" className="nav-link p-0 pt-1">
                        <div style={iconStyles}><ImMakeGroup/></div> 
                        <span style={iconStyles}>Community</span> 
                        </NavLink>
                  </li>
                  <Dropdown className='p-0 pt-1 rounded-circle my-0' nav isOpen={dropdownOpen} toggle={toggle} style={{height:"42px", width:"42px"}}>
                      <DropdownToggle className='p-0' nav caret>
                        <img
                          src={require("../../Assets/images/profilepicture.jpeg")}
                          alt='PP'
                          className='rounded-circle'
                          width='40'
                          height='40'
                        /> 
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem>
                              <a href="/profile" className="nav-link text-dark">
                                View Profile
                                </a>
                          </DropdownItem>
                          <DropdownItem>
                              <a href="/settings" className="nav-link text-dark">Settings & Privacy</a>
                          </DropdownItem>
                          <DropdownItem>
                              <a href="/settings" className="nav-link text-dark">Help</a>
                          </DropdownItem>
                          <DropdownItem>
                              <a href="/logout" className="nav-link text-dark">Logout</a>
                          </DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </ul>
          </div>
      </nav>
     
    </>
  )
}

export default Navbar

