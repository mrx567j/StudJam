import React, { use, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import io from "socket.io-client"
import './publicChat.css';

const socket = io("http://localhost:5713" ,{
   withCredentials:true
});

socket.on("connect", () => {
    console.log("SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("SOCKET ERROR:", err.message);
});






const rooms = [
  { name: "general", desc: "Anything goes", active: true },
  { name: "math", desc: "Numbers hurt" },
  { name: "cs-coding", desc: "Debug together" },
  { name: "science", desc: "Lab reports 🧪" },
  { name: "english", desc: "Essay gang" },
  { name: "random", desc: "Memes & chaos" },
];

const users = [
  { avatar: "👑", name: "algo_queen", color: "pink" },
  { avatar: "🧑‍💻", name: "dev_dan", color: "cyan" },
  { avatar: "👻", name: "math_ghost", color: "lime" },
  { avatar: "🎵", name: "swiftie_stem", color: "purple" },
  { avatar: "😂", name: "procrastination_king", color: "orange" },
];

const messages = [
  {
    avatar: "💻",
    name: "math_ghost",
    time: "2:16 PM",
    text: "yeah that one. the trick is you gotta find det(A - λI) = 0 first and work from there",
    reactions: [
      { emoji: "🙋", count: 6 },
      { emoji: "💡", count: 4 },
    ],
  },
  {
    avatar: "🥶",
    name: "anxious_coder99",
    time: "2:17 PM",
    text: "WAIT that actually makes sense omg thank you",
    reactions: [{ emoji: "🎉", count: 3 }],
  },
  {
    avatar: "😂",
    name: "procrastination_king",
    time: "2:18 PM",
    text: "no cap this channel saves my GPA every semester lmaooo",
    reactions: [
      { emoji: "😂", count: 2 },
      { emoji: "💯", count: 7 },
    ],
  },
  {
    avatar: "🎵",
    name: "swiftie_stem",
    time: "2:20 PM",
    text: "does anyone have the lecture slides from monday? i was sick",
    reactions: [],
  },
  {
    avatar: "🧑‍💻",
    name: "dev_dan",
    time: "2:21 PM",
    text: "dm me I'll send them over 👍",
    reactions: [{ emoji: "❤️", count: 4 }],
  },
];

function PubChat() {
   const [message , setMessage] = useState("");
   const [room , setRoom] = useState("general");
   const [users , setUsers] = useState([]);
   const [online_Users , setOnlineUsers] = useState([]);

   useEffect(()=>{
       socket.on("online_Users" , (users)=>{
        console.log(users);
        setOnlineUsers(users);
       });

       return()=>{
        socket.off("online_users");
       }
     
   },[])

   useEffect(()=>{
  const getusers = async()=>{
    try{
             const response = await fetch("http://localhost:5713/getUsers");

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

      

  }

  



  return (
    <div className="chat-app">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">

        <div className="brand">
          <span className="brand-logo">🎓</span>
          <span className="brand-name">StudentForum</span>
        </div>

        <div className="nav-links">
          <button className="nav-btn">
            🏠 <span>Home</span>
          </button>

          <button className="nav-btn active-nav">
            💬 <span>Chat</span>
          </button>
        </div>

        <div className="auth-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
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
              ONLINE — 5
            </div>

            <div className="users-list">
              {online_Users.map((online_Users) => (
                <div className="online-user" key={online_Users.User_name}>

                  <div className="user-avatar">
                    {online_Users.Avatar}
                    <span className="online-dot"></span>
                  </div>

                  <span className={'username '}>
                    {online_Users.User_name}
                  </span>

                </div>
              ))}
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
              5 online
            </div>

          </div>


          {/* Messages */}
          <div className="messages-container">

            {messages.map((message, index) => (

              <div className="message" key={index}>

                <div className="message-avatar">
                  {message.avatar}
                </div>

                <div className="message-content">

                  <div className="message-meta">
                    <span className={`message-username username-${index}`}>
                      {message.name}
                    </span>

                    <span className="message-time">
                      {message.time}
                    </span>
                  </div>

                  <div className="message-bubble">
                    {message.text}
                  </div>

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
                  )}

                </div>

              </div>

            ))}

          </div>


         <div className="message-input-container">
    <input
        type="text"
        placeholder="Type your message..."
        className="message-input"
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