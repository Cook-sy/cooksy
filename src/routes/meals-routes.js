var express = require('express');
var mealCtrl = require('../controllers/meal-ctrl');
var router = express.Router();

// GET /api/meals
// Get all non-expired meals
// GET /api/meals/?zip=ZIPCODE&radius=NUM
// Get all nearby meals around a zipcode that is within NUM meters
router.get('/', function(req, res) {
  if (req.query.zip && req.query.radius) {
    return mealCtrl.getMealsAround(req.query.zip, req.query.radius)
      .then(function(meals) {
        return res.json(meals);
      });
  }

  return mealCtrl.getNonExpiredMeals()
    .then(function(meals) {
      return res.json(meals);
    });
});

// GET /api/meals/:id
// Get a specific meal by id
router.get('/:id', function(req, res) {
  return mealCtrl.getMeal(req.params.id)
    .then(function(meal) {
      if (!meal) {
        return res.status(404).json({
          success: false,
          message: 'Meal not found'
        });
      }
      return res.json({
        success: true,
        message: 'Meal found',
        meal: meal
      });
    })
    .catch(function(error) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    });
});

module.exports = router;
