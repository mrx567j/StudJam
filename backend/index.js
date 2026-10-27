const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//Importing my db models
const {Use} = require("./models/User.js");
const{mesg} = require('./models/Message.js') // imported model where i will store my messages
const {server} = require('./models/Server.js')
const {channel} = require('./models/Channel.js')

const app = express();
const router = require('./routes/routes.js');

const Server2 = http.createServer(app); //This makes my normal server wrapped up in http to use websocket

const io = new Server(Server2 ,{cors: { //This is the socket.io server class instance which attaches itself to the http server   
        origin: 'http://localhost:3000', // and it handles the real time communication between frontend and backend
        credentials: true
    }});
const PORT = process.env.PORT;

async function sendOnlineUsers(roomName){
const room = io.sockets.adapter.rooms.get(roomName); //It give info of all socket (unique client connections) to that room 
                                                     //in case there is no room .get() return undefined

              const userIds = new Set(); //set helps to store unique elements

              if(room){ //It iterates over all socketIds that we got 
                room.forEach((socketId) =>{
                    const socketUser = io.sockets.sockets.get(socketId); //io.sockets.sockets is a map of connected socket IDs to their corresponding socket objects
                                                                         //it retreives the socket object 
                    if(socketUser){
                        userIds.add(socketUser.userId.toString());
                    }
                });
              }

              const users = await Use.find({  //users gives an array 
                email :{$in:[...userIds]}
              }).select("email User_name Avatar") //select limits the field to be send 

              io.to(roomName).emit("online_Users" ,users); //backend emits this event to frontend and frontend will display these users
}


// io authentication middleware
io.use((socket, next) => {  //Iused this middleware to get the real id of the person whose socket is connected
    console.log('reached')
    try {
        const cookieHeader = socket.handshake.headers.cookie; //handshake headers stores the info from browser including cookies

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


io.on('connection' ,  (socket)=>{ //Here socket is the client that has connected with your socket.io
     console.log(`User Connected ${socket.userId}` ); //it gives the socket id of that client
     
      
     socket.on('join_room'  , async (roomName)=>{ //when the join room event  emits from frontend this callback runs 
              socket.join(roomName); //socket joins that client to that room 
              console.log(`user joined room ${roomName}`);
              socket.roomName = roomName;

              await sendOnlineUsers(roomName); //this function will returns the active users present in that room 
              
     })

     

     socket.on('send_message' , async (data)=>{//Important event when a client send message in that room and data is an object of message
        console.log(data);
         console.log("FULL DATA:", JSON.stringify(data));
        console.log(data.msg);
      console.log("ROOM FROM CLIENT:", data.roomName);
        console.log(data.server_name);
          const us = await Use.findOne({email:socket.userId});
          const findi = await server.findOne({name:data.server_name});
          const findi2 = await channel.findOne({name:data.roomName});
          console.log(us);
          console.log(findi2);
          const t = await mesg.create({  //Here it will add the messages to a database so user can see the previous messages he sent
              user_id:socket.userId,
              user_name:us.User_name,
              avatar:us.Avatar,
              server_name:findi._id,
              room_name:findi2._id,
              message:data.msg
         })
         io.to(data.roomName).emit('receive_message' ,t);
         console.log("Message sent");

       

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


//cors helps to prevent unauthorized requests to reach and prevents hackers to send req by masquerading a website
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/',router);

dbConnect();

// const startServer = async () => {
//     try {
//         await dbConnect();

//         server.listen(PORT, () => {
//             console.log('Server started', PORT);
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();



Server2.listen(PORT ,()=>{
    console.log('Server started' , PORT);
})

