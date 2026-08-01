import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import './landingPage.css'
import './logIn.css'
import './signUp.css'

function LandingPage(){
 const[isLogIn,setLogIn] = useState(false);
 const[isSignUp,setSignIn] = useState(false);

 const openLogIn = ()=>{
     console.log("Login clicked");
          setLogIn(true);}
 const closeLogIn = ()=>{
            setLogIn(false);
 }

 

 const openSignUp= ()=>{
     console.log("Login clicked");
          setSignIn(true);}
          
 const closeSignUp = ()=>{
            setSignIn(false);
 }

 


    return(
        <>
    <div className="landing-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="logo-container">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">StudentForum</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-outline-cyan" onClick={openLogIn}>Log In</button>
          <button className="btn btn-pink" onClick={openSignUp}>Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        {/* Top Badge */}
        <div className="badge">
          <span className="badge-dot">•</span> BUILT BY STUDENTS, FOR STUDENTS
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          The place where <span className="highlight-pink">students</span>
          <br />
          actually <span className="highlight-lime">help</span> each other
        </h1>

        {/* Subtitle Paragraph */}
        <p className="hero-description">
          StudentForum is your no-BS academic community — ask questions, share
          ideas, vent about exams, and get real answers from real students
          who've been there.
        </p>

        {/* Call to Action Buttons */}
        <div className="cta-container">
          <button className="btn btn-pink-large" onClick={openSignUp}>Join for free 🚀</button>
          <button className="btn btn-dark-outline" onClick={openLogIn}>Log In</button>
        </div>
      </main>

      {/* Floating Help Button */}
      <button className="help-button" aria-label="Help">
        ?
      </button>
    </div>
    
     {   isLogIn && (<div className="overlay" onClick={closeLogIn}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className="tab active">
            👋 Log In
          </button>

          <button className="tab">
            ✨ Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form">
          <input
            type="email"
            placeholder="email address"
          />

          <input
            type="password"
            placeholder="password"
          />

          <button type="submit" className="login-btn">
            Log In <span>→</span>
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          No account?{" "}
          <span className="signup-link">
            Sign up
          </span>
        </p>

      </div>
    </div>
  
    )
}
 
 {
isSignUp && (
<div className="overlay" onClick={closeSignUp}>

  <div
    className="signup-card"
    onClick={(e) => e.stopPropagation()}
  >

    {/* Tabs */}

    <div className="auth-tabs">

      <button className="tab">
        👋 Log In
      </button>

      <button className="tab active-signup">
        ✨ Sign Up
      </button>

    </div>

    {/* Avatar Section */}

    <h3 className="avatar-title">
      PICK YOUR AVATAR
    </h3>

    <div className="avatar-grid">

      <button className="avatar">🎓</button>
      <button className="avatar">🤓</button>
      <button className="avatar">😎</button>
      <button className="avatar">🦊</button>
      <button className="avatar">🐼</button>
      <button className="avatar">🐸</button>
      <button className="avatar">🦄</button>

      <button className="avatar">🐙</button>
      <button className="avatar">🎮</button>
      <button className="avatar">🎸</button>
      <button className="avatar">🌟</button>
      <button className="avatar">🔥</button>

    </div>

    {/* Form */}

    <form className="signup-form">

      <input
        type="text"
        placeholder="username (e.g. study_beast)"
      />

      <input
        type="email"
        placeholder="email address"
      />

      <input
        type="password"
        placeholder="password"
      />

      <button
        type="submit"
        className="signup-btn"
      >
        Create Account 🚀
      </button>

    </form>

    <p className="signup-footer">
      Already have one?
      <span> Log In</span>
    </p>

  </div>

</div>
)
}
 

  </>
);

}

export default LandingPage;