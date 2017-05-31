var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateChefSignup = require('../utils/form-validation').validateChefSignup;
var router = express.Router();

// /api/chefs/login
// Login for chefs
router.post('/login', function(req, res, next) {
  var validation = validateLogin(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
      errors: validation.errors
    });
  }

  return passport.authenticate('local-login-chef', function(err, token) {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    return res.json({
      success: true,
      token: token
    });
  })(req, res, next);
});

// /api/chefs/signup
// Signup for chefs
router.post('/signup', function(req, res, next) {
  var validation = validateChefSignup(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
      errors: validation.errors
    });
  }

  return passport.authenticate('local-signup-chef', function(err, token) {
    if (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          success: false,
          message: 'There was an error processing the form',
          errors: {
            username: 'Username has already been taken'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'There was an error processing the form'
      });
    }

    return res.status(200).json({
      success: true,
      token: token
    });
  })(req, res, next);
});

module.exports = router;
