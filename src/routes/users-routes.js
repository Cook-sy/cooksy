var express = require('express');
var passport = require('passport');
var router = express.Router();

// /api/users/login
// Login for users
router.post('/login', function(req, res, next) {
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
  return passport.authenticate('local-signup-user', function(err, token) {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    return res.status(200).json({
      success: true,
      token: token
    });
  })(req, res, next);
});

module.exports = router;
