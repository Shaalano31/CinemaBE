const express = require("express");
const movieController = require('../controllers/movieController.js');
const movieRouter = express.Router();

var multer = require("multer");
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


movieRouter.get('/movie/:id', movieController.getMovieDetails);

movieRouter.post("/insertMovie", upload.single('img'), movieController.addMovie);




module.exports = movieRouter;