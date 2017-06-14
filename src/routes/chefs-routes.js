var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateChefSignup = require('../utils/form-validation').validateChefSignup;
var isChef = require('../middleware/is-authenticated').isChef;
var chefCtrl = require('../controllers/chef-ctrl');
var mealCtrl = require('../controllers/meal-ctrl');
var requestCtrl = require('../controllers/request-ctrl');
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

var checkRequestOwnership = function(requestId, chefId, req, res, callback) {
  return requestCtrl.getRequest(requestId)
    .then(function(request) {
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Request not found'
        });
      }

      if (request.meal.chefId === chefId) {
        return callback();
      }

      return res.status(403).json({
        success: false,
        message: 'The request is not owned by you'
      });
    });
};

// GET /api/chefs
// Get a list of all chefs
// GET /api/chefs/?zip=ZIPCODE&radius=NUM
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

// GET /api/chefs/:id
// Get a specific chef
router.get('/:id', function(req, res) {
  return chefCtrl.getChef(req.params.id)
    .then(function(chef) {
      return res.json(chef);
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

// GET /api/chefs/meals/:id
// Get a meal that is owned by a chef. Includes purchase information.
router.get('/meals/:id', isChef, function(req, res) {
  return checkMealOwnership(req.params.id, req.userId, req, res, function() {
    return mealCtrl.getChefsMeal(req.params.id)
      .then(function(meal) {
        return res.status(200).json({
          success: true,
          meal: meal
        });
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

// GET /api/chefs/:id/meals
// Get all meals created by a specific chef
router.get('/:id/meals', function(req, res) {
  return mealCtrl.getChefsMeals(req.params.id)
    .then(function(meals) {
      return res.status(200).json(meals);
    });
});

// GET /api/chefs/:id/requests
// Get all requests created by a specific chef
router.get('/:id/requests', function(req, res) {
  return requestCtrl.getChefRequests(req.params.id)
    .then(function(requests) {
      return res.status(200).json(requests);
    });
});

// POST /api/chefs/requests
// Create a request for a specific chef
router.post('/requests', isChef, function(req, res) {
  return checkMealOwnership(req.body.mealId, req.userId, req, res, function() {
    return requestCtrl.createRequest(req.body)
      .then(function(request) {
        return res.status(201).json({
          success: true,
          request: request
        });
      });
  });
});

// GET /api/chefs/requests/:id
// Get a specific request
router.get('/requests/:id', function(req, res) {
  return requestCtrl.getRequest(req.params.id)
    .then(function(request) {
      return res.status(200).json({
        success: true,
        request: request
      });
    });
});

// PUT /api/chefs/requests/:id
// Update a specific request
router.put('/requests/:id', isChef, function(req, res) {
  return checkRequestOwnership(req.params.id, req.userId, req, res, function() {
    return requestCtrl.updateRequest(req.params.id, req.body)
      .then(function(updatedRequest) {
        return res.status(200).json({
          success: true,
          request: updatedRequest
        });
      });
  });
});

// DELETE /api/chefs/requests/:id
// Delete a specific request
router.delete('/requests/:id', isChef, function(req, res) {
  return checkRequestOwnership(req.params.id, req.userId, req, res, function() {
    return requestCtrl.deleteRequest(req.params.id)
      .then(function(deletedRequest) {
        return res.status(200).json({
          success: true,
          request: deletedRequest
        });
      });
  });
});

module.exports = router;
