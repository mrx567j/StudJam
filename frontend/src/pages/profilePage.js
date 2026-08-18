import React from "react";

import { useNavigate } from "react-router-dom";
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
  const avatar = localStorage.getItem("jis");
  const email = localStorage.getItem("jis2");
  const branch = localStorage.getItem("jis3");
  const section = localStorage.getItem("jis4");
  const username = localStorage.getItem("jis5");
  console.log(avatar);
  const navigate = useNavigate();


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

  
 


 return (
    <div className="profile-page">

      {/* Navbar */}
      <nav className="profile-navbar">

        <div className="profile-logo">
          🎓 <span>StudentForum</span>
        </div>

        <button
          className="logout-btn"
          
        >
          Logout
        </button>

      </nav>


      {/* Profile Container */}
      <main className="profile-wrapper">

        <div className="profile-card">

          {/* Avatar */}
          <div className="profile-avatar">
            {avatar || "👤"} 
          </div>


          {/* User Information */}
          <h1>Mradul Tiwari</h1>

          <p className="username">
         {username}
          </p>


          <div className="profile-details">

            <div className="detail">
              <span className="detail-label">
                Email
              </span>

              <span className="detail-value">
               {email}
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
          <div className="profile-actions">

            <button
              className="edit-btn"
              
            >
              Edit Profile
            </button>


            <button
              className="password-btn"
              
            >
              Change Password
            </button>


            <button
              className="logout-card-btn"
              onClick = {handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </main>


      {/* Help */}
      <button className="help-btn">
        ?
      </button>

    </div>)


}

export default Profile;