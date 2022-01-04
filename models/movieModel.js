const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema( {

    title: {
        type: String,
        require: true
    },
    // date: {
    //     type: Date,
    //     require: true
    // },
    room: {
        type: Number,
        require: true
    },
    img: { 
        data: Buffer, 
        contentType: String,
    },
    // startTime: {
    //     type: Date,
    //     require: true
    // },
    // endTime: {
    //     type: Date,
    //     require: true
    // },
    capacity: {
        type: Number
    },
    seats: {
        type: Array
    }
} );

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;