const  express = require('express');
const {server} = require('../models/Server');
const {Use} = require('../models/User');
const Jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createServer = async(req,res)=>{
    console.log("create Server route hit")
   try{
    const {Name,Desc} = req.body;
    const token = req.cookies.token;

    const decoded = Jwt.verify(token,process.env.JWT_SECRET)

    const emai = decoded.email;

    const findi1 = await server.findOne({name:Name});
    
    const findi2 = await Use.findOne({email:emai});
    const creatorId = findi2._id;

    if(findi1){
        return res.status(404).json({
            message:'server with similar name exists'
        })
    }

    const crea = await server.create({
         name :Name,
         description:Desc,
         createdBy:creatorId,
         members:[creatorId]
    })

    return res.status(201).json({
        message:'Server created successfully'
    })

   
   }
   catch(error){
       console.log(error);
       return res.status(500).json({
        message:"Internal Server Error"
       })
   }
}


exports.sendServerList = async(req,res)=>{
     const token = req.cookies.token;
     const decoded = Jwt.verify(token,process.env.JWT_SECRET)
     const emai = decoded.email;

     try{
    const findi2 = await Use.findOne({email:emai});
    const creatorId = findi2._id;
    const findi = await server.find({members:creatorId});
     
    return res.status(201).json({
        findi
    })
    
     }catch(error){
        console.log(error);
        return res.status(500).json({
        message:"Internal server error"
    })
     }


}

exports.getServerMembers = async(req,res)=>{
       
    const {serverName} = req.body;
   
    try{
        const findi = await server.findOne({name:serverName}).populate("members");
   

        if(!findi){
            return res.status(404).json({
                 message:"Not found"
            })
        }
        const x = findi.members;
        console.log(x)
         
        return res.status(200).json({
            ar:x
        })

        
    }catch(error){
        console.log(error)
         return res.status(500).json({
            message:"Internal server error"
         }
         )
    }



}

exports.searchServ = async(req,res)=>{
     const { search } = req.body;

     try{
  const token = req.cookies.token;
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  const findi1 = await Use.findOne({email:decoded.email});

  const findi = await server.find({
   
     name:{
        $regex:search ||"",
        $options:"i"
     }
,  members: {
    $ne: user._id
  }
  })

  if(!findi){
    return res.status(404).json({
        message:"servers not found"
    })
  }

  return res.status(200).json({
     findi
  })
  

}catch(error){
    return res.status(500).json({
        message:"Internal server error"
    })
}
}


 


