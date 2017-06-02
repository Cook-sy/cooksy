var db = require('../models');

exports.buyMeal = function(id) {
  return db.Meal.findById(id);
};
