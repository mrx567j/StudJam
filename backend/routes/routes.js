const express = require('express');
const router = express.Router();
const {SignUp ,LogIn} = require('../controller/Auth.js');

router.post('/SignUp',SignUp);
router.post('/LogIn' , LogIn)

module.exports = router;

