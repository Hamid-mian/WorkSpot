import React from 'react'
import Rightbar from './Rightbar/Rightbar'
import Sidebar from './Sidebar/Sidebar'

function Dashboard() {
  return (
    <>
      <main className='container-fluid bg-white'>
            <div className="row p-0 ">
                
                <div className="d-flex flex-column col-md-3 bg-white p-2 ms-0 pt-4 fixed-top" style={{height:"100vh",position:'fixed', left:'0'}}>
                  <a href= "/" className="navbar-brand ms-2 ms-sm-5 fw-bold fst-italic my-4">
                    <img src="./images/Brandlogo.png" alt="Logo" width='100' height='40' />
                    <span className='ms-1 fw-bold fs-4'>Workspot</span>
                  </a>
                  <Sidebar></Sidebar>
                 </div>


                  <div className="nav col-xl-9 p-3 bg-white d-flex justify-content-between border-bottom" 
                        style={{height:"100px",zIndex:'1', position: 'fixed', right: '0', top:'0'}}>
                    <span className='fw-bold fs-2 mt-4'>Dashboard</span>
                    <span className='fs-4 mt-4 me-5'>username</span>
                  </div>


                <div className="col-lg-5 col-xl-9 bg-white p-5 mt-5 d-flex flex-column" style={{right: '0', position: 'absolute',top: '40px'}}>
                  <Rightbar></Rightbar>
                </div>


            </div>
            
        </main>
    </>
  )
}

export default Dashboard
