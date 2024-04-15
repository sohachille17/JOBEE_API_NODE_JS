const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
    resetPasswordExpired: Date


})


// Encrypting password before saving
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10)
})
// Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        { 
            id: this._id,
            name: this.name,
            role: this.role
        }
        , process.env.JWT_SECRETE, {

            expiresIn: process.env.JWT_EXPIRES_TIME

        })
        
}

// compared password
userSchema.methods.comparedPassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password)

}

// Generate expires token
userSchema.methods.getResetPasswordToken = function(){

    // generating resetToken from crypto module
    const resetToken = crypto.randomBytes(10).toString("hex");

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256")
            .update(resetToken)
            .digest("hex")

    // set expiring time
    this.resetPasswordExpired = Date.now() + 30*60*1000;
    return resetToken;

}

module.exports = mongoose.model("User", userSchema);