import React, {useState} from "react"
import './Profile.css'
import axios from "axios"
import { NavLink } from "react-router-dom"
const Employerprofile = () => {
  return (  
    <>
       
       <div className=' mt-0 py-5 ' >
        <div class="containerr ">
            <div class="section my-2">
              
            <h3 className='my-4 text-center'>Create Proile</h3>
             <form className=" my-4">
           <div className=" ml-[20rem] pt-16 text-center">
          <input
                className="Ppic"
                type=""
                placeholder="">

              </input>
          <div> 
          <p class="font-medium ml-8">Upload Photo</p>
          </div>
          </div>
          <div className=" text-center my-2">
            <input
                className="inputs"
                type="text"
                placeholder="First Name"
              ></input>
              </div>
              <div>
              <input
                className="inputs"
                type="text"
                placeholder="email"
              ></input>
            </div>
                        {/*  */}
            <div className="text-center">
              <input
                className="inputs my-2"
                type="text"
                placeholder="CNIC"
              ></input>
              </div>
              <div className="text-center">
              <input
                className="inputs my-2"
                type="text"
                placeholder="LOCATION"
              ></input>
            </div>
            <div className="text-center ">
                <input
                  className="inputs"
                  type="text"
                  placeholder="DESCRIPTION"
                ></input>
   </div>
   <br/>
   <br/>
<div className="boxx">
   <div >
   <input type="text" className="inputs my-2" placeholder='Reg no'/>
</div>


<div>
<input
  type="text" className="inputs my-2" placeholder='Brand name'
 
 
/>
</div>



<div className="text-center my-2">
   <button type="button" id="btn">Submit</button>
   </div>
                <br></br>
                </div>
</form>
 
   </div>

    
                
                
  
            
                
            
                </div>
                </div>
              
        
        
    





</>
  );
 }
 export default Employerprofile