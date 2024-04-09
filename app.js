
const morgan = require("morgan");
const express = require("express");
const app = express();
const dotEnv = require('dotenv');
const connection = require("./config/database");
const errorMiddleware = require("./middleware/errors");
// setting up dotenv files
dotEnv.config({path: './config/config.env'});

connection();
const middleware = (req, res, next) => {
    req.user = "Hello Achille"

    next();
}
//build m iddleware
// app.use(middleware)


// importe our router
const jobRoutes = require("./routes/jobs.routes");
// build in middleware
app.use(morgan('tiny'));
app.use(express.json())


//using middleware
app.use('/api/v1/',jobRoutes);
//Error handler middleware
app.use(errorMiddleware)






const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port num ${PORT} in ${process.env.NODE_ENV}`)
});