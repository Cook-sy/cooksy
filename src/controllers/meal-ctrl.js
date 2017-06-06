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

exports.updateMeal = function(id, newValues) {
  return db.Meal.update(newValues, {
    where: { id: id },
    returning: true,
    plain: true
  }).then(function(result) {
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
              db.sequelize.fn(
                'ST_Distance_Sphere',
                db.sequelize.fn('ST_MakePoint', parseFloat(zip.lat), parseFloat(zip.lng)),
                db.sequelize.col('point')
              ),
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
              db.sequelize.fn(
                'ST_Distance_Sphere',
                db.sequelize.fn('ST_MakePoint', parseFloat(zip.lat), parseFloat(zip.lng)),
                db.sequelize.col('point')
              ),
              '<=',
              parseFloat(radius)
            )
          )
        ),
        include: [
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
        ]
      });
    });
};
