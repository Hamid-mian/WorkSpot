import React, {useState, useEffect} from "react"
import './SigninStyle.css'
import { getUser } from "../../Api"
import { NavLink, json, useNavigate } from "react-router-dom"
import NavbarClear from "../Navbar/NavbarClear"
const SignIn = ({ setLoginUser}) => 
 {
 const [ user, setUser] = useState({
     email:"",
     password:""
 })
 
 const [userData, setUserData] = useState({})
 useEffect(() => {
  localStorage.setItem("user", JSON.stringify(userData))
 }, [userData])
 const handleChange = e => {
     const { name, value } = e.target
     console.log("check",e.target.value)
     setUser({
         ...user,
         [name]: value
     })
 }
 const navigate = useNavigate("")
 const signIn = () => {
    let object = {
      email: user.email,
      password: user.password
    }
    getUser(object).then(({data}) => {
      setUserData(data.data.result[0])
      // console.log(data.data.result)
      // console.log("Name user", userData.name)
      if (data.data.success) {
        navigate("/home") 
      }
    }).catch(err => console.log("Login unsuccessfull",err))
  }

  return (  
    <>
      <NavbarClear/>
      <div className='signin mt-0 pt-5 siStyle' >
        <div class="container si-container mt-5">
            <div class="si-section mt-2">
              
            <h3 className='si-h3 mt-4 mb-2'>Welcome to WorkSpot</h3>
                <div className="si-box mb-4 mt-2">
                  <h1 className='si-h1 mb-3'>LOGIN</h1>
                  <div class="formGroup">
                      <p><label className="si-label" for="userNmae" >Email</label></p>
                      <input className="si-input" type="text" id="userName" name="email" autocomplete="off" onChange={handleChange}></input>
                  </div>
                  <div class="formGroup">
                      <p><label className="si-label" for="password">Password</label></p>
                      <input className="si-input" type="password" id="password" name="password" required onChange={handleChange}></input>
                  </div>
                  <button type="button" id="si-btn" onClick={signIn}>Sign In Now</button>
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