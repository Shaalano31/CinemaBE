// INCLUDE DEPENDENCIES
const jwt = require('jsonwebtoken');

// INCLUDE MODELS
const userModel = require("../models/userModel");

const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');


const createSignToken = (user, statusCode, res) => {

    const token = jwt.sign({id: user._id}, 'secret', {expiresIn: "1h"});
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: JSON.parse(JSON.stringify(user._id)),
          firstName: JSON.parse(JSON.stringify(user.firstName)),
          lastName: JSON.parse(JSON.stringify(user.lastName)),
          username: JSON.parse(JSON.stringify(user.username)),
          isManager: JSON.parse(JSON.stringify(user.isManager))
        },
      },
    });
  };

exports.signUp = async(req,res) => {
    
    try {
        const newUser = await userModel.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            isManager: req.body.isManager
        });

        createSignToken(newUser, 201, res);
    }
    catch(err) {
        errorController.sendError(err, req, res);
    }

  };

  exports.signIn = async(req,res) => {
      try {
        const {email, password} = req.body;

        if(!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        const user = await userModel
        .findOne({email});

        if(!user) {
            throw new AppError('Invalid Email', 401);
        }
        
        const correct = await user.correctPassword(password, user.password);
        if (!correct) {
            throw new AppError('Invalid Password', 401);
        }

        createSignToken(user, 200, res);

      }
      catch(err) {
        errorController.sendError(err, req, res);
      }
  }