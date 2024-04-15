
const morgan = require("morgan");
const express = require("express");
const app = express();
const dotEnv = require('dotenv');

const cookieParser = require('cookie-parser');
const connection = require("./config/database");
const errorMiddleware = require("./middleware/errors");
const ErrorHandler = require("./config/errorHandler");
// setting up dotenv files
dotEnv.config({path: './config/config.env'});

// Handling uncaught exception
process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log("Sutting down due to uncaughtException")
    process.exit(1);
})



connection();
const middleware = (req, res, next) => {
    req.user = "Hello Achille"

    next();
}
//build m iddleware
// app.use(middleware)


// importe our router
const jobRoutes = require("./routes/jobs.routes");
const userRoutes = require("./routes/auth.routes");
// build in middleware
app.use(morgan('tiny'));
app.use(express.json())

// set cookie-parser
app.use(cookieParser());


//using middleware
app.use('/api/v1/',jobRoutes);
app.use('/api/v1/', userRoutes);
// UnHandled routes 
app.all('*', (req, res, next) => {
    next( new ErrorHandler(` ${req.originalUrl} not found`, 404))
})

//Error handler middleware
app.use(errorMiddleware)






const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server running on port num ${PORT} in ${process.env.NODE_ENV}`)
});



// 0 - unhandle promise rejection
process.on("unhandleRejection", err => {
    console.log(err.message)
    console.log("Server shutting down due to handled promise rejection")
    server.close(() => {
        process.exit(1)
    })
})