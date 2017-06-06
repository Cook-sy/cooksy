var db = require('../models');

exports.createUser = function(body, username, password) {
  return db.User.create({
    username: username.trim(),
    password: password.trim(),
    zipcode: body.zipcode.trim()
  });
};

exports.findUser = function(userId) {
  return db.User.findById(userId);
};

exports.findUserByUsername = function(username) {
  return db.User.findOne({
    where: {
      username: username
    }
  });
};

var userInclude = [
  {
    model: db.ChefReview,
    as: 'chefReviews',
    include: [
      {
        model: db.Chef,
        as: 'chef',
        attributes: { exclude: ['password', 'address'] }
      }
    ]
  },
  {
    model: db.MealReview,
    as: 'mealReviews',
    include: [
      {
        model: db.Meal,
        as: 'meal',
        include: [
          {
            model: db.Chef,
            as: 'chef',
            attributes: { exclude: ['password'] }
          }
        ]
      }
    ]
  }
];

exports.getUsers = function() {
  return db.User.findAll({
    attributes: { exclude: ['password'] },
    include: userInclude
  });
};

// Gets all users near zipcode in a radius specified by meters
exports.getUsersAround = function(zipcode, radius) {
  return db.Zipcode.findById(zipcode)
    .then(function(zip) {
      if (!zip) {
        return [];
      }

      return db.User.findAll({
        attributes: {
          include: [
            [
              db.sequelize.fn(
                'ST_Distance_Sphere',
                db.sequelize.fn('ST_MakePoint', parseFloat(zip.lat), parseFloat(zip.lng)),
                db.sequelize.col('User.point')
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
              db.sequelize.col('User.point')
            ),
            '<=',
            parseFloat(radius)
          )
        ),
        include: userInclude
      });
    });
};
