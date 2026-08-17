const express = require('express');
const router = express.Router();
const {SignUp ,LogIn} = require('../controller/Auth.js');
const {mid} = require('../middleware/mid.js')
const {message} = require('../controller/Message.js');
const {Users} =require("../controller/getUse.js");

router.post('/SignUp',SignUp);
router.post('/LogIn' , LogIn);

router.get('/PubChat' , mid,);
router.post('/getMessages' , message)
router.get('/getUsers' , Users);


module.exports = router;


