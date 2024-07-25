const { randomBytes } = require('crypto');

function sessionUserId(req, res, next) {
  // this is demo solution not production-ready
  // in production better to have register/login functionality and store user in DB
  // set userId for each request which does not have it
  req.session.userId = req.session.userId || randomBytes(16).toString('hex');
  next();
}

module.exports = sessionUserId;
