const express = require("express");
const movieController = require('../controllers/movieController.js');
const authController = require('../controllers/authController.js');
const movieRouter = express.Router();

var multer = require("multer");
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


movieRouter
    .route("/movie/:id")
    .get (
    movieController.getMovieDetails
    )
    .patch (
    upload.single('img'), 
    authController.protect, 
    authController.restrictTo('manager'),
    movieController.updateMovie
    )

movieRouter
    .route("/insertMovie")
    .post(
    upload.single('img'), 
    authController.protect, 
    authController.restrictTo('manager'),
    movieController.addMovie
    );


movieRouter
    .route("/movie/seats/:id")
    .get(
        movieController.viewSeats
    )


module.exports = movieRouter;