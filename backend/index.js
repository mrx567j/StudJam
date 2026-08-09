const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = require('./routes/routes.js');
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

io.on('connection' , (socket)=>{
     console.log(`User Connected ${socket.id}` );
      
     socket.on('join_room'  , (roomName)=>{
              socket.join(roomName);
              console.log(`user joined room ${roomName}`);
     })

     socket.on('send_message' , (data)=>{
         io.to(data.roomName).emit(data.message);
         console.log("Message sent")
     })

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