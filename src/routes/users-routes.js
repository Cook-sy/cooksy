var express = require('express');
var passport = require('passport');
var validateLogin = require('../utils/form-validation').validateLogin;
var validateUserSignup = require('../utils/form-validation').validateUserSignup;
var isUser = require('../middleware/is-authenticated').isUser;
var purchaseCtrl = require('../controllers/purchase-ctrl');
var userCtrl = require('../controllers/user-ctrl');
var mealReviewCtrl = require('../controllers/meal-review-ctrl');
var chefReviewCtrl = require('../controllers/chef-review-ctrl');
var userRequestCtrl = require('../controllers/user-request-ctrl');
var requestCtrl = require('../controllers/request-ctrl');
var mail = require('../utils/send-mail');
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

var checkRequestOwnership = function(requestId, userId, req, res, callback) {
  return userRequestCtrl.getRequest(requestId)
    .then(function(request) {
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Request not found'
        });
      }

      if (request.userId === userId) {
        return callback();
      }

      return res.status(403).json({
        success: false,
        message: 'The request is not owned by you'
      });
    });
};

var checkPurchaseOwnership = function(purchaseId, userId, req, res, callback) {
  return purchaseCtrl.getPurchase(purchaseId)
    .then(function(purchase) {
      if (!purchase) {
        return res.status(404).json({
          success: false,
          message: 'Purchase not found'
        });
      }

      if (purchase.userId === userId) {
        return callback();
      }

      return res.status(403).json({
        success: false,
        message: 'The purchase is not owned by you'
      });
    });
};

// GET /api/users
// Get a list of all users
// GET /api/users/?zip=ZIPCODE&radius=NUM
// Get all nearby users around a ZIPCODE that is within NUM meters
router.get('/', function(req, res) {
  if (req.query.zip && req.query.radius) {
    return userCtrl.getUsersAround(req.query.zip, req.query.radius)
      .then(function(users) {
        return res.json(users);
      });
  }

  return userCtrl.getUsers()
    .then(function(users) {
      return res.json(users);
    });
});

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

// GET /api/users/purchases
// Get all meals the user has purchased
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

// POST /api/users/purchases
// Allow user to purchase a meal
router.post('/purchases', isUser, function(req, res, next) {
  return purchaseCtrl.createPurchase(req.body, req.userId)
  .then(function(purchase) {
    mail.sendPurchase(purchase);
    return res.status(200).json(purchase);
  })
  .catch(function(err) {
    return res.status(500).json({
      success: false,
      message: 'Please try again later',
      error: err.message
    });
  });
});

// GET /api/users/purchases/:id
// Get a meal purchased by a specific user
router.get('/purchases/:id', isUser, function(req, res) {
  return checkPurchaseOwnership(req.params.id, req.userId, req, res, function() {
    return purchaseCtrl.getPurchase(req.params.id)
      .then(function(purchase) {
        return res.status(200).json({
          success: true,
          purchase: purchase
        });
      });
  });
});

// DELETE /api/users/purchases/:id
// Delete a purchase made by a user
router.delete('/purchases/:id', isUser, function(req, res) {
  return checkPurchaseOwnership(req.params.id, req.userId, req, res, function() {
    return purchaseCtrl.deletePurchase(req.params.id)
      .then(function(deletedPurchase) {
        return res.status(200).json({
          success: true,
          purchase: deletedPurchase
        });
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
    title: req.body.title,
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

// PUT /api/users/chefs/reviews/:reviewid
// Update a review for a specific chef
router.put('/chefs/reviews/:id', isUser, function(req, res) {
  return chefReviewCtrl.updateReview(req.params.id, req.body.rating)
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

// DELETE /api/users/chefs/reviews/:reviewid
// Delete a review for a specific chef
router.delete('/chefs/reviews/:id', isUser, function(req, res) {
  return chefReviewCtrl.deleteReview(req.params.id)
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

// DELETE /api/users/meals/reviews/:id
router.delete('/meals/reviews/:id', isUser, function(req, res) {
  return checkReviewOwnership(req.params.id, req.userId, req, res, function() {
    return mealReviewCtrl.deleteReview(req.params.id, req.body)
      .then(function(deletedReview) {
        return res.status(200).json({
          success: true,
          review: deletedReview
        });
      });
  });
});

// GET /api/users/:id/requests
// Get all requests from a user
router.get('/:id/requests', function(req, res) {
  return userRequestCtrl.getUserRequests(req.params.id)
    .then(function(requests) {
      return res.status(200).json(requests);
    });
});

// POST /api/users/requests
// Create a request for a specific meal
router.post('/requests', isUser, function(req, res) {
  // Check if a request exists for the meal
  return requestCtrl.getRequest(req.body.requestId)
    .then(function(request) {
      if (!request) {
        return request;
      }
      req.body.userId = req.userId;
      return userRequestCtrl.createRequest(req.body);
    })
    .then(function(request) {
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Meal requested not found'
        });
      }

      return res.status(201).json({
        success: true,
        request: request
      });
    });
});

// GET /api/users/requests/:id
// Get a specific request
router.get('/requests/:id', function(req, res) {
  return userRequestCtrl.getRequest(req.params.id)
    .then(function(request) {
      return res.status(200).json({
        success: true,
        request: request
      });
    });
});

// PUT /api/chefs/requests/:id
// Update a specific request
router.put('/requests/:id', isUser, function(req, res) {
  return checkRequestOwnership(req.params.id, req.userId, req, res, function() {
    return userRequestCtrl.updateRequest(req.params.id, req.body)
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
router.delete('/requests/:id', isUser, function(req, res) {
  return checkRequestOwnership(req.params.id, req.userId, req, res, function() {
    return userRequestCtrl.deleteRequest(req.params.id)
      .then(function(deletedRequest) {
        return res.status(200).json({
          success: true,
          request: deletedRequest
        });
      });
  });
});

module.exports = router;
