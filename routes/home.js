const path = require('path'); 
const express = require('express');

const router = express.Router();
const homeController = require("../controllers/homeController");

router.get('/', homeController.getHome);
router.post('/list', homeController.postCreateList);
router.post('/deleteList', homeController.postDeleteList);

module.exports = router;