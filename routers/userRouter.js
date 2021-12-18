const express = require("express");
const userController = require('../controllers/userController.js');
const userRouter = express.Router();


userRouter.get('/s', userController.getUser);





module.exports = userRouter;