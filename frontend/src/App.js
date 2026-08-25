import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landingPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PubChat from './pages/publicChat';
import Profile from './pages/profilePage';
import VerifOtp from './pages/verifOtp';
import ChangePassword from './pages/changePass';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/PubChat" element={<PubChat/>}></Route>
      <Route path="/Profile/:id"  element={<Profile/>}/>
      <Route path="/Recovery" element={<VerifOtp/>}/>
      <Route path="/Changepass" element={<ChangePassword/>}/>
    </Routes> 
  );
}

export default App;
