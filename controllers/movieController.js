const movieModel = require("../models/movieModel");

const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');


exports.addMovie = async(req, res) => {
    try {
      date = new Date(req.body.date)
      startTime = new Date(req.body.date)
      startTime.setHours(req.body.startTime.split(":")[0], 0, 0)
      endTime = new Date(req.body.date)
      endTime.setHours(req.body.endTime.split(":")[0], 0, 0)

      // Check if room and starttime is free
      const movieDetails = await movieModel.find({room: req.body.room})
      .select({
        startTime: 1,
      });
      
      for (const property in movieDetails) {
        if(movieDetails[property].startTime.toISOString() === startTime.toISOString()) {
          throw new AppError('Time slot has another movie already', 404);
        }
      }

      // Insert movie since time slot is free
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
        date: date,
        startTime: startTime,
        endTime: endTime,
        capacity: req.body.capacity,
        seats: req.body.seats,
        img: req.body.img
      });
      movie.save()
      .then((result) => {
        res.status(200).json({
          status: "success"
        })
      });
    }
    catch(err) {
        errorController.sendError(err, req, res);
    }
}


exports.getMovieDetails = async(req,res) => {
    try {
        const movieDetails = await movieModel.findById(req.params.id)
        .select({
          room: 1,
          capacity: 1,
          seats: 1
        });

        if (!movieDetails) {
            throw new AppError('No movie is found by that ID', 404);
        }
          res.status(200).json({
            status: 'success',
            data: JSON.parse(JSON.stringify(movieDetails)),
          });

    }
    catch (err) {
        errorController.sendError(err, req, res);
    }
};

exports.getAllMovies = async(req,res) => {
  try {
      const movieDetails = await movieModel.find({})
      .select({
        title: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
        room: 1,
        img: 1
      });
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
          endTime: req.body.endTime,
          img: req.body.img
        },
        {
          new: true,
          runValidators: true,
        }
      );
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    errorController.sendError(err, req, res);
  }
};