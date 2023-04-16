import React, {useState, useEffect} from 'react'
import 'animate.css';
import { NavLink } from 'react-router-dom'

function JobCard({cardData}) {

    //cardData is data on card to display
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(JSON.parse (localStorage.getItem("user")))
    }, [])

  return (
    <>
       {cardData.map((currElem)=>{
        return(
            <>
                <div className="orderDetailCard bg-white border mt-4 mx-1 rounded d-flex justify-content-between p-4 ps-0">
                    <div className="d-flex justify-content-between align-items-center">
                            <NavLink to='' className="ms-sm-5 ms-md-2 ms-lg-4 fw-bold fst-italic rounded-circle bg-success">
                                <img src={require("../../Assets/images/profilepicture.jpeg")} className='rounded-circle' alt="avatar" width='60' height='60'/>
                            </NavLink>
                        <div className="ms-lg-3 mx-md-1 fw-bold">{currElem.employee?currElem.employee:"Butt Boss"}</div>
                    </div>
                    <div className='fw-bold text-muted align-self-center'>
                        {currElem.title}
                    </div>
                    <div className="d-flex justify-content-between p-1">
                        <div className="me-4 dv-cardInfo">
                            <div className='text-muted dv-cat'>Price</div>
                            <div className='dv-varInfo'>{currElem.price}</div>
                        </div>
                        <div className="mx-4 dv-cardInfo">
                            <div className='text-muted dv-cat'>Completion Date</div>
                            <div className='dv-varInfo'>{currElem.duration}</div>
                        </div>
                        <div className='ms-4 dv-cardInfo'>
                            <div className='text-muted dv-cat'>Status</div>
                            <div className='dv-varInfo' 
                                style={{backgroundColor: currElem.status === 'On-Going'?'#41ceadd0': 
                                currElem.status === 'Completed'?'#D7E7EE': '#e77373'}}>
                                {currElem.status}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
       })}

            {/* <div className="orderDetailCard bg-white border mt-4 mx-1 rounded d-flex justify-content-between p-4 ps-0">
                    <div className="d-flex justify-content-between align-items-center">
                            <div className="ms-sm-5 ms-md-4 fw-bold fst-italic rounded-circle bg-success">
                                <img src={require("../../Assets/images/profilepicture.jpeg")} className='rounded-circle' alt="avatar" width='60' height='60'/>
                            </div>
                        <div className="ms-3 fw-bold">{user.name?user.name:"Butt Boss"}</div>
                    </div>
                    <div className="d-flex justify-content-between p-1">
                        <div className="me-4 dv-cardInfo">
                            <div className='text-muted dv-cat'>Price</div>
                            <div className='dv-varInfo'>2K PKR</div>
                        </div>
                        <div className="mx-4 dv-cardInfo">
                            <div className='text-muted dv-cat'>Completion Date</div>
                            <div className='dv-varInfo'>1d, 2h</div>
                        </div>
                        <div className='ms-4 dv-cardInfo'>
                            <div className='text-muted dv-cat'>Status</div>
                            <div className='dv-varInfo' style={{backgroundColor: '#41ceadd0'}}>On-Going</div>
                        </div>
                    </div>
                </div> */}
    </>
  )
}

export default JobCard
