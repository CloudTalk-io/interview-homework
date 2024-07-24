const mongoose = require('mongoose');
const config = require('./configs/mongodb.config');
const logger = require('./utils/logger')('mongodb');

function connect() {
  mongoose.connection
    .on('error', (e) => logger.error(e))
    .once('connected', () => logger.info('DB is connected'));

  return mongoose.connect(config.uri);
}

function disconnect() {
  return mongoose.connection.destroy();
}

module.exports = { connect, disconnect };
