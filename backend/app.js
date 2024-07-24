const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { randomBytes } = require('crypto');

const sessionConfig = require('./configs/session.config');
const routes = require('./routes');

const app = express();

app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    name: 'session',
    secret: sessionConfig.key,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      path: '/',
    },
  })
);
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(function (req, res, next) {
  // this is demo solution not production-ready
  // in production better to have register/login functionality and store user in DB
  // set userId for each request which does not have it
  req.session.userId = req.session.userId || randomBytes(16).toString('hex');
  next();
});

routes(app);

module.exports = app;
