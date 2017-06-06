var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateChefSignup = require('../utils/form-validation').validateChefSignup;
var isChef = require('../middleware/is-authenticated').isChef;
var chefCtrl = require('../controllers/chef-ctrl');
var mealCtrl = require('../controllers/meal-ctrl');
var router = express.Router();

// Check if a meal is owned by a chef
var checkMealOwnership = function(mealId, chefId, req, res, callback) {
  return mealCtrl.getMeal(mealId)
    .then(function(meal) {
      if (!meal) {
        return res.status(404).json({
          success: false,
          message: 'Meal not found'
        });
      }

      if (meal.chefId === chefId) {
        return callback();
      }

      return res.status(403).json({
        success: false,
        message: 'The meal is not owned by you'
      });
    });
};

// GET /api/chefs
// Get a list of all chefs
// GET /api/chefs/?zip=ZIPCODE&=radius=NUM
// Get all nearby chefs around a ZIPCODE that is within NUM meters
router.get('/', function(req, res) {
  if (req.query.zip && req.query.radius) {
    return chefCtrl.getChefsAround(req.query.zip, req.query.radius)
      .then(function(chefs) {
        return res.json(chefs);
      });
  }

  return chefCtrl.getChefs()
    .then(function(chefs) {
      return res.json(chefs);
    });
});

// POST /api/chefs/login
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

// POST /api/chefs/signup
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

// POST /api/chefs/meals
// Create a new meal for a specific chef
router.post('/meals', isChef, function(req, res) {
  return mealCtrl.createMeal(req.userId, req.body)
    .then(function(meal) {
      return res.status(201).json({
        success: true,
        meal: meal
      });
    })
    .catch(function(err) {
      return res.status(500).json({
        success: false,
        message: 'Please try again later',
        error: err.message
      });
    });
});

// DELETE /api/chefs/meals/:id
// Delete a meal that is owned by a chef
router.delete('/meals/:id', isChef, function(req, res) {
  // Check if meal is owned by chef
  return checkMealOwnership(req.params.id, req.userId, req, res, function() {
    return mealCtrl.deleteMeal(req.params.id)
      .then(function(deletedMeal) {
        return res.status(200).json({
          success: true,
          meal: deletedMeal
        });
      });
  });
});

// PUT /api/chefs/meals/:id
// Update a meal that is owned by a chef
router.put('/meals/:id', isChef, function(req, res) {
  return checkMealOwnership(req.params.id, req.userId, req, res, function() {
    return mealCtrl.updateMeal(req.params.id, req.body)
      .then(function(updatedMeal) {
        return res.status(200).json({
          success: true,
          meal: updatedMeal
        });
      });
  });
});

// GET /api/chefs/meals
// Get all meals created by a specific chef
router.get('/meals', isChef, function(req, res) {
  return mealCtrl.getChefsMeals(req.userId)
    .then(function(meals) {
      return res.status(200).json(meals);
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
