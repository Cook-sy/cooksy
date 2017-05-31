var express = require('express');
var passport = require('passport');
var router = express.Router();

var validateUserLogin = function(payload) {
  var errors = {};
  var isFormValid = true;

  var username = payload.username;
  var password = payload.password;

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

  return {
    success: isFormValid,
    message: !isFormValid ? 'Check the form for errors' : '',
    errors: errors
  };
};

var validateUserSignup = function(payload) {
  var errors = {};
  var isFormValid = true;

  var username = payload.username;
  var password = payload.password;
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

// /api/users/login
// Login for users
router.post('/login', function(req, res, next) {
  var validation = validateUserLogin(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
      errors: validation.errors
    });
  }

  return passport.authenticate('local-login-user', function(err, token) {
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

// /api/users/signup
// Signup for users
router.post('/signup', function(req, res, next) {
  var validation = validateUserSignup(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.message,
      errors: validation.errors
    });
  }

  return passport.authenticate('local-signup-user', function(err, token) {
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
