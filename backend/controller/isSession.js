
const express = require('express');
const jwt =require('jsonwebtoken')
require('dotenv').config();




exports.sess = async(req,res)=>{
     console.log('session route hitted')
    
    try{

           const token = req.cookies.token;
       if(!token){
        return res.status(404).json({
            message:'user not found'
        })
       }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);

     if(!decoded){
         return res.status(400).json({
            message:"Wrong token"
         })
     }

     return res.status(201).json({
        message:"successfull"
     })

      

    


    }catch(error){

        return res.status(500).json({
            message:"internal server error"
        })
        

    }

}