var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var errorHandler = require('errorhandler');
//var api = require('./apis');

var app = express();
 db.Users.sync();
 db.Commons.sync();
 db.Config.sync();
 db.Cows.sync();
 db.TieredTaxing.sync();
 db.UserWealth.sync();

//testing api section

//api.admin.users.create_user("Matt","Gottlieb","mattgottlieb96@gmail.com", 1);
//api.admin.users.create_user("Joe","Schmoe","JS@gmail.com", 0);
//api.admin.users.create_user("Test","Person","TP@gmail.com", 0);
//api.admin.commons.create_commons("Chem123 Spring");



// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.use( express.static( "public" ) );
app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(errorHandler());
module.exports = app;
