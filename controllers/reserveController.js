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
      userID: req.body.userID,
      movieID: req.params.id,
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

      const movie = await movieModel.findById(reservation.movieID)
      .select({
        startTime: 1,
        seats: 1
      });
      let date_obj = new Date();

      timeRemaining = (movie.startTime - date_obj) / 36e5

      if(timeRemaining < 3) {
        // res.status(401).json({
        //   status: 'failed',
        //   data: 'Cannot cancel because movie is in less than 3 hours',
        // });
        throw new AppError("Cannot cancel because movie is in less than 3 hours", 401);
      }

      for(let i=0;i<reservation.seats.length;i++){       
        movie.seats[reservation.seats[i]] = false;
      }
      
      const update=await movieModel.findByIdAndUpdate(reservation.movieID,
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
      userID: req.params.id
    });
    if(!reservation) {
      throw new AppError('You have no reservations made', 404);
    }

    data = {}
    var key = 'reservations'
    data[key] = []

    for(let i=0;i<reservation.length;i++){       

      const movie = await movieModel.findById(reservation[i].movieID)
      .select({
        startTime: 1,
        title: 1
      });
      // console.log(movie)
      // console.log(movie.startTime.getFullYear())
      // console.log(movie.startTime.getMonth())
      // console.log(movie.startTime.getDate())
      var details = {
        _id: reservation[i]._id,
        seats: reservation[i].seats,
        title: movie.title,
      }
      data[key].push(details)
    }


    res.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(data)),
  });

  }
  catch(err){
    errorController.sendError(err, req, res);
  }
}