const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveSchema = new Schema( {
    username: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        require: true
    },
    // MovieTime: {
    //     type: Date,
    //     require: true
    // },
    MovieID: {
        type: String,
        require: true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Movie',
        // require: true
    // },
    // date: {
    //     type: Date,
    //     require: true
    // },
    },
    seats: {
        type: Array
    }

});
const Reserve = mongoose.model("Reserve", ReserveSchema);
module.exports = Reserve;