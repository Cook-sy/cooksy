var express = require('express');
var mealCtrl = require('../controllers/meal-ctrl');
var router = express.Router();

// GET /api/meals
// Get all non-expired meals
router.get('/', function(req, res) {
  return mealCtrl.getNonExpiredMeals()
    .then(function(meals) {
      return res.json(meals);
    });
});

// GET /api/meals/nearby/:zip
// Get all nearby meals around a zipcode that is within 16000 meters
router.get('/nearby/:zip', function(req, res) {
  return mealCtrl.getMealsAround(req.params.zip, 16000)
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
