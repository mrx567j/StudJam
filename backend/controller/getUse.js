

const express = require('express');
const {Use} = require('../models/User');

exports.Users = async(req,res) =>{
    try{
         const user = await Use.find();

         if(!user){
            return res.status(404),json({
                message:"Users not found"
            })
         }

         return res.status(201).json({
             user,
             message:"users find"
         })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })

    }
}