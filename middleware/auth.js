const jwt = require("jsonwebtoken");
const User = require("../model/user");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../config/errorHandler");


exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {

    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){

            token = req.headers.authorization.split(" ")[1]
        }
    if(!token){
        return next( new ErrorHandler('->(Access Denied)<- Login first to access this resource', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETE);
    console.log(decode)
     req.user = await User.findById(decode.id)

     next();
})


// Handling user roles
exports.isAuthorizeRole = (...roles) => {
    return (req,res, next) => {

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Sorry role -> (${req.user.role}) <- is not allowed to access this resource`, 403))
        }
        next();
    }
}