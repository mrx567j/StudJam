const express = require('express');
const jwt =require('jsonwebtoken')
require('dotenv').config();


exports.authi = async(req,res,next)=>{
    
    try{

           const token = req.cookies.token;
       if(!token){
        return res.status(404).json({
            message:'user not found'
        })
       }

     const decoded = jwt.verify(token,process.env.JWT_SECRET);

     req.user = decoded;

    next();


    }catch(error){

        return res.status(500).json({
            message:"internal server error"
        })
        

    }
}