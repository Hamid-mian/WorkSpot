import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MainDashboard from './MainDashboard'
import { NavLink } from 'react-router-dom'

function EmployeeDashboard() {
  return (
    <>
      <main className='container-fluid my-5'>
            <div className="row p-0 py-3">
                <NavLink to="/emplyerDashboard">emplrDash</NavLink>
                <div className="col-4 ms-1 p-2 ps-lg-5 bg-danger">
                    <Sidebar></Sidebar>
                </div>

                <div className="col">
                        <MainDashboard></MainDashboard>
                </div>

            </div>
            
        </main>
    </>
  )
}

export default EmployeeDashboard


