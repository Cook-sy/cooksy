var db = require('../models');
var radiusQuery = require('../utils/radius-query');

exports.createChef = function(body, username, password) {
  return db.Chef.create({
    username: username.trim(),
    password: password.trim(),
    email: body.email.trim(),
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

var chefInclude = [
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
];

exports.getChefs = function() {
  return db.Chef.findAll({
    attributes: { exclude: ['password'] },
    include: chefInclude
  });
};

// Gets all chefs near zipcode in a radius specified by meters
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
              radiusQuery('Chef.point', zip.lat, zip.lng),
              'distance'
            ]
          ],
          exclude: ['password']
        },
        where: (
          db.sequelize.where(
            radiusQuery('Chef.point', zip.lat, zip.lng),
            '<=',
            parseFloat(radius)
          )
        ),
        include: chefInclude
      });
    });
};
