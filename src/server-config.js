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
var localSignupChefStrategy = require('./passport/local-signup-chef');
var localLoginChefStrategy = require('./passport/local-login-chef');

// routes
var indexRoutes = require('./routes/index');
var mealsRoutes = require('./routes/meals-routes');
var usersRoutes = require('./routes/users-routes');
var chefsRoutes = require('./routes/chefs-routes');

var app = express();

db.sequelize.sync();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, '../client/build')));
} else if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize passport strategies
app.use(passport.initialize());
passport.use('local-signup-user', localSignupUserStrategy);
passport.use('local-login-user', localLoginUserStrategy);
passport.use('local-signup-chef', localSignupChefStrategy);
passport.use('local-login-chef', localLoginChefStrategy);

app.use('/', indexRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/chefs', chefsRoutes);

// db.Request.findById(1, {
//   attributes: {
//     include: [
//       [
//         db.sequelize.literal(
// '(SELECT SUM("UserRequests"."num") FROM "UserRequests" WHERE "UserRequests"."requestId" = 1)'),
//         'numOrdered'
//       ]
//     ]
//   }
// }).then(function(res) {
//   console.log(res.get({ plain: true }));
// });

// db.Request.findById(5)
//   .then(function(req) {
//     return req.getNumOrdered();
//   })
//   .then(function(res) {
//     console.log(res.get({ plain: true }));
//   });

// db.Request.findById(1, {
//   attributes: {
//     include: [
//       [
//         db.sequelize.fn('SUM', db.sequelize.col('num')), 'num'
//       ]
//     ]
//   },
//   include: [{
//     model: db.UserRequest,
//     as: 'userRequests',
//     attributes: []
//   }],
//   group: ['Request.id']
// }).then(function(res) {
//   console.log(res.get({ plain: true }));
// });

module.exports = app;
