const { crossOriginResourcePolicy } = require("helmet");
const movieModel = require("../models/movieModel.js");
const reserveModel = require("../models/reserveModel.js");
const AppError = require('../utils/appError.js');
const errorController = require('./errorController.js');

exports.confirmReserevation= async (req, res) => {

try{

    const movie = await movieModel.findById(req.params.id)
    .select({seats: 1});

    for(let i=0;i<req.body.seats.length;i++){
      if(movie.seats[req.body.seats[i]] == true)
      {
        throw new AppError("Seat " + req.body.seats[i] + " already reserved", 404);
      }
      
      movie.seats[req.body.seats[i]] = true;
    }
    
    const update=await movieModel.findByIdAndUpdate(req.params.id,
      {
        $set:{seats:movie.seats},
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const Reservation =await reserveModel.create({
      username: req.body.username,
      MovieID: req.params.id,
      seats: req.body.seats
    });

    res.status(200).json({
      status: 'success',
      data: 'Reservation sucessful',
    });

    } catch (err) {
    errorController.sendError(err, req, res);
    }
}

exports.cancelReserevation= async (req, res) =>{
    try{

      const reservation=await reserveModel.findById(req.params.id);

      const movie = await movieModel.findById(reservation.MovieID)
      .select({
        startTime: 1,
        seats: 1
      });

      let date_obj = new Date();

      timeRemaining = (movie.startTime - date_obj) / 36e5

      if(timeRemaining < 3) {
        throw new AppError("Cannot cancel because movie is in less than 3 hours", 404);
      }

      for(let i=0;i<reservation.seats.length;i++){       
        movie.seats[reservation.seats[i]] = false;
      }
      
      const update=await movieModel.findByIdAndUpdate(reservation.MovieID,
        {
          $set:{seats:movie.seats},
        },
        {
          new: true,
          runValidators: true,
        }
      );

        const Cancelation=await reserveModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: 'success',
          data: 'Cancellation sucessful',
        });

    }
    catch(err){
      errorController.sendError(err, req, res);
    }
}

exports.getAllReservation = async (req, res) => {
  try{
    const reservation=await reserveModel.find({

    });


  }
  catch(err){
    errorController.sendError(err, req, res);
  }
}