const express = require('express');
const {Use} = require('../models/User.js');

exports.getUserProfile = async(req,res)=>{
     try{
        const {id} = req.body
        const fetchi= await Use.findOne({email:id});
        console.log(fetchi);
        if(!fetchi){
            return res.status(404).json({
                message:"User Not found"
            })
        }

        return res.status(201).json({
            fetchi
        })

     }catch(error){
       console.log(error);
       return res.status(200).json({
          message:"Internal server error"
       })
     }
}