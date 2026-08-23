const {otp} = require('../models/Otp');
const {Use} = require('../models/User.js');
const { message } = require('./Message.js');
const{sendEmail} = require('./OTP.js');
const express = require('express');

exports.utility = async(req,res) =>{
    console.log("arrived")
  const to = req.body.id;

try{

  const user = await Use.findOne({email:to});
  if(!user){
    return res.status(404).json({
        message:"User not found"
    })
  }

  
     const otpi = Math.floor(100000 + Math.random() * 900000).toString();
     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

       const t = await otp.create({
            email:to,
            otp:otpi,
            expiresAt:expiresAt
       })
       console.log(otpi,t);


     
     await sendEmail(
         to,
         'otp verification',
         `Your verification code is${otpi}`
     )
     

     res.status(201).json({
        message:"successfully sent"
     }
     )
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:'Internal server error'
        })
    }
  

}


exports.verify = async(req,res)=>{
    const otp = req.body.otp;
    const email = req.body.email;

try{
    const record = await otp.findOne({
         where:email,
         order:['generatedAt' , 'DESC']
    
    })

    if(!record){
     return   res.status(404).json({message:"no otp"})
    }

    if(record.expiresAt< new Date()){
        return res.status(404).json({message:"OTP INVALID"})
    }
if(record.attempts>=3){
    return res.status(400).json({message:"Too many attempts"})
}

    if(record.otp!=otp){
        record.attempts +=1;
        await record.save
        return res.status(404).json({message:''})
    }

    return res.status(200).json({
        message:"OTP verified"
    })
}catch(error){
    console.log(error)
    return res.status(500).json({
        message:"Internal server error"
    })
}





}