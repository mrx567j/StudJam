const mongoose = require('mongoose');

const {server} = require('./Server');
const {Use} = require('./User')

const channelSchema = new  mongoose.Schema({
     name :{
        type:String,
        required:true
     },
     server:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"server",
         required:true
     },
     createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
     },
    
     createdAt:{
        type:Date,
        default:Date.now()
     }
})


const channel = mongoose.model('Channel' , channelSchema);

module.exports = {channel};