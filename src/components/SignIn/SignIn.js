import React from 'react';
import './SigninStyle.css';
// import image from '/public/images/pic.jpg';

function SignIn() {
  const myStyle={
    backgroundImage: 
          "url('./images/homepagedraft.jpg')",
    height:'100vh',
    marginTop:'-70px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (  
    <>
      <div className='signin' style={myStyle}>
        <div class="container ">
            <div class="section">
              
            <h3 className='my-4 '>Welcome to the WorkSpot</h3>
                <div className="box my-4">
                <h1 className='my-4'>LOGIN</h1>
                <div class="formGroup">
                    <p><label for="userNmae">User Name</label></p>
                    <input type="text" id="userName" autocomplete="off" ></input>
                </div>
                <div class="formGroup">
                    <p><label for="password">Password</label></p>
                    <input type="password" id="password" name="password" required ></input>
                </div>
                <button type="button" id="btn">Sign In Now</button>
                <br></br>
                <p className='my-3'>Not a member yet? <a href="Signup.js">Sign up</a></p>
            
                </div>
                </div>
          </div>
      </div>
    </>
  )
}

export default SignIn
