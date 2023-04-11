import React, { useState } from "react"
// import './Signup.css'
import axios from "axios"
import { NavLink } from "react-router-dom"
function Signup() {


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

    const signup = () => {
        const { name, email, phoneNo, password, reEnterPassword } = user
        if( name && email && phoneNo && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/signup", user)
            .then( res => {
                alert(res.data.message)
            })
        } else {
            alert("invlid input")
        }
        
    }

    const myStyle={
        backgroundImage: 
              "url('./images/pic.jpg')",
        height:'100vh',
        marginTop:'-70px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
  return (
    <>
        <div className="signup py-4 mt-5" style={myStyle}>
            <div className="container">
                <div className="section1 my-2">
                    <h3 className='mt-4'>Welcome to the WorkSpot</h3>
                    <div className="box">
                        <h1 className='my-2'>SIGN-UP</h1>
                        
                        <div className="formGroup">
                            <p><label for="Name">Full Name</label></p>
                            <input className="inputs" type="text" id="Name" name="name"  value={user.name} autocomplete="off" onChange={ handleChange } ></input>
                        </div>
                        <div className="formGroup">
                            <p><label for="email">Email Address</label></p>
                            <input className="inputs" type="text" id="email"name="email"  value={user.email} autocomplete="off" onChange={ handleChange }></input>
                        </div>
                        <div className="formGroup">
                            <p><label for="phoneno">Phone Number</label></p>
                            <input className="inputs" type="number" id="phoneno" name="phoneNo"  value={user.phoneNo} autocomplete="off" onChange={ handleChange }></input>
                        </div>
                            <div className="formGroup">
                            <p><label for="password">Password</label></p>
                            <input className="inputs" type="password" id="password" name="password"  value={user.password} required onChange={ handleChange }></input>
                            </div>
                            <div className="formGroup">
                            <p><label for="reEnterPassword">Re-enter Password</label></p>
                            <input className="inputs" type="password" id="reEnterPassword" name="reEnterPassword"  value={user.reEnterPassword} required onChange={ handleChange }></input>
                            </div>
                            <button type="button" id="btn" onClick={signup}>Sign Up</button>
                            <br></br>
                            <p className='my-3'>Already a member? <NavLink to="/signIn">Sign In</NavLink></p>
                    
                    </div>
                </div>
            </div>     
        </div> 
    </>
  )
}

export default Signup
