// Dependencies
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override'); // for deletes in express

var debug = require('debug')('sburger');

// Our model controllers 
var application_controller = require('./controllers/application_controller');

// Express settings
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({ secret: 'app', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 } }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routs to controller
app.use('/', application_controller);

// we bring in the models we exported with index.js
 var models = require("./models");

// we set the port of the app
app.set('port', process.env.PORT || 3000);

// we sync the models with our db 
// (thus creating the apropos tables)
models.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
    app.listen(app.get('port'), function() {
    // then save a log of the listening to our debugger.
    debug('Express server listening on port ' + this.address().port);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});