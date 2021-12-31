const movieModel = require("../models/movieModel");

const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

exports.addMovie = async(req, res) => {
    try {

      if(req.body.room == 1)
      {
        req.body.capacity = 20;
        req.body.seats = new Array(20).fill(false);
      }
      else {
        req.body.capacity = 30;
        req.body.seats = new Array(30).fill(false);
      }
        var movie = new movieModel({
            title: req.body.title,
            room: req.body.room,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            capacity: req.body.capacity,
            seats: req.body.seats
        });
        movie.img.data = req.file.buffer;
        movie.img.contentType = "image/jpg";
        movie.save()
        .then((result) => {
          res.status(200).json({
            status:1
          })
        });
    }
    catch(err) {
        errorController.sendError(err, req, res);
    }
}


exports.getMovieDetails = async(req,res) => {
    try {
        const movieDetails = await movieModel.findById(req.params.id);

        if (!movieDetails) {
            throw new AppError('No movie is found by that ID', 404);
          }
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.status(200).json({
            status: 'success',
            data: JSON.parse(JSON.stringify(movieDetails)),
          });

    }
    catch (err) {
        errorController.sendError(err, req, res);
    }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieDetails = await movieModel.findByIdAndUpdate( req.params.id,
        {
          title: req.body.title,
          room: req.body.room,
          date: req.body.date,
          startTime: req.body.startTime,
          endTime: req.body.endTime
        },
        {
          new: true,
          runValidators: true,
        }
      );
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(movieDetails)),
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};

exports.viewSeats = async (req, res) => {

  try {

    const movieDetails = await movieModel.findById(req.params.id)
    .select({
      seats: 1
    });

    if (!movieDetails) {
      throw new AppError('No movie is found by that ID', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(movieDetails)),
    });


  } catch (err) {
    errorController.sendError(err, req, res);
  }

}