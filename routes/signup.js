const path = require('path'); 
const express = require('express');

const router = express.Router();
const signupController = require("../controllers/signupController");

router.post('/signup', signupController.postSignup);
router.get('/signup', signupController.getSignup);


module.exports = router;