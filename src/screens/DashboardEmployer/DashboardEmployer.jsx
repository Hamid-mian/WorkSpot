import React from 'react'
import 'animate.css';
import './DashboardEmployer.css'
import DashLeft from './DashLeft'
import Navbar from '../../components/Navbar/Navbar'
import DashView from './DashView'

function DashboardEmployer() {
  return (
    <>
        <Navbar isEmployer/>
      <div>
        <div className='container-fluid px-5 pt-5 mt-5 emplr-Dash'>
                <div className='emplr-leftNav me-2 d-none d-md-block col-md-1 mb-3 rounded bg-white rounded-top sticky-top animate__animated animate__zoomIn' style={{maxHeight:'650px', position: 'sticky',top: '55px'}}>
                    <DashLeft/>
                </div>

                <div className='emplr-rightNav p-0 ms-2'>
                    <DashView/>
                </div>
        </div>
      </div>
    </>
  )
}

export default DashboardEmployer
