const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async(receiver,subject,text)=>{
  
    try{
  const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
  });

  const mailOptions = {
     from:process.env.EMAIL_USER,
     to:receiver,
     subject,
     text
  }


  await transporter.sendMail(mailOptions);
}catch(error){
    console.log(error);
}

    
     

}