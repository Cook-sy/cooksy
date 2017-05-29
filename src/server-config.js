// eslint-disable-next-line no-unused-vars
var dotenv = require('dotenv').load();
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var db = require('./models');

var indexRoutes = require('./routes/index');

var app = express();

db.sequelize.sync();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(morgan('dev'));
}

app.use('/', indexRoutes);

module.exports = app;
