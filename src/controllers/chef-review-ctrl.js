var db = require('../models');

exports.createReview = function(chefId, userId, rating) {
  return db.ChefReview.create({
    rating: rating,
    chefId: chefId,
    userId: userId
  }).then(function(review) {
    return db.ChefReview.findById(review.id, {
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: db.Chef,
          as: 'Chef',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    });
  });
};
