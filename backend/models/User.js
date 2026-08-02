const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     Avatar:{
        type:String,
        default:"🎓"
     },
     User_name:{
        type:String,
        required:true,
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     branch:{
        type:String,
        required:true
     },
     section:{
        type:String,
        required:true
     }
})

const Use = mongoose.model('Student',userSchema);

module.exports = {Use};