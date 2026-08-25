import React, { useState } from "react"
import './changePass.css'
 
 
 
 function ChangePassword(){
 
 const [password,setPass] = useState("");
 const [showPass , setShow] = useState(false);
 const [confirmPassword,setConfirm] = useState("");
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const email = localStorage.getItem("jis2")
 
const f = async(e)=>{
  e.preventDefault();
if(password !== confirmPassword){
  console.log("Password don't match")
  return;
 }

 const data ={
   newPass : password,
   email
 }

try{
  const response = await fetch('http://localhost:5713/ChangePass',{
    
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data)
      
  })

  const res = await response.json();

  if(response.ok){
    console.log('wrong point');
  }else{
    console.log(res.message);
  }

}catch(error){
  console.log(error)
}


}
   
   
   
  return (
 
 <div className="change-password-page">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span >StudentForum</span>
        </div>

      
      </header>

      {/* Main Content */}
      <main className="change-password-container">

        <div className="change-password-card">

          {/* Icon */}
          <div className="password-icon-circle">
            <span className="password-icon">🔒</span>
          </div>

          {/* Heading */}
          <h1 className="h11">
            Change Your <span>Password</span>
          </h1>

          <p className="subtitle">
            Please choose a strong password to secure your
            <br />
            StudentForum account and confirm it below.
          </p>

          {/* Form */}
          <form onSubmit={f}>

            {/* New Password */}
            <div className="password-input-wrapper">
              <input
                type={showPass ?  "text" :"password"}
                placeholder="New Password"
                value={password}
                onChange={(e) =>{ setPass(e.target.value)}}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShow(!showPass)}
              >
                 { "👁️"} 
              </button>
            </div>

            {/* Confirm Password */}
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {setConfirm(e.target.value)}}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                { "🙈" }
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="set-password-btn"
              
            >
              Set Password
            </button>

          </form>

          <p className="password-hint">
            Password must be at least 8 characters and include a special character.
          </p>

        </div>

      </main>
    </div>
)
}


export default ChangePassword;