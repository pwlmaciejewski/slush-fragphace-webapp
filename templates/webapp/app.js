'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var winston = require('clients/winston');
var expressWinston = require('express-winston');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.set('json spaces', 2);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (config.logger.requests) {
  app.use(expressWinston.logger({
    winstonInstance: winston,
    meta: false,
    expressFormat: true
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new RedisStore(config.redisStore),
  secret: config.server.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(require('routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  var errors;

  if (err.name === 'ValidationError') {
    errors = Object.keys(err.errors).map((prop) => {
      let error = err.errors[prop];
      return {
        param: prop,
        message: error.name === 'CastError' ? 'Invalid value' : error.message
      };
    });
  } else if (err.param) {
    errors = [err];
  } else if (err.length && err[0].param) {
    errors = err;
  }

  if (errors) {
    res.status(400).json({
      errors: errors
    });
    return;
  }

  next(err);
});

if (config.logger.requests) {
  app.use(expressWinston.errorLogger({
    winstonInstance: winston,
    baseMeta: false
  }));
}


module.exports = app;
