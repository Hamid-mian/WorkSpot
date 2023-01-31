import React from 'react';
import './NavStyle.css';
import { SiHomebridge } from "react-icons/si";
import { RiDashboardFill } from "react-icons/ri";
import { ImMakeGroup } from "react-icons/im";
// import { Link } from 'react-router-dom';
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-1 px-sm-3 px-2 navBar">
          
          <a href= "/" className="navbar-brand ms-2 ms-sm-5 fw-bold fst-italic">
            <img src="./images/Brandlogo.png" alt="Logo" width='100' height='40' />
              <span className='ms-1'>Workspot</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>y
          <div className="collapse navbar-collapse ml-auto offset-md-3 offset-lg-5 offset-xl-6" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <a href="/" className="nav-link p-0 pt-1">
                        <div style={iconStyles}><SiHomebridge/></div> 
                        <span style={iconStyles}>Home</span>
                      </a>
                  </li>
                  <li className="nav-item">
                      <a href="/dashboard" className="nav-link p-0 pt-1">
                        <div style={iconStyles}><RiDashboardFill/></div> 
                        <span style={iconStyles}>Dashboard</span>
                        </a>
                  </li>
                  <li className="nav-item">
                      <a href="/community" className="nav-link p-0 pt-1">
                        <div style={iconStyles}><ImMakeGroup/></div> 
                        <span style={iconStyles}>Community</span> 
                        </a>
                  </li>
                  <Dropdown className='p-0 pt-1 rounded-circle my-0' nav isOpen={dropdownOpen} toggle={toggle} style={{height:"42px", width:"42px"}}>
                      <DropdownToggle className='p-0' nav caret>
                        <img
                          src='./images/profilepicture.jpeg'
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


// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// function Navbar() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const toggle = () => setDropdownOpen(prevState => !prevState);

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
//             <Link to="/" className="navbar-brand">Logo</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav ml-auto">
//                     <li className="nav-item">
//                         <Link to="/" className="nav-link">Home</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/dashboard" className="nav-link">Dashboard</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/community" className="nav-link">Community</Link>
//                     </li>
//                     <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
//                         <DropdownToggle nav caret>
//                             Profile
//                         </DropdownToggle>
//                         <DropdownMenu>
//                             <DropdownItem>
//                                 <Link to="/profile" className="nav-link">My Profile</Link>
//                             </DropdownItem>
//                             <DropdownItem>
//                                 <Link to="/settings" className="nav-link">Settings</Link>
//                             </DropdownItem>
//                             <DropdownItem>
//                                 <Link to="/logout" className="nav-link">Logout</Link>
//                             </DropdownItem>
//                         </DropdownMenu>
//                     </Dropdown>
//                 </ul>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;
