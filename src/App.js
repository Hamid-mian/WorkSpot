import HomePage from './components/Home/HomePage';
import Navbar from './components/Navbar/Navbar';
// import 'reactstrap/dist/reactstrap.min.css';
import './App.css';
import SignIn from './components/SignIn/SignIn';

//y & rafec components shortcuts

function App() {
  return (
    
    <>
      <Navbar></Navbar>
      <SignIn></SignIn>
      {/* <HomePage/> */}
    </>
    
  );
}

export default App;
