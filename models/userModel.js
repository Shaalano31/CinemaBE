const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {

    username: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    isManager: {
        type: Boolean,
        require: true
    }
    
} );

const User = mongoose.model("User", userSchema);
module.exports = User;