var jwt = require('jsonwebtoken');
var db = require('../models');

function isAuthenticated(model, role) {
  return function(req, res, next) {
    if (!req.header('x-access-token')) {
      return res.status(401).send({
        success: false,
        message: 'Please login or sign up'
      });
    }

    var token = req.header('x-access-token').split(' ')[1];

    return jwt.verify(token, process.env.JWT_SECRET, function(
      err,
      decodedToken
    ) {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Please login or sign up'
        });
      }

      var userId = decodedToken.sub;
      var userRole = decodedToken.role;

      if (userRole !== role) {
        return res.status(403).send({
          success: false,
          message: 'You are forbidden'
        });
      }

      return model
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
}

exports.isChef = isAuthenticated(db.Chef, 'chef');

exports.isUser = isAuthenticated(db.User, 'user');
