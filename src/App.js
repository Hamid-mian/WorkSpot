import "./App.css"
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import Signup from './components/Signup/Signup';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import SetProfile from './screens/SetProfile/SetProile'
import Employerprofile from './screens/SetProfile/Employerprofile'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard/EmployeeDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobPost from './screens/JobPost/JobPost';
import DashboardEmployer from "./screens/DashboardEmployer/DashboardEmployer";

function App() {
 
  return (
    
    <>
      <BrowserRouter>
        <Navbar></Navbar> 
        <Routes>
          
          <Route path='/' element = {<SignIn/>} />
          <Route path='/signUp' element = {<Signup/>} />
          <Route path='/home' element = {<HomePage/>}/>
          <Route path="/userVerification" element = {<Signup isVerification />}/>
          <Route path='/emplyDashboard' element = {<EmployeeDashboard/>} />
          <Route path="/DashboardEmployer" element={<DashboardEmployer/>}/>
          <Route path='/emplyerDashboard' element = {<Dashboard/>} />
          <Route path = "/jobPost" element = {<JobPost/>}/>
          <Route path ='/setProfile' element = {<SetProfile />}/>
          <Route path ='/empProfile' element = {<Employerprofile />}/>
        </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
