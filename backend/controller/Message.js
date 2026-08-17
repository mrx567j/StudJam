const express = require('express');
const {mesg} = require('../models/Message')

exports.message = async(req,res) =>{
    try{   
        const {room} = req.body;
        const fetchi = await mesg.find({room_name: room});

        if(!fetchi){
            return res.status(404).json({
                message:"no inbox yet"
            })
        }
        console.log(fetchi)

        return res.status(200).json({
            mesgi:fetchi
        })


    }

        

    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })

    }
}