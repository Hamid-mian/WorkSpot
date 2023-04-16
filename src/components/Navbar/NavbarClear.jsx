import React from 'react'

export default function NavbarClear() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-white fixed-top py-1 px-sm-3 px-2 navBar border-bottom">
          
          <a href= "/" className="navbar-brand ms-2 ms-sm-5 fw-bold fst-italic">
            <img src={require("../../Assets/images/Brandlogo.PNG")} alt="Logo" width='100' height='40' />
              <span className='ms-1'>Workspot</span>
          </a>
      </nav>
    </>
  )
}
