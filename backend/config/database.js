const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () => {
    try {
        console.log("Trying to connect to MongoDB...");

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.log("❌ MongoDB connection failed:");
        console.log(error.message);
    }
};

module.exports = { dbConnect };












// const mongoose = require('mongoose');
// require('dotenv').config();

// const dbConnect = ()=>{
//     mongoose.connect(process.env.MONGO_URL)
//     .then(()=>console.log('db connected'))
//     .catch((error)=>console.log(error));
// }

// module.exports = {dbConnect}