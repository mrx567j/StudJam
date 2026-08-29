import React, { use, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import io from "socket.io-client"
import './publicChat.css';


const socket = io("https://studjam.onrender.com" ,{
   withCredentials:true,
     autoConnect: false
});

socket.on("connect", () => {
    console.log("SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("SOCKET ERROR:", err.message);
});








function PubChat() {
   const [message , setMessage] = useState("");
   const [room , setRoom] = useState("general");
   const [users , setUsers] = useState([]);
   const [online_Users , setOnlineUsers] = useState([]);
   const [prevMessage , setPrevMsg] = useState([]);
   const [countOnline , setCount] = useState(0);
   const [currentUser , setCurrUser] = useState(null);

   const navigate = useNavigate();

   useEffect(()=>{
    
      const getCurrUser = async()=>{
        console.log("call me")
        try{
        const l = await fetch("https://studjam.onrender.com/me",{
          credentials:"include"
        });

        

      const data = await l.json();
      localStorage.setItem("jis" , data.avatar);
      localStorage.setItem("jis2" , data.id);
      localStorage.setItem("jis3" , data.branch);
      localStorage.setItem("jis4" , data.section);
      localStorage.setItem("jis5" , data.username);

      if(l.ok){
        console.log(data);
        setCurrUser(data);

        socket.connect();
      }else{
        alert("hehe")
      }
    }catch(error){
      console.log(error);
    }



      }

     getCurrUser();

   },[])

   const currId = localStorage.getItem("jis2");

   useEffect(()=>{
       socket.on("online_Users" , (users)=>{
        console.log(users);
        setOnlineUsers(users);
        setCount(users.length);
        console.log(countOnline)
       });

       return()=>{
        socket.off("online_users");
       }
     
   },[])

   useEffect(()=>{
  const getusers = async()=>{
    try{
             const response = await fetch("https://studjam.onrender.com/getUsers");

             const data = await response.json();
            
             console.log(data.user);
             setUsers(data.user);


    }catch(error){
             console.log(error);
    } 
     
   }
   getusers();
  },[])

  

    

   useEffect(() => {
    // Join the initially selected room
    socket.emit("join_room", room);

   return () => {
    socket.emit("leave_room", room);
  };
  }, [room]);

  const openRoom = (roomName) => {
    setRoom(roomName);

   
  };

  const sendMessage = async()=>{
    console.log(message)
         const data = {
            roomName: room,
            msg: message
         }

         socket.emit("send_message" , data);
 setMessage("");
      

  }

  useEffect(()=>{
     const receiveMessage = async()=>{

       const data = {room};
       try{
       const response = await fetch("https://studjam.onrender.com/getMessages",{
          method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 credentials:"include",
                 body:JSON.stringify(data),
       })
       const res = await response.json();

            console.log("ROOM:", room);
            console.log("FULL RESPONSE:", res);
            console.log("MESSAGES:", res.mesgi);

       if(response.ok){
        setPrevMsg(res.mesgi);
       }else{
        console.log(res.message);
       }
      }catch(error){
        console.log(error);
      }
      }

      receiveMessage();
  },[room]
    )


  useEffect(()=>{

     const handleMessage = (data)=>{
setPrevMsg(prev=>[...prev,data]);
     }
     socket.on('receive_message',handleMessage)

        return () => {
        socket.off("receive_message", handleMessage);
    };
  },[])

  


  const t = localStorage.getItem('Tag');


       

     
  


  
  



  return (
    <div className="chat-app">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">

        

        <div className="brand">
          <span className="brand-logo">🎓</span>
          <span className="brand-name">StudentForum</span>
        </div>

        <div className="nav-links">
          <button className="nav-btn" onClick={()=>{navigate('/')}}>
            🏠 <span>Home</span>
          </button>

          <button className="nav-btn active-nav">
            💬 <span>Chat</span>
          </button>
        </div>

       

        <div className="auth-buttons">
          {/* <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button> */}
           <div className="profile-icon" onClick={()=>{navigate(`/Profile/${currId}`)}}>
                 {currentUser?.avatar || "👤"}
            </div>
        </div>
      </header>


      {/* ================= MAIN ================= */}
      <div className="chat-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">

         <div className="sidebar-title">
  <span>ROOMS</span>
  <button className="plus-btn">+</button>
</div>

         <div className="rooms-list">
    <button className="room selected-room"
     onClick = {()=>{openRoom("general")}}>
      <div className="room-name">
        <span>#</span> general
      </div>

      <div className="room-description">
        Anything goes
      </div>
    </button>
  </div>


          <div className="online-section">

            <div className="online-title">
              ONLINE — {countOnline}
            </div>

            <div className="users-list">
              {online_Users.map((online_Users) => (
                <div className="online-user" key={online_Users.User_name}>

                  <div className="user-avatar" >
                    {online_Users.Avatar}
                    <span className="online-dot"></span>
                  </div>

                  <span className={'username '}>
                    {online_Users.User_name}
                  </span>

                </div>
              ))}
            </div>
            <div className="online-title">
              Server Members-{}
            </div>

          </div>

        </aside>


        {/* ================= CHAT AREA ================= */}
        <main className="chat-area">

          {/* Chat Header */}
          <div className="chat-header">

            <div className="channel-info">
              <span className="hash">#</span>
              <span className="channel-name">general</span>

              <span className="separator">—</span>

              <span className="channel-description">
                Anything goes
              </span>
            </div>

            <div className="online-count">
              <span className="green-dot"></span>
              {countOnline} online
            </div>

          </div>


          {/* Messages */}
          <div className="messages-container">

            {prevMessage.map((message, index) => (

              <div className="message" key={index}>

                <div className="message-avatar"   onClick = {()=>(navigate(`/Profile/${message.user_id}`))}>
                  {message.avatar}
                </div>

                <div className="message-content">

                  <div className="message-meta">
                    <span className={`message-username username-${index}`}>
                      {message.user_name}
                    </span>

                    {/* <span className="message-time">
                      {message.time}
                    </span> */}
                  </div>

                  <div className="message-bubble">
                    {message.message}
                  </div>
{/* 
                  {message.reactions.length > 0 && (
                    <div className="reactions">

                      {message.reactions.map((reaction, reactionIndex) => (
                        <div
                          className="reaction"
                          key={reactionIndex}
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </div>
                      ))}

                    </div>
                  )} */}

                </div>

              </div>

            ))}

          </div>


         <div className="message-input-container">
    <input
        type="text"
        placeholder="Type your message..."
        className="message-input"
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
    />

    <button className="send-button" onClick={sendMessage}>
        ➤
    </button>
</div>
        </main>

      </div>


      {/* Help button */}
      <button className="help-button">?</button>

    </div>

     
        );
    
}

export default PubChat;