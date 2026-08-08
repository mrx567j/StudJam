const express = require('express');

exports.mid = async(req,res,next) =>{
          
    const token = req.cookie.token;

   

    try{
        if(!token){
            return res.status(404).json({
                message:"Session expired"
            })
        }

        next();
     
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Session has been expired"
        })

    }

}