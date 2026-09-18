const express = require('express');
const jwt =require('jsonwebtoken')
require('dotenv').config();

exports.authi = (req, res, next) => {
    try {
        
        const token = req.cookies?.token;

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                message: "No token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
// exports.authi = async(req,res,next)=>{
//     console.log("hj")
//     try{

//            const token = req.cookies.token;
//        if(!token){
//         return res.status(404).json({
//             message:'user not found'
//         })
//        }

//      const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         console.log('x');
//      req.user = decoded;

//     next();


//     }catch(error){

//         return res.status(500).json({
//             message:"internal server error"
//         })
        

//     }
// }