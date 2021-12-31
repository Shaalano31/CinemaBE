// INCLUDE DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// INCLUDE ERROR CLASS
const AppError = require('./utils/appError.js');

// INCLUDE ERROR CONTROLLER
const errorController = require('./controllers/errorController.js');

// INCLUDE ROUTES
const userRoutes = require("./routers/userRouter");
const movieRoutes = require("./routers/movieRouter");

// CREATE EXPRESS APP
const app = express();

// CONFIGURE CORS POLICY
const whitelist = ['*'];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      whitelist.indexOf(origin) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new AppError('Cross-Origin Request Blocked', 401));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,X-Forwarded-For,xsrf-token',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// ATTACH CORS
app.use(cors());

// ATTACH PARSERS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ATTACH ROUTES
app.use(userRoutes);
app.use(movieRoutes);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  errorController.sendError(
    new AppError(`Cannot find ${req.originalUrl} on the server`, 404),
    req,
    res,
    next
  );
});

// EXPORT APP
module.exports = app;