import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/landingPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PubChat from './pages/publicChat';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/PubChat" element={<PubChat/>}></Route>
    </Routes> 
  );
}

export default App;
