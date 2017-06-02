var db = require('../models');

exports.buyMeal = function(mealId) {
  db.findOne({
    where: {
      mealId: mealId
    }
  });
};
