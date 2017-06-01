var db = require('../models');

exports.createMeal = function(chefId, body) {
  body.chefId = chefId;
  return db.Meal.create(body);
};
