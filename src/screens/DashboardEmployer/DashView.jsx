import React, {useState, useEffect} from 'react'
import 'animate.css'
import { NavLink } from 'react-router-dom'
import {GiSelect} from 'react-icons/gi'
import JobCard from './JobCard'

function DashView() {
const [opt, setOpt] = useState('All Orders')

const employee = ['Ahmad','Mubashir Ahmad', 'Amna', 'Butt Boss', 'Kashmala Kash', 'Naeem  Islam', 'James Jhones', 'Zaid Ali']
const stat = ['On-Going', 'Completed', 'Canceled']
const title = ['Cashier', 'Waiter', 'Sweeper', 'Artist']
const Post = [];
for (let i = 1; i <= 12; i++) {
  let post = {
    id: i,
    image: `images/download.jpg`,
    employee: `${employee[i%7]}`,
    hours: "11AM - 3PM ",
    duration: `${i%7+i/2} days ${i%7}h`,
    price: `${i}k PKR`,
    title: `${title[i%4]}`,
    status: `${stat[i%3]}`,
  }
  Post.push(post);
}

  return (
    <>
        <div className="main-emplrDash mb-4">
            <div className="DashNav bg-white border rounded mx-1 d-flex justify-content-between p-4 animate__animated animate__slideInDown">
                <div className='d-flex align-items-center'>
                    <GiSelect/>
                    <p className="fw-bold fs-4 m-1 ms-3 text-muted"> {opt} </p>
                </div>
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle h-75 pb-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        {opt}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button">All Orders</button></li>
                        <li><button className="dropdown-item" type='button'>Active Orders</button></li>
                        <li><button className="dropdown-item" type="button">Completed Orders</button></li>
                    </ul>
                </div>
            </div>

           <div className='animate__animated animate__slideInRight'>
                <JobCard cardData={Post}/>
           </div>

      </div> 
    </>
  )
}

export default DashView
