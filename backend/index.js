const express = require('express');
const { dbConnect } = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = require('./routes/routes.js');

const PORT = process.env.PORT;

dbConnect();

app.use(cors({
     origin: 'http://localhost:3000', 
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/',router);



app.listen(PORT ,()=>{
    console.log('Server started' , PORT);
})