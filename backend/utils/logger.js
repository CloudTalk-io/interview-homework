const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;
const config = require('../configs/logger.config');

const logger = winston.createLogger({
  level: config.level,
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf(
      (info) =>
        `${info.timestamp} [${info.level}] ${info.label ? `[${info.label}]` : ''}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

module.exports = function (label) {
  return logger.child({ label });
};
