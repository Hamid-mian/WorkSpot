import React from 'react'
import './rnStyle.css'
import { BsArrowRightCircle } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

export default function RightNav({jobData}) {
    // const style={
    //     height: 70px,
    // }
  return (
    <>
        {jobData.map((curElem)=>{
            return(
                <>
                    <div className="card border-white" style={{width: "100%"}} key={curElem.id}>
                        <div className="card-body border-bottom">
                            <h5 className="card-title text-muted">{curElem.Title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted"><MdLocationOn /> {curElem.Location}</h6>
                            <p className="card-text overflow-hidden" style={{height: "60px", width:"95%"}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. {curElem.Description}</p>
                            <a href="/" className="ms-lg-1 link">More  <BsArrowRightCircle /></a>
                            <span className="offset-sm-4 offset-lg-6 ml-auto text-muted fw-bold">{curElem.price}</span>
                        </div>
                    </div>
                </>
            );
        }
        )}    
    </>
  );
};
