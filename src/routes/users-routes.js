var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateUserSignup = require('../utils/form-validation').validateUserSignup;
var purchaseCtrl = require('../controllers/purchase-ctrl');
var isUser = require('../middleware/is-authenticated').isUser;
var router = express.Router();

// /api/users/login
// Login for users
router.post('/login', function(req, res, next) {
  var validation = validateLogin(req.body);
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
          message: 'Username has already been taken'
        });
      }

      return res.status(400).json({
        success: false,
        message: 'There was an error processing the form'
      });
    }

    return res.status(201).json({
      success: true,
      token: token
    });
  })(req, res, next);
});

// /api/users/purchases
// Get all meals the user has purchased
router.post('/purchases', isUser, function(req, res, next) {
  return purchaseCtrl.createPurchase(req.body, req.userId)
    .then(function(meal) {
      return res.status(200).json(meal);
    })
    .catch(function(err) {
      return res.status(500).json({
        success: false,
        message: 'Please try again later',
        error: err.message
      });
    });
});

module.exports = router;
