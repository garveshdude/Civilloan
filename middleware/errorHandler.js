const winston = require('winston');

const logger = winston.createLogger({
  level: 'error', 
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'error.log' }), 
  ],
});


const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500; 
  const message = err.message || 'Internal Server Error';


  logger.error(`[${req.method}] ${req.url} - ${message}`);


  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
    },
  });
};

module.exports = errorHandler;
