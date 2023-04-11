import "./App.css"
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import Signup from './components/Signup/Signup';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard/EmployeeDashboard';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import JobPost from './screens/JobPost/JobPost';
//y & rafec components shortcuts

function App() {
  const Screen = ()=>{
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  }
  return (
    
    <>
      <BrowserRouter>
        <Navbar></Navbar> 
        <Routes>
          <Route path='/a' element = {<SignIn/>} />
          <Route path='/signUp' element = {<Signup/>} />

          {/* <Route path="" element = {<Screen/>}/> */}
          <Route path='/' element = {<HomePage/>}/>
          
          <Route path='/emplyDashboard' element = {<EmployeeDashboard/>} />
          <Route path='/emplyerDashboard' element = {<Dashboard/>} />
          <Route path = "/jobPost" element = {<JobPost/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
