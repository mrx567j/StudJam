import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect} from "react";
import './landingPage.css'
import './logIn.css'
import './signUp.css'




function LandingPage({tag , setTag}){
 const[isLogIn,setLogIn] = useState(false);
 const[isSignUp,setSignIn] = useState(false);
 const navigate = useNavigate();

 useEffect(()=>{
    const isSession = async()=>{
       const response = await fetch('http://localhost:5713/isSession',{ 
         credentials:'include'
       })
       const res = await response.json();

       if(response.ok){
         setTag(true)
       }else{
         console.log('session expired')
         setTag(false)
       }
    }

    isSession()
 },[])


 const openLogIn = ()=>{
     console.log("Login clicked");
          setLogIn(true)
          setSignIn(false);}
 const closeLogIn = ()=>{
            setLogIn(false);
 }

 

 const openSignUp= ()=>{
     console.log("Login clicked");
          setSignIn(true);
          setLogIn(false)
        }
          
 const closeSignUp = ()=>{
            setSignIn(false);
 }

 const [avatar ,setAvatar] = useState('🎓')
 const [username , setUsername] = useState('');
 const [email,setEmail] = useState('');
 const [branch ,setBranch] = useState('');
 const [section , setSec] = useState('');
 const [password,setPass] = useState('');
 

 const signUpApi = async(e)=>{
  e.preventDefault();
     const data = {avatar,username,email,branch,section,password};

     try{
     const response = await fetch('http://localhost:5713/SignUp',{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data),
     })

     const res = await response.json();
     if(response.ok){
       setSignIn(false);
       alert('User registered in Succesfully')
     }else{
      alert('wrong credentials')
     }
    }catch(error){
      console.log(error);
    }
 }

 const logInApi = async(e)=>{
  e.preventDefault() //since form triggers normal browser behaviour thats why we used it 
   const data = {email,password}
   try{
     const response = await fetch('http://localhost:5713/LogIn',{
                        method:'POST',
                        headers:{'Content-Type' : 'application/json '},
                        credentials:"include",
                        body:JSON.stringify(data)
     })

      const res = await response.json()
      if(response.ok){
        console.log(res.message);
        setLogIn(false)
        setTag(true)
        // localStorage.setItem('Tag' , tag)
        alert('LogIn successful')
      }else{
        alert('failed')
      }

   }catch(error){
     console.log(error)
          
   }
 }



 


    return(
        <>
    <div className="landing-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="logo-container">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">StudentForum</span>
          {tag && (
            
               <div className="nav-links2">
          <button className="nav-btn active-nav" onClick={()=>navigate('/')}>
            🏠 <span>Home</span>
          </button>

          <button className="nav-btn" onClick={()=>{ navigate('/PubChat') }}>
            💬 <span>Chat</span>
          </button>
        </div>

        
        
        
          )
          }
            </div>
          {!tag && (
      
        <div className="nav-actions">
          <button className="btn btn-outline-cyan" onClick={openLogIn}>Log In</button>
          <button className="btn btn-pink" onClick={openSignUp}>Sign Up</button>
        </div>
          )
}
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

          <button className="tab" onClick={openSignUp}>
            ✨ Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={logInApi}>
          <input
            type="email"
            placeholder="email address"
            onChange={(e)=>{setEmail(e.target.value)}}
          />

          <input
            type="password"
            placeholder="password"
            onChange={(e)=>{setPass(e.target.value)}}
          />

          <button type="submit" className="login-btn">
            Log In <span>→</span>
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          No account?{" "}
          <span className="signup-link" onClick={openSignUp}>
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

      <button className="tab" onClick={openLogIn}>
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

      <button className="avatar" onClick={()=>{setAvatar('🎓')}}>🎓</button>
      <button className="avatar" onClick={()=>{setAvatar('🤓')}}>🤓</button>
      <button className="avatar" onClick={()=>{setAvatar('😎')}}>😎</button>
      <button className="avatar" onClick={()=>{setAvatar('🦊')}}>🦊</button>
      <button className="avatar" onClick={()=>{setAvatar('🐼')}}>🐼</button>
      <button className="avatar" onClick={()=>{setAvatar('🐸')}}>🐸</button>
      <button className="avatar" onClick={()=>{setAvatar('🦄')}}>🦄</button>

      <button className="avatar" onClick={()=>{setAvatar('🐙')}}>🐙</button>
      <button className="avatar" onClick={()=>{setAvatar('🎮')}}>🎮</button>
      <button className="avatar" onClick={()=>{setAvatar('🎸')}}>🎸</button>
      <button className="avatar" onClick={()=>{setAvatar('🌟')}}>🌟</button>
      <button className="avatar" onClick={()=>{setAvatar('🔥')}}>🔥</button>

    </div>

    

    {/* Form */}

    <form className="signup-form" onSubmit={signUpApi}>
    

      <input
        type="text"
        placeholder="username (e.g. study_beast)"
        onChange={(e)=>{setUsername(e.target.value)}}
      />

      <input
        type="email"
        placeholder="email address"
        onChange={(e)=>{setEmail(e.target.value)}}
      />

      

      <input
        type="text"
        placeholder="Branch"
        onChange={(e)=>{setBranch(e.target.value)}}
      />

      <input
        type="text"
        placeholder="Section"
        onChange={(e)=>{setSec(e.target.value)}}
      />

      <input
        type="password"
        placeholder="password"
        onChange = {(e)=>{setPass(e.target.value)}}
      />

      <button
        type="submit"
        className="signup-btn" onClick={signUpApi}
      >
        Create Account 🚀
      </button>

    </form>

    <p className="signup-footer" >
      Already have one?
      <span onClick={openLogIn}> Log In</span>
    </p>

  </div>

</div>
)
}
 

  </>
);

}

export default LandingPage;