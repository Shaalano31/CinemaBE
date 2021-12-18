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
    }
} );

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;