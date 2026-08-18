

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

exports.getMe = async(req,res)=>{
     
     const em = req.user.email;
    
     try{
        const me = await Use.findOne({email:em});

        if(!me){
            return res.status(404).json({
                message:"User not found"
            })
        }
         console.log(me)
        return res.status(200).json({
             avatar:me.Avatar,
             id:me.email,
             branch:me.branch,
             section:me.section,
             username:me.User_name

        })

     }catch(error){
         return res.status(500).json({
            message:"Internal server error"
         })
     }


}



