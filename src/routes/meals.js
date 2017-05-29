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

module.exports = router;
