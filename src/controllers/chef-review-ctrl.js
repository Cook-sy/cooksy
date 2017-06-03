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
        }
      ]
    });
  });
};

exports.updateReview = function(ratingId, rating) {
  return db.ChefReview.update({ rating: rating }, {
    where: { id: ratingId }
  }).then(function(result) {
    return db.ChefReview.findById(ratingId, {
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    });
  });
};
