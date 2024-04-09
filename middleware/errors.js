
module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
   


    // Server running in development mode
    if(process.env.NODE_ENV === 'development'){

        res.status(err.statusCode).json({
            success: false,
            err: err,
            message: err.message,
            stack: err.stack
        })

       

    }
   
    if(process.env.NODE_ENV === 'production'){
        
        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })

        

    }





}