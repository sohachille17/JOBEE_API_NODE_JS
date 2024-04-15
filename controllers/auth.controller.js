const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../config/errorHandler");
const sendToken = require("../config/jwtToken");


// Register new user /api/v1/register
exports.createUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password, role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    sendToken(user, 200, res)

    // const token = user.getJwtToken();

    // res.status(200).json({
    //     success: true,
    //     message: "User created successfully",
    //     token: token
    // });

})

// Login new user /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next)=>{

    const {email, password} = req.body;
    // check if there is an email && password existing
    if(!email || !password){
        return next( new ErrorHandler(`Please enter correct email and password to Login`), 400)
    }

    // Finding email and password
    const user = await User.findOne({email: email}).select("+password")

    // verification
    if(!user){
        return next( new ErrorHandler("Invalid Email or Password", 400))
    }

    // compare password

    const isPasswordMatch = await user.comparedPassword(password)

    // password verification
    
    if(!isPasswordMatch){
        return next( new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user, 200, res)

    // if everythings goes well EMAIL || PASSWORD
    /* Get token */
    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success: true,
    //     message: `User ${user.name} logged in successfully!`,
    //     token: token
    // })

})

// Ready to recover password 
exports.forgetPasswordRecovery = catchAsyncErrors(async (req, res, next) => {

    // check from the body if the email do exist in
    // our database.
    const user = await User.findOne({email: req.body.email })
    if(!user) {
        return next( new ErrorHandler(` Sorry, the user with the email ${req.body.email} was not found in our server`))
    }
    // get the resetToken then save the user

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

})