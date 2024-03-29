var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var historyRouter = require('./routes/history');
var errandRouter = require('./routes/errandList');
var usersRouter = require('./routes/login');
var busiRouter = require('./routes/business');
var proRouter = require('./routes/product')
var comRouter = require('./routes/comment')
var cors = require("cors");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//设置跨域请求
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//管理静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use('/history', historyRouter);
app.use('/errand', errandRouter);
app.use('/login', usersRouter);
app.use('/business', busiRouter);
app.use('/product', proRouter);
app.use('/comment', comRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
