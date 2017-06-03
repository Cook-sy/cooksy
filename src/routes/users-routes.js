var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateUserSignup = require('../utils/form-validation').validateUserSignup;
var purchaseCtrl = require('../controllers/purchase-ctrl');
var isUser = require('../middleware/is-authenticated').isUser;
var mealReviewCtrl = require('../controllers/meal-review-ctrl');
var chefReviewCtrl = require('../controllers/chef-review-ctrl');
var router = express.Router();

// Check if a review is owned by a user
var checkReviewOwnership = function(reviewId, userId, req, res, callback) {
  return mealReviewCtrl.getReview(reviewId)
    .then(function(review) {
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }

      if (review.userId === userId) {
        return callback();
      }

      return res.status(403).json({
        success: false,
        message: 'The review is not owned by you'
      });
    });
};

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

// /api/users/purchases
// Allow user to purchase a meal
router.get('/purchases', isUser, function(req, res, next) {
  return purchaseCtrl.getPurchases(req.userId)
    .then(function(meals) {
      return res.json(meals);
    })
    .catch(function(err) {
      return res.status(500).json({
        success: false,
        message: 'Please try again later',
        error: err.message
      });
    });
});

// GET /api/users/:id/meals/reviews
// Get all meal reviews by a specific user
router.get('/:id/meals/reviews', function(req, res) {
  return mealReviewCtrl.getUserReviews(req.params.id)
    .then(function(reviews) {
      return res.json(reviews);
    });
});

// POST /api/users/meals/reviews
// Create a review for a specific meal
router.post('/meals/reviews', isUser, function(req, res) {
  var payload = {
    rating: req.body.rating,
    review: req.body.review
  };

  return mealReviewCtrl.createReview(req.body.mealId, req.userId, payload)
    .then(function(review) {
      return res.status(201).json({
        success: true,
        review: review
      });
    })
    .catch(function(err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// POST /api/users/chefs/reviews
// Create a review for a specific chef
router.post('/chefs/reviews', isUser, function(req, res) {
  return chefReviewCtrl.createReview(req.body.chefId, req.userId, req.body.rating)
    .then(function(review) {
      return res.status(201).json({
        success: true,
        review: review
      });
    })
    .catch(function(err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// PUT /api/users/meals/reviews/:id
// Update a meal review
router.put('/meals/reviews/:id', isUser, function(req, res) {
  return checkReviewOwnership(req.params.id, req.userId, req, res, function() {
    return mealReviewCtrl.updateReview(req.params.id, req.body)
      .then(function(updatedReview) {
        return res.status(200).json({
          success: true,
          review: updatedReview
        });
      });
  });
});

module.exports = router;
