var express = require('express');

var indexRoutes = require('./src/routes/index');

var app = express();

app.use('/', indexRoutes);

module.exports = app;
