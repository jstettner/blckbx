var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var tokenauth = require('./routes/tokenauth');
var saveprogram = require('./routes/saveprogram');
var getprogram = require('./routes/getprogram');
var runprogram = require('./routes/runprogram');
var deleteprogram = require('./routes/deleteprogram');
var initializeprogram = require('./routes/initializeprogram');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

app.use('/api/signup', signup);
app.use('/api/login/*', login);
app.use('/api/tokenauth', tokenauth);
app.use('/api/saveprogram', saveprogram);
app.use('/api/getprogram', getprogram);
app.use('/api/deleteprogram', deleteprogram);
app.use('/api/runprogram', runprogram);
app.use('/api/initializeprogram', initializeprogram);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
