// eslint-disable-next-line no-unused-vars
var dotenv = require('dotenv').load();
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
// database
var db = require('./models');

// passport strategies
var localSignupUserStrategy = require('./passport/local-signup-user');
var localLoginUserStrategy = require('./passport/local-login-user');

// routes
var indexRoutes = require('./routes/index');
var mealsRoutes = require('./routes/meals');
var usersRoutes = require('./routes/usersRoutes');

var app = express();

db.sequelize.sync();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize passport strategies
app.use(passport.initialize());
passport.use('local-signup-user', localSignupUserStrategy);
passport.use('local-login-user', localLoginUserStrategy);

app.use('/', indexRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
