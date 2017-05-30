var jwt = require('jsonwebtoken');
var db = require('../models');

exports.isChef = function(req, res, next) {
  if (!req.header('x-access-token')) {
    return res.status(401).send({
      success: false,
      message: 'Please login or sign up'
    });
  }

  var token = req.header('x-access-token').split(' ')[1];

  return jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: 'Please login or sign up'
      });
    }

    var userId = decodedToken.sub;
    var role = decodedToken.role;

    if (role !== 'chef') {
      return res.status(403).send({
        success: false,
        message: 'You are forbidden'
      });
    }

    return db.Chef
      .findById(userId)
      .then(function(user) {
        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'Please sign up'
          });
        }

        return next();
      })
      .catch(function() {
        return res.status(500).send({
          success: false,
          message: 'Please try again later'
        });
      });
  });
};

exports.isUser = function(req, res, next) {
  if (!req.header('x-access-token')) {
    return res.status(401).send({
      success: false,
      message: 'Please login or sign up'
    });
  }

  var token = req.header('x-access-token').split(' ')[1];

  return jwt.verify(token, process.env.JWT_SECRET, function(err, decodedToken) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: 'Please login or sign up'
      });
    }

    var userId = decodedToken.sub;
    var role = decodedToken.role;

    if (role !== 'user') {
      return res.status(403).send({
        success: false,
        message: 'You are forbidden'
      });
    }

    return db.User
      .findById(userId)
      .then(function(user) {
        if (!user) {
          return res.status(401).send({
            success: false,
            message: 'Please sign up'
          });
        }

        return next();
      })
      .catch(function() {
        return res.status(500).send({
          success: false,
          message: 'Please try again later'
        });
      });
  });
};
