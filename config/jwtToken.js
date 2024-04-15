// Create token and save in cookie
const sendToken = (user, statusCode, res) => {

    // Create JWT TOKEN
    const token = user.getJwtToken()
    // OPTIONS

    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRING_TIME * 24*60*60*1000),
        httpOnly: true
    }

    // if(process.env.NODE_ENV === 'production'){
    //     options.secure = true;
    // }

    res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
        success: true,
        token: token
    })
}

module.exports = sendToken;
