// eslint-disable-next-line no-unused-vars
var dotenv = require('dotenv').load();
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./models');

// routes
var indexRoutes = require('./routes/index');
var mealsRoutes = require('./routes/meals');

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

app.use('/', indexRoutes);
app.use('/api/meals', mealsRoutes);

module.exports = app;
