const movieModel = require("../models/movieModel");

exports.addMovie = async(req, res) => {
    try {
        var movie = new movieModel({
            title: req.body.title,
            room: req.body.room,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime
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
      
          res.status(200).json({
            status: 'success',
            data: JSON.parse(JSON.stringify(movieDetails)),
          });

    }
    catch (err) {
        errorController.sendError(err, req, res);
    }
};