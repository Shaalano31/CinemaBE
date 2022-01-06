const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema( {

    title: {
        type: String,
        require: [true, "Must enter a title"],
    },
    date: {
        type: Date,
        require: [true, "Must specifiy a date"],
    },
    room: {
        type: Number,
        require: [true, "Must specifiy a room"],
    },
    img: { 
        type: String, 
        require: [true, "Please upload a poster"],
    },
    startTime: {
        type: Date,
        require: [true, "Must specifiy a start time"],
    },
    endTime: {
        type: Date,
        require: [true, "Must specifiy an end time"],
    },
    capacity: {
        type: Number
    },
    seats: {
        type: Array
    }
} );

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;