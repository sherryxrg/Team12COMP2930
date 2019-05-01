// Import .env variables if in development
if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

// Express default requires
var createError = require('http-errors');

// Express base
var express = require('express');

// path to reduce path strings
var path = require('path');

// cookieParser to parse... cookies..
var cookieParser = require('cookie-parser');

// Use morgan as logger
var logger = require('morgan');

// Index routes (static pages)
var indexRouter = require('./routes/index');

// User routes
var usersRouter = require('./routes/users');

// Initialize App
var app = express();

// Import mongoose models & connection
import models, { connectDb } from './models/';

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT;
// Connect to database then listen on port PORT
connectDb().then(() => {
  // Check ERASE_DB
  // wipe database on server start if true
  if (process.env.ERASE_DB == "true") {
    Promise.all([
      models.User.deleteMany({}),
    ]);
  }
  // Listen
  app.listen(PORT, () =>{
    console.log(`Server listening on port: ${PORT}`);
  });
});
