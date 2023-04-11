import React, {useState} from "react"
// import './SigninStyle.css'
import axios from "axios"
import { NavLink } from "react-router-dom"
const SignIn = ({ setLoginUser}) => 
 {
 const [ user, setUser] = useState({
     email:"",
     password:""
 })

 const handleChange = e => {
     const { name, value } = e.target
     console.log("check",e.target.value)
     setUser({
         ...user,
         [name]: value
     })
 }

 const signIn = () => {
  axios.post("http://localhost:9002/signin", user)
  .then(res => {
    alert(res.data.message)
    setLoginUser(res.data.user)
    })
  }


  return (  
    <>
      <div className='signin mt-0 pt-5 siStyle' >
        <div class="container mt-5">
            <div class="section mt-2">
              
            <h3 className='my-4 '>Welcome to the WorkSpot</h3>
                <div className="box my-4">
                <h1 className='my-4'>LOGIN</h1>
                <div class="formGroup">
                    <p><label for="userNmae" >Email</label></p>
                    <input className="inputs" type="text" id="userName" name="email" autocomplete="off" onChange={handleChange}></input>
                </div>
                <div class="formGroup">
                    <p><label for="password">Password</label></p>
                    <input className="inputs" type="password" id="password" name="password" required onChange={handleChange}></input>
                </div>
                <button type="button" id="btn" onClick={signIn}>Sign In Now</button>
                <br></br>
                <p className='my-3'>Not a member yet? <NavLink to="/signUp">Sign up</NavLink></p>
            
                </div>
                </div>
          </div>
      </div>
    </>
  )
}

export default SignIn
