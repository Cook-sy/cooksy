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

exports.deleteReview = function(ratingId) {
  return db.ChefReview.findById(ratingId)
    .then(function(rating) {
      if (rating) {
        rating.destroy();
      }
      return rating;
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
