
var createError = require('http-errors');
var express = require('express');
let path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
let flash = require('express-flash');
var bodyParser = require('body-parser');
let DAO = require('./routes/model/User');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login/');
var register = require('./routes/Register/');
var coursework = require('./routes/Coursework/');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


app.use((req,res,next) =>
{
  console.log(req.session);
  console.log(res.user);
  next();

});


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


const initializePassport = require('./routes/model/passport-config');
initializePassport(passport);



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/register', register);
app.use('/coursework', coursework);



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



module.exports = app;
