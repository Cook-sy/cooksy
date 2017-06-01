var db = require('../models');

exports.getNonExpiredMeals = function() {
  return db.Meal.findAll({
    where: {
      deliveryDateTime: {
        $gt: new Date()
      }
    }
  });
};

exports.getMeal = function(id) {
  return db.Meal.findById(id);
};
