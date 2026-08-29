const express = require('express');
const bcrypt = require('bcrypt');
const  JWT = require('jsonwebtoken');
const {Use} = require('../models/User.js');

require('dotenv').config();

exports.SignUp = async(req,res)=>{
    console.log(req.body);
    const {avatar ,username ,email ,branch ,section ,password} = req.body;
     try{
         const FindUser = await Use.findOne({
              email:email
         })
         if(FindUser){
            return res.status(404).json({
                message: 'User is Already registered'
            })
         }

         let hashedPassword;

         try{
            hashedPassword = await bcrypt.hash(password,10);
         }catch(error){
            console.log(error);
         }

         const CreateUser = await Use.create({
            Avatar:avatar,
            User_name:username,
            email:email,
            password:hashedPassword,
            branch:branch,
            section:section
         })

         return res.status(200).json({
           message:'User registered successfully'
         })

        
     }catch(error){
        console.log(error);
        return res.status(500).json({
            message:'Internal server error'
        })
     }
}

exports.LogIn = async (req,res)=>{
 console.log(req.body);
      const {email,password} = req.body;
      
      try{
            const find = await Use.findOne({
                email:email
            })
            if(!find){
                return res.status(404).json({
                    message:"User didn't signed up"
                })
            }

            const payload={
                email:email
            }
            if(await bcrypt.compare(password,find.password)){
                let token = await JWT.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:'24h'
                })

                return res.cookie('token',token,{ 
                     httpOnly:true, //prevents browser javascript to read cookie
                     secure:false,  //Only send this cookie over an HTTPS connection.
                     sameSite:"none", // prevents cross site request forgery
                     maxAge: 24 * 60 * 60 * 1000

                }).json({
                    message:'LogIn Successful'
                })
            }else{
                return res.json({
                   message:'Wrong password'
                })
            }
      }catch(error){
        console.log(error)
        return res.status(500).json({
         
            message:'Internal server error'
        })
    }

}
