const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const {Use} = require("./models/User.js");
const{mesg} = require('./models/Message.js') // importedd model where i will store my messages

const app = express();
const router = require('./routes/routes.js');
const server = http.createServer(app);
const io = new Server(server ,{cors: {
        origin: "http://localhost:3000",
        credentials: true
    }});
const PORT = process.env.PORT;

async function sendOnlineUsers(roomName){
const room = io.sockets.adapter.rooms.get(roomName);
              const userIds = new Set();

              if(room){
                room.forEach((socketId) =>{
                    const socketUser = io.sockets.sockets.get(socketId);

                    if(socketUser){
                        userIds.add(socketUser.userId.toString());
                    }
                });
              }

              const users = await Use.find({
                email :{$in:[...userIds]}
              }).select("email User_name Avatar")
              io.to(roomName).emit("online_Users" ,users);
}


// io authentication middleware
io.use((socket, next) => {  //Iused this middleware to get the real id of the person whose socket is connected
    console.log('reached')
    try {
        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
            return next(new Error("No cookie"));
        }

        const token = cookieHeader
            .split("; ")
            .find(c => c.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return next(new Error("No token"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.userId = decoded.email;
        

        next();

    } catch (error) {
        
        next(new Error("Invalid token"));
    }
});


io.on('connection' ,  (socket)=>{
     console.log(`User Connected ${socket.userId}` );
   
      
     socket.on('join_room'  , async (roomName)=>{
              socket.join(roomName);
              console.log(`user joined room ${roomName}`);
              socket.roomName = roomName;

              await sendOnlineUsers(roomName)
              
     })

     

     socket.on('send_message' , async (data)=>{
        console.log(data);
        console.log(data.msg);
          const us = await Use.findOne({email:socket.userId});
          console.log(us);
          const t = await mesg.create({
              user_id:socket.userId,
              user_name:us.User_name,
              avatar:us.Avatar,
              room_name:data.roomName,
              message:data.msg
         })
         io.to(data.roomName).emit('receive_message' ,t);
         console.log("Message sent")

       

     })

     socket.on("leave_room", async (room) => {
   socket.leave(room);
    await sendOnlineUsers(room);
     });

     socket.on('disconnect' , async()=>{
        console.log(`User disconnected${socket.id}`);
        if(socket.roomName){
            
            // Wait until Socket.IO has removed the socket
            setTimeout(async () => {
                await sendOnlineUsers(socket.roomName);
            }, 0);
        }
     })
})

dbConnect();

app.use(cors({
     origin: 'http://localhost:3000', 
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/',router);



server.listen(PORT ,()=>{
    console.log('Server started' , PORT);
})