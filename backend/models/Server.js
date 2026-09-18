const mongoose = require('mongoose');

const {Use} = require('./User');

const serverSchema = new  mongoose.Schema({
     name :{
        type:String,
        required:true
     },
     description:{
        type:String,
     },
     createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
     },
     members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
     }],
     createdAt:{
        type:Date,
        default:Date.now()
     }
})


const server = mongoose.model('Server' , serverSchema);

module.exports = {server};