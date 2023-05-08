const path = require('path'); 
const express = require('express');

//Passing in the path declared in path.js which will provide the complete path to this folder
const router = express.Router();
const listController = require("../controllers/listController");

router.get('/list/:listId', listController.getList);

router.post('/addTask', listController.addTask);

router.post('/completeTask', listController.completeTask);

router.post('/incompleteTask', listController.incompleteTask);

router.post('/delete', listController.deleteTask);

module.exports = router;