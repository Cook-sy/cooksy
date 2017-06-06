var db = require('../models');
var radiusQuery = require('../utils/radius-query');

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

var mealInclude = [
  {
    model: db.Chef,
    as: 'chef',
    attributes: {
      exclude: ['address', 'password']
    }
  },
  {
    model: db.MealReview,
    as: 'mealReviews',
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  }
];

exports.updateMeal = function(id, newValues) {
  return db.Meal.update(newValues, {
    where: { id: id },
    returning: true,
    plain: true
  }).then(function(result) {
    return db.Meal.findById(id, {
      include: mealInclude
    });
  });
};

exports.getNonExpiredMeals = function() {
  return db.Meal.findAll({
    where: {
      deliveryDateTime: {
        $gt: new Date()
      }
    },
    include: mealInclude
  });
};

exports.getMeal = function(id) {
  return db.Meal.findById(id, {
    include: mealInclude
  });
};

exports.getChefsMeals = function(id) {
  return db.Meal.findAll({
    where: {
      chefId: id
    },
    include: mealInclude
  });
};

// Gets all meals near zipcode in a radius specified by meters
exports.getMealsAround = function(zipcode, radius) {
  return db.Zipcode.findById(zipcode)
    .then(function(zip) {
      if (!zip) {
        return [];
      }

      return db.Meal.findAll({
        attributes: {
          include: [
            [
              radiusQuery('Meal.point', zip.lat, zip.lng),
              'distance'
            ]
          ]
        },
        where: (
          db.sequelize.and(
            {
              deliveryDateTime: {
                $gt: new Date()
              }
            },
            db.sequelize.where(
              radiusQuery('Meal.point', zip.lat, zip.lng),
              '<=',
              parseFloat(radius)
            )
          )
        ),
        include: mealInclude
      });
    });
};
