const path = require('path'); 
const express = require('express');

const router = express.Router();
const loginController = require("../controllers/loginController");

router.post('/login', loginController.postLogin);
router.get('/login', loginController.getLogin);

router.post('/logout', loginController.postLogout);


module.exports = router;