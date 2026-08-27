import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landingPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PubChat from './pages/publicChat';
import Profile from './pages/profilePage';
import VerifOtp from './pages/verifOtp';
import ChangePassword from './pages/changePass';
import { useState } from 'react';



function App() {
   const[tag,setTag] = useState(false);


  return (
    <Routes>
      <Route path="/" element={<LandingPage tag={tag} setTag={setTag}/>}/>
      <Route path="/PubChat" element={<PubChat/>}></Route>
      <Route path="/Profile/:id"  element={<Profile tag={tag} setTag={setTag}/>}/>
      <Route path="/Recovery" element={<VerifOtp/>}/>
      <Route path="/Changepass" element={<ChangePassword/>}/>
    </Routes> 
  );
}

export default App;
