const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveSchema = new Schema( {

    username: {
        type: String,
        require: true
    },
    MovieID: {
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