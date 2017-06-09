var db = require('../models');
var radiusQuery = require('../utils/radius-query');

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

exports.createMeal = function(chefId, body) {
  body.chefId = chefId;
  return db.Meal.create(body)
    .then(function(meal) {
      return db.Meal.findById(meal.id, {
        include: mealInclude
      });
    });
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

exports.getChefsMeal = function(id) {
  return db.Meal.findById(id, {
    include: mealInclude.concat({
      model: db.Purchase,
      as: 'purchases',
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    })
  });
};

exports.getChefsMeal(6)
  .then(function(res) {
    console.log(res.toJSON());
  });

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
