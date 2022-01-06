const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveSchema = new Schema( {

    userID: {
        type: String,
        require: true
    },
    movieID: {
        type: String,
        require: true
    },
    seats: {
        type: Array,
        require: true
    }

});
const Reserve = mongoose.model("Reserve", ReserveSchema);
module.exports = Reserve;