const express = require('express');
const bcrypt = require('bcrypt');
const  JWT = require('jsonwebtoken');
const {Use} = require('../models/User.js');

require('dotenv').config();

//req and res are objects provided and initialises by express when it receives a http request va nodejs
// expresses passes arguments of req and res when the function is called


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
            hashedPassword = await bcrypt.hash(password,10);  //we use bcrypt module to encrypt the password from frontend with the help of some hashing algorithms
         }catch(error){
            console.log(error);
         }

         const CreateUser = await Use.create({ //Here we create User document into our db collection
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
      const {email,password} = req.body; //here we are destructuring the object from request body
      
      try{
            const find = await Use.findOne({
                email:email
            })
            if(!find){
                return res.status(404).json({
                    message:"User didn't signed up"
                })
            }

            //There are three components of a jwt token respectively (header.Payload.Signature)
                 //->Payload contains the main info about user so it can be used for authorization without asking user to logIn again and again
                 //Header contains info about how token is created
            const payload={
                email:email
            }
            if(await bcrypt.compare(password,find.password)){
                let token = await JWT.sign(payload,process.env.JWT_SECRET,{  //It adds JWT signature which tells the server during auth that this token was send by this server
                    expiresIn:'12h'
                })
               
                //We generally send token inside a cookie which gets stored at browser and automatically attaches to request to server so we can get token at server securily
                //Also it is token that maintains a session between client and server
                return res.cookie('token',token,{ 
                     httpOnly:true, //prevents browser javascript to read cookie
                     secure:false,  //Only send this cookie over an HTTPS connection.
                     sameSite:"lax", // prevents cross site request forgery
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
