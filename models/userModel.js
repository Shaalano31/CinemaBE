const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
//const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema( {

    username: {
        type: String,
        require: [true, "Please enter a username"],
        unique: [true, 'Username name must be unique'],
    },
    password: {
        type: String,
        require: [true, "Please enter a password"],
        // validate: [validator.isStrongPassword, 'Weak password'],
    },
    firstName: {
        type: String,
        require: [true, "Please enter a first name"],
    },
    lastName: {
        type: String,
        require: [true, "Please enter a last name"],
    },
    email:{
        type: String,
        require: true,
        unique: [true, 'Email name must be unique'],
        validate: [validator.isEmail, 'Invalid email address']
    },
    role: {
        type: String,
        require: [true, "Choose user or manager"],
        enum: ['user', 'manager']
    }
} );

// HASHING PASSOWRD
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// check if the password is correct
userSchema.methods.correctPassword = async function ( candidatePassword, userPassword) {
    return await bcrypt.compareSync(candidatePassword, userPassword);
  };

const User = mongoose.model("User", userSchema);
module.exports = User;