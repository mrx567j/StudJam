const {otp} = require('../models/Otp');
const {Use} = require('../models/User.js');
const { message } = require('./Message.js');
const{sendEmail} = require('./OTP.js');
const express = require('express');
const crypto = require('crypto')
const bcrypt = require('bcrypt');

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
       console.log("otp sent" , otpi);


     
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
    console.log("reached verification route");
    const otpi = req.body.otp;
    const email = req.body.email;

try{
    const record = await otp
    .findOne({ email })
    .sort({ generatedAT: -1 });
    console.log("RECORD:", record);

    if(!record){
     return   res.status(404).json({message:"no otp"})
    }

    if(record.expiresAt< new Date()){
        console.log("hi")
        return res.status(404).json({message:"OTP INVALID"})
    }
if(record.attempts>=3){
    return res.status(400).json({message:"Too many attempts"})
}

    if(record.otp!=otpi){
        record.attempts +=1;
        await record.save();
        return res.status(404).json({message:''})
    }
    
 const resetToken = crypto.randomBytes(32).toString('hex');

 record.resetToken = resetToken;
record.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

await record.save();

console.log("Reset token is " , resetToken);
  res.cookie("resetToken" , resetToken ,{

    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "strict",
    maxAge: 10 * 60 * 1000

 })



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


exports.changePassword = async(req,res)=>{ 

    console.log('reached chnge')
 const email = req.body.email;
 const pass =req.body.newPass;
 const token = req.cookies.resetToken;
try{
 const rec = await Use.findOne({email:email});
  const rec2 = await otp.findOne({email:email});

  if(!rec2){
    console.log('not found')
  }
 if(token!=rec2.resetToken){
    return res.status(404).json({message:'reset token not available'})
 }

let newHash;
 
try{
 newHash = await bcrypt.hash(pass,10);
}catch(error){
    console.log(error);
}

rec.password = newHash;

await rec.save();
console.log('password changed');

return res.status(200).json({
    message:'password changes successfully'
})

}catch(error){
  console.log(error);
}




}