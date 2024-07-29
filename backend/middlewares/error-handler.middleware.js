const { HttpError } = require('http-errors');

const logger = require('../utils/logger')('error-handler');

function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }

  logger.error(err.message);
  res.status(500).send('Internal Server Error');
}

module.exports = errorHandler;
