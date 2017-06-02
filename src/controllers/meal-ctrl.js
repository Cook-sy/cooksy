var db = require('../models');

exports.createMeal = function(chefId, body) {
  body.chefId = chefId;
  return db.Meal.create(body);
};

exports.deleteMeal = function(id) {
  return db.Meal.findById(id)
    .then(function(meal) {
      if (meal) {
        meal.destroy();
      }
      return meal;
    });
};

exports.getNonExpiredMeals = function() {
  return db.Meal.findAll({
    where: {
      deliveryDateTime: {
        $gt: new Date()
      }
    },
    include: [
      {
        model: db.Chef,
        as: 'chef',
        attributes: {
          exclude: ['address', 'password']
        }
      }
    ]
  });
};

exports.getMeal = function(id) {
  return db.Meal.findById(id, {
    include: [
      {
        model: db.Chef,
        as: 'chef',
        attributes: {
          exclude: ['address', 'password']
        }
      }
    ]
  });
};

exports.getChefsMeals = function(id) {
  return db.Meal.findAll({
    where: {
      chefId: id
    },
    include: [
      {
        model: db.Chef,
        as: 'chef',
        attributes: {
          exclude: ['address', 'password']
        }
      }
    ]
  });
};
