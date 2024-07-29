const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const sessionConfig = require('./configs/session.config');
const routes = require('./routes');
const sessionUserId = require('./middlewares/session-user-id.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');

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
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
  })
);

app.use(sessionUserId);

routes(app);

app.use(errorHandler);

module.exports = app;
