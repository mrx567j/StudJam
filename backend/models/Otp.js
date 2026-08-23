const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
      email:{ 
        type:String,
        required:true
      },
      otp:{
        type:Number,
        required:true
      },
      generatedAT:{
        type:Date,
        default:Date.now(),
        required:true
      },
    expiresAt:{ 
      type:Date,
      required:true
    },
    attempts:{
      type:Number,
      default:0
    }
        
      
})

const otp = mongoose.model('OTP' , OtpSchema);

module.exports = {otp};