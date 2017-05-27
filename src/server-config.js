var path = require('path');
var express = require('express');
var morgan = require('morgan');

var indexRoutes = require('./routes/index');

var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(morgan('dev'));
}

app.use('/', indexRoutes);

module.exports = app;
