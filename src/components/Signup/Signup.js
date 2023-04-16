import React, { useState } from "react"
import './Signup.css'
import 'animate.css';
import { signupData, verify } from "../../Api"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import NavbarClear from "../Navbar/NavbarClear"
function Signup({isVerification}) {


    const [ user, setUser] = useState({
        name: "",
        email:"",
        phoneNo:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const navigate = useNavigate('');
    const signup = () => {
        let object = {
            id: 0,
            user_identity: null,
            name: user.name,
            email: user.email,
            password: user.password === user.reEnterPassword ? user.password : '',
        }
        console.log(user)
        console.log(object)
        if ( user.name && user.email && user.password && (user.password === user.reEnterPassword)){
            signupData(object).then((data)=>{
                console.log("res", data)
                if (data.data.data.success){
                    console.log("signed up success")
                    let userobj = {email: user.email}
                    navigate('/userVerification', {state: {
                        dataToVerify:userobj
                    }})
                }
            }).catch((err)=>console.log("signup fail",err))
            
        } 
        else {
            alert("invlid input")
        }
    }

    const location = useLocation()
    const Email = location.state && location.state.dataToVerify ? location.state.dataToVerify : '';
    const [code, setCode] = useState(0)
    const verifyUser = ()=>{
        let verifyObj = {
            email: Email.email,
            verification_code: code,
        }
        verify(verifyObj).then((data)=>{
            if (data.data.data.success){
                navigate('/')
            }
        }).catch((err)=>console.log("signup fail",err))
    }
    
  return (
    <>
        {isVerification ? (<>
            <NavbarClear/>
            <div className="vp-main border pt-4 animate__animated animate__zoomIn">
                <h4 className="my-3 mb-5 fw-bold">Verification</h4>
                <div className="vp-in-div w-100">
                    <input placeholder="Verification Code" onChange={e=>{setCode(e.target.value)}} className="vp-input w-100" type="text" />
                </div>
                <button onClick={verifyUser} className="vp-button">Verify</button>
                <div className="mt-4"><NavLink to = '/signUp'>Back to sign up</NavLink></div>
            </div>
        </>)
        :
        (<>
        <NavbarClear/>
        <div className="signup py-4 mt-5">
            <div className="su-container">
                <div className="su-section1 my-2 d-flex flex-column">
                    <h3 className='su-h3 d-flex justify-content-center mt-4'>Welcome to WorkSpot</h3>
                    <div className="su-box">
                        <h1 className='su-h1 my-2'>SIGN-UP</h1>
                        
                        <div className="formGroup">
                            <p><label className="su-label" for="Name">Full Name</label></p>
                            <input className="su-input" type="text" id="Name" name="name"  value={user.name} autocomplete="off" onChange={ handleChange } ></input>
                        </div>
                        <div className="formGroup">
                            <p><label className="su-label" for="email">Email Address</label></p>
                            <input className="su-input" type="text" id="email"name="email"  value={user.email} autocomplete="off" onChange={ handleChange }></input>
                        </div>
                        {/* <div className="formGroup">
                            <p><label for="phoneno">Phone Number</label></p>
                            <input className="inputs" type="number" id="phoneno" name="phoneNo"  value={user.phoneNo} autocomplete="off" onChange={ handleChange }></input>
                        </div> */}
                            <div className="formGroup">
                            <p><label className="su-label" for="password">Password</label></p>
                            <input className="su-input" type="password" id="password" name="password"  value={user.password} required onChange={ handleChange }></input>
                            </div>
                            <div className="formGroup">
                            <p><label className="su-label" for="reEnterPassword">Re-enter Password</label></p>
                            <input className="su-input" type="password" id="reEnterPassword" name="reEnterPassword"  value={user.reEnterPassword} required onChange={ handleChange }></input>
                            </div>
                            <button type="button" id="su-btn" onClick={signup}>Sign Up</button>
                            <br></br>
                            <p className='my-3 mb-4'>Already a member? <NavLink to="/">Sign In</NavLink></p>
                    
                    </div>
                </div>
            </div>     
        </div> 
        </>)}
    </>
  )
}

export default Signup
