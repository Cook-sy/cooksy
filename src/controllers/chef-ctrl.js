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
