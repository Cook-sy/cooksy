var express = require('express');
var morgan = require('morgan');

var indexRoutes = require('./src/routes/index');

var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}

app.use('/', indexRoutes);

module.exports = app;
