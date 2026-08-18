const express = require('express');
const router = express.Router();
const {SignUp ,LogIn} = require('../controller/Auth.js');
const {mid} = require('../middleware/mid.js')
const {message} = require('../controller/Message.js');
const {Users} =require("../controller/getUse.js");
const {authi} = require("../middleware/authi.js")
const {getMe} = require("../controller/getUse.js")

router.post('/SignUp',SignUp);
router.post('/LogIn' , LogIn);

router.get('/PubChat' , mid,);
router.post('/getMessages' , message)
router.get('/getUsers' , Users);
router.get('/me' , authi , getMe);
router.post('/logout'  , (req,res)=>{
     res.clearCookie('token',{ 
                     httpOnly:true, 
                     secure:true,
                     sameSite:"lax",
                  })

    return res.status(200).json({
        message:"User logged out"
    })
})


module.exports = router;


