import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  MessageCircle,
  Bookmark,
  Settings,
  Bell,
  MapPin,
  GraduationCap,
  BookOpen,
  Lightbulb,
  Clock,
  Activity,
  Plus,
  Trophy,
  Flame,
  Star,
  Edit3,
  HelpCircle,
  Users,
} from "lucide-react";

import './profilePage.css'


function Profile(){
  // const avatar = localStorage.getItem("jis");
  // const email = localStorage.getItem("jis2");
  // const branch = localStorage.getItem("jis3");
  // const section = localStorage.getItem("jis4");
  // const username = localStorage.getItem("jis5");
  const [avatar , setAvatar] = useState("");
  const[branch , setBranch] = useState("");
  const[section ,setSection] = useState("");
  const[username , setUsername] = useState("");
  

  const {id} =useParams();
  const id2 = localStorage.getItem('jis2');

const jik = id === id2;

  console.log({id});
  console.log(avatar);
  const navigate = useNavigate();

useEffect(()=>{ 
  const getUserProf = async()=>{
    
     try{
      const r = await fetch("http://localhost:5713/userProf" ,{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify({id}),
      })
      const res = await r.json();
      if(r.ok){
        console.log(res);
        setAvatar(res.fetchi.Avatar)
        setBranch(res.fetchi.branch)
        setSection(res.fetchi.section)
        setUsername(res.fetchi.User_name)
      }
      

    }catch(error){
       console.log(error);
    }
 } 

 getUserProf()
},[id])






  const handleLogout =async()=>{
    try{
      const r  = await fetch("http://localhost:5713/logout" , {
        method:"POST",
        credentials:"include"
      })

      const d = await r.json();
      if(r.ok){
        alert("successfully logged out")
        navigate('/');
      }

    }catch(error){
        console.log(error);
    }



  }


  const handleRecovery = async()=>{
    console.log('sending otp')
    try{
       const response = await fetch("http://localhost:5713/sendOtp",{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify({id})
       })
     const res = await response.json();


       if(response.ok){
        alert('Otp sent to your linked email')
        navigate('/Recovery')
       }else{
          console.log(res.message);
       } 


    }
  catch(error){
  console.log(error)
  }
}
  
 


 return (
    <div className="profile-page">

      {/* Navbar */}
      <nav className="profile-navbar">

        <div className="profile-logo">
          🎓 <span>StudentForum</span>
        </div>
{jik && (
        <button
          className="logout-btn"
          
        >
          Logout
        </button>
)
}

      </nav>


      {/* Profile Container */}
      <main className="profile-wrapper">

        <div className="profile-card">

          {/* Avatar */}
          <div className="profile-avatar">
            {avatar || "👤"} 
          </div>


          {/* User Information
          <h1>Mradul Tiwari</h1> */}

          <p className="username">
         {username}
          </p>


          <div className="profile-details">

            <div className="detail">
              <span className="detail-label">
                Email
              </span>

              <span className="detail-value">
               {id}
              </span>
            </div>


            <div className="detail">
              <span className="detail-label">
                Course
              </span>

              <span className="detail-value">
                B Tech
              </span>
            </div>


            <div className="detail">
              <span className="detail-label">
                Branch
              </span>

              <span className="detail-value">
                  {branch}
              </span>
            </div>
             <div className="detail">
              <span className="detail-label">
                Section
              </span>

              <span className="detail-value">
                  {section}
              </span>
            </div>


            <div className="detail">
              <span className="detail-label">
                Year
              </span>

              <span className="detail-value">
                3rd Year
              </span>
            </div>

          </div>

 {/* Actions */}
{jik && 
         
          (<div className="profile-actions">

            <button
              className="edit-btn"
              
            >
              Edit Profile
            </button>


            <button
              className="password-btn"
              onClick={handleRecovery}
            >
              Change Password
            </button>


            <button
              className="logout-card-btn"
              onClick = {handleLogout}
            >
              Logout
            </button>

          </div>)
  }

        </div>

      </main>


      {/* Help */}
      <button className="help-btn">
        ?
      </button>

    </div>)


}

export default Profile;