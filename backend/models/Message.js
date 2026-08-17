const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
      user_id :{
        type:String,
        required : true
      },
      room_name:{
        type:String,
        required:true
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