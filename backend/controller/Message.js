const express = require('express');
const {mesg} = require('../models/Message');
const{channel} = require('../models/Channel');

exports.message = async(req,res) =>{
    console.log("giving message")
    try{   
        const {c} = req.body;
        const findi = await channel.findOne({name:c});
        const fetchi = await mesg.find({room_name: findi._id});

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