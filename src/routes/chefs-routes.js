var express = require('express');
var passport = require('passport');
var router = express.Router();

var validateChefSignup = function(payload) {
  var errors = {};
  var isFormValid = true;

  var username = payload.username;
  var password = payload.password;
  var address = payload.address;
  var city = payload.city;
  var state = payload.state;
  var zipcode = payload.zipcode;

  if (
    !payload ||
    typeof username !== 'string' ||
    username.trim().length === 0
  ) {
    isFormValid = false;
    errors.username = 'Please enter a username';
  }

  if (
    !payload ||
    typeof password !== 'string' ||
    password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please enter a password';
  }

  if (!payload || typeof address !== 'string' || address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please enter an address';
  }

  if (!payload || typeof city !== 'string' || city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please enter a city';
  }

  if (!payload || typeof state !== 'string' || state.trim().length === 0) {
    isFormValid = false;
    errors.state = 'Please enter a state';
  }

  if (!payload || typeof zipcode !== 'string' || zipcode.trim().length === 0) {
    isFormValid = false;
    errors.zipcode = 'Please enter a zipcode';
  }

  return {
    success: isFormValid,
    message: !isFormValid ? 'Check the form for errors' : '',
    errors: errors
  };
};

// /api/chefs/login
// Login for chefs
router.post('/login', function(req, res, next) {
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
