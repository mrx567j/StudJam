import React from "react";
import "./verifOtp.css";
import { useState,useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function VerifOtp(){


const email = localStorage.getItem('jis2');
const [otp,setOtp] = useState(["","","","","",""]);
const inputRefs = useRef([]);
const navigate = useNavigate();

const d={
   id : email
}

const handleChange= async (a,c)=>{
   
  
   const r = [...otp ];
   r[c] = a;
   setOtp(r);
 if (a && c < otp.length - 1) {
    inputRefs.current[c + 1].focus();
  }
    
}

 const handleRecovery = async()=>{
    console.log('sending otp')
    try{
       const response = await fetch("http://localhost:5713/sendOtp",{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(d)
       })
     const res = await response.json();


       if(response.ok){
        alert('Otp sent to your linked email')
       
       }else{
          console.log(res.message);
       } 


    }
  catch(error){
  console.log(error)
  }
}
  
 const verifyOtp =async()=>{
  const data = {
    otp:otp.join(""), // converting array into string
    email
  };

  try{
      const response = await fetch('http://localhost:5713/Verif',{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data)
      });
      const res = await response.json();
      if(response.ok){
        alert('Otp verified')
        navigate('/Changepass')
      }else{
        console.log(res.message);
      }



  }catch(error){
    console.log(error);
  }
 }


return(
 <div className="verify-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>StudentForum</span>
        </div>

        <button className="logout-btn">
          Logout
        </button>
      </nav>

      {/* Main */}
      <main className="verify-container">

        <div className="otp-card">

          {/* Icon */}
          <div className="otp-icon-wrapper">
            <div className="otp-icon">
              📩
              <span className="lock-icon">🔒</span>
            </div>
          </div>

          {/* Heading */}
          <h1>
            Verify Your <span>Email</span>
          </h1>

          <p className="otp-description">
            We've sent a 6-digit OTP to
          </p>

          <p className="email">
            {email}
          </p>

          {/* OTP Inputs */}
         <div className="otp-container">
  {otp.map((digit, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      maxLength="1"
      value={digit}
      onChange={(e) => handleChange(e.target.value, index)}
      className="otp-box"
    />
  ))}
</div>

          {/* Timer */}
          <div className="otp-timer">
            <span>🛡️</span>
            OTP will expire in
            <strong>02:59</strong>
          </div>

          {/* Verify */}
          <button
            className="verify-btn"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>

          {/* Divider */}
          <div className="divider">
            <span></span>
            <p>Didn't receive the code?</p>
            <span></span>
          </div>

          {/* Resend */}
          <button className="resend-btn" onClick={handleRecovery}>
            <span>↻</span>
            Resend OTP <strong>(28s)</strong>
          </button>

        </div>
      </main>

      {/* Help */}
      <button className="help-btn">
        ?
      </button>

    </div>
)

}


export default VerifOtp;