const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema( {

    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    room: {
        type: Number,
        require: true
    },
    img: { 
        data: Buffer, 
        contentType: String,
    },
    startTime: {
        type: Date,
        require: true
    },
    endTime: {
        type: Date,
        require: true
    }
} );

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

// var mongoose = require("mongoose");

// var Schema = mongoose.Schema;

// var ImageSchema = new Schema(
//     {
//         name: {type: String, required: true, max: 100},
//         img: {data: Buffer, contentType: String},
//         age: {type: Number}
//     }
// );

// module.exports = mongoose.model("Image", ImageSchema);