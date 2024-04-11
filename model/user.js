const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, "Please enter your name"],
        maxLength: 255,
        minLength: 8
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    role: {
        type: String,
        enum: {
            values: ["user", "employer"],
            message: "Please select one of the following roles for your account it is obligatory !"
        },
        required: [true, "Please select a role for your account"],
        default: "user"
    },
    password: {
        type: String,
        minLength: [8, "The minimun length for a valid password in our account is 8 please respect this order"],
        select: false,
        required: [true, "Please enter a valid password for your account!"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpiredDate: Date


})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}