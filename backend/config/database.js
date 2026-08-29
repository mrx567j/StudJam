const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('db connected'))
    .catch((error)=>console.log(error));
}

module.exports = {dbConnect}