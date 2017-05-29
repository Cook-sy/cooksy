var express = require('express');
var router = express.Router();
var db = require('../models');

// /api/meals
// Get all non-expired meals
router.get('/', function(req, res) {
  db.Meal
    .findAll({
      where: {
        deliveryDateTime: {
          $gt: new Date()
        }
      }
    })
    .then(function(meals) {
      res.json(meals);
    });
});

router.get('/:id', function(req, res) {
  db.Meal
    .findById(req.params.id)
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
