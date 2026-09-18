const express = require('express')
const Jwt = require("jsonwebtoken")

const {Use} = require('../models/User')

const {server} = require('../models/Server');
const {channel} = require('../models/Channel');
require('dotenv').config();

exports.createChannel =async(req,res)=>{
     const {name,serverName}= req.body;
     const token = req.cookies.token;
try{
     const findi = await server.findOne({name:serverName});

 
    const decoded = Jwt.verify(token,process.env.JWT_SECRET)

    const emai = decoded.email;
    const findi2 = await Use.findOne({email:emai})


    if(!findi && !findi2){
        return res.status(404).json({
            message:"Not found"
        })
    }

    const cre = await channel.create({
        name:name,
        server:findi._id,
        createdBy:findi2._id
    })

    return res.status(200).json({
        message:"channel created"
    })

}catch(error){
 console.log(error);
 return res.status(500).json({
    message:'Internal server error'
 })
}

}


exports.getChannel = async(req,res)=>{
    
  const {serverName} = req.body;

  const findi = await server.findOne({name:serverName});
  const findi2  = await channel.find({server:findi._id});

  if(!findi2){
     return res.status(404).json({
            message:"Not found"
        })
  }
  console.log(findi2)
  return res.status(201).json({
    ar:findi2,
  })


}