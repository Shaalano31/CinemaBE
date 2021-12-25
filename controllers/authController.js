const jwt = require('jsonwebtoken');
const {promisify} = require("util");

const userModel = require("../models/userModel");

const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');


const createSignToken = (user, statusCode, res) => {

    const token = jwt.sign({ id: user.id }, "secret", {  expiresIn: "1hr"});
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: JSON.parse(JSON.stringify(user._id)),
          firstName: JSON.parse(JSON.stringify(user.firstName)),
          lastName: JSON.parse(JSON.stringify(user.lastName)),
          username: JSON.parse(JSON.stringify(user.username)),
          role: JSON.parse(JSON.stringify(user.role))
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

  exports.protect = async(req,res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.substring( 7,req.headers.authorization.length);
    }

    if (!token) {
      throw new AppError( 'You are not logged in. Please log in to get access.', 401);
    }

    const decoded = await promisify(jwt.verify)(token, "secret");

    const user = await userModel.findById(decoded.id);
    if(!user) {
      return next (
        new AppError("User token no longer exists", 401)
      );
    }
    
    req.user = user;
    next();
  }


  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if(!roles.includes(req.user.role)) {
        console.log(req.user.role);
        return next(new AppError("No permission to perform this action", 403))
      }
      next();
    };
  };