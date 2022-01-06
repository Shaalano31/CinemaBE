const express = require("express");
const authController = require('../controllers/authController.js');
const userRouter = express.Router();


userRouter.post('/sign-up', authController.signUp);
userRouter.post('/sign-in', authController.logIn);




module.exports = userRouter;