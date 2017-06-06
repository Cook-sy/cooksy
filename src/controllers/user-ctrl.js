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

exports.getUsers = function() {
  return db.User.findAll({
    attributes: { exclude: ['password'] },
    include: [
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
    ]
  });
};
