const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack.red);

    // mongoose bad ObjectID
    if(error.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message  || 'Server error'
    });
}

module.exports = errorHandler;