var db = require('../models');

exports.createChef = function(body, username, password) {
  return db.Chef.create({
    username: username.trim(),
    password: password.trim(),
    image: body.image.trim(),
    address: body.address.trim(),
    city: body.city.trim(),
    state: body.state.trim(),
    zipcode: body.zipcode.trim()
  });
};

exports.findChef = function(userId) {
  return db.Chef.findById(userId);
};

exports.findChefByUsername = function(username) {
  return db.Chef.findOne({
    where: {
      username: username
    }
  });
};

exports.getChefs = function() {
  return db.Chef.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: db.ChefReview,
        as: 'chefReviews',
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: { exclude: ['password'] }
          }
        ]
      },
      {
        model: db.Meal,
        as: 'meals',
        include: [
          {
            model: db.MealReview,
            as: 'mealReviews',
            include: [
              {
                model: db.User,
                as: 'user',
                attributes: { exclude: ['password'] }
              }
            ]
          }
        ]
      }
    ]
  });
};

// Gets all meals near zipcode in a radius specified by meters
exports.getChefsAround = function(zipcode, radius) {
  return db.Zipcode.findById(zipcode)
    .then(function(zip) {
      if (!zip) {
        return [];
      }

      return db.Chef.findAll({
        attributes: {
          include: [
            [
              db.sequelize.fn(
                'ST_Distance_Sphere',
                db.sequelize.fn('ST_MakePoint', parseFloat(zip.lat), parseFloat(zip.lng)),
                db.sequelize.col('Chef.point')
              ),
              'distance'
            ]
          ],
          exclude: ['password']
        },
        where: (
          db.sequelize.where(
            db.sequelize.fn(
              'ST_Distance_Sphere',
              db.sequelize.fn('ST_MakePoint', parseFloat(zip.lat), parseFloat(zip.lng)),
              db.sequelize.col('Chef.point')
            ),
            '<=',
            parseFloat(radius)
          )
        ),
        include: [
          {
            model: db.ChefReview,
            as: 'chefReviews',
            include: [
              {
                model: db.User,
                as: 'user',
                attributes: { exclude: ['password'] }
              }
            ]
          },
          {
            model: db.Meal,
            as: 'meals',
            include: [
              {
                model: db.MealReview,
                as: 'mealReviews',
                include: [
                  {
                    model: db.User,
                    as: 'user',
                    attributes: { exclude: ['password'] }
                  }
                ]
              }
            ]
          }
        ]
      });
    });
};
