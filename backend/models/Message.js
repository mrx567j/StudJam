const mongoose = require('mongoose');
const {server} = require('./Server');
const {channel} = require('./Channel')

const messageSchema = new mongoose.Schema({
      user_id :{
        type:String,
        required :true
      },
      server_name:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Server"
      },
      room_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel"
      },
      user_name:{
        type:String,
        required:true
      },
      avatar:{
        type:String,
        required:true
      },
      message:{
        type:String,
      },
  
})

const mesg = mongoose.model('Messages',messageSchema);

module.exports = {mesg};