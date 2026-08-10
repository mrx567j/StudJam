const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const{mesg} = require('./models/Message.js')

const app = express();
const router = require('./routes/routes.js');
const server = http.createServer(app);
const io = new Server(server ,{cors: {
        origin: "http://localhost:3000",
        credentials: true
    }});
const PORT = process.env.PORT;


// io authentication middleware
io.use((socket, next) => {
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
     console.log(`User Connected ${socket.id}` );
      
     socket.on('join_room'  , (roomName)=>{
              socket.join(roomName);
              console.log(`user joined room ${roomName}`);
     })

     socket.on('send_message' , async(data)=>{
        console.log(data);
        console.log(data.msg)
          const t = await mesg.create({
              user_id:socket.userId,
              room_name:data.roomName,
              message:data.msg
         })
         io.to(data.roomName).emit('receive_message' ,t);
         console.log("Message sent")

       

     })

     socket.on("leave_room", (room) => {
   socket.leave(room);
     });

     socket.on('disconnect' , ()=>{
        console.log(`User disconnected${socket.id}`);
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