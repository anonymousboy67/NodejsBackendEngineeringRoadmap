const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);

    // Default error
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors).map(val => val.message).join(', ');
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Duplicate key error
    if (error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Cast error
    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

module.exports = errorHandler;

// ===================================
// src/middleware/notFound.js - 404 Handler
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`
    });
};

module.exports = notFound;