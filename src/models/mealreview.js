'use strict';

module.exports = function(sequelize, DataTypes) {
  var MealReview = sequelize.define('MealReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        MealReview.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        MealReview.belongsTo(models.Meal, {
          foreignKey: 'mealId',
          as: 'meal'
        });
      }
    }
  });

  MealReview.afterCreate(function(review, options) {
    return sequelize.models.Meal.findById(review.mealId)
      .then(function(meal) {
        return meal.increment('reviewCount');
      })
      .then(function(meal) {
        var rating = (meal.rating * (meal.reviewCount - 1)) + review.rating;
        meal.rating = rating / meal.reviewCount;
        return meal.save();
      });
  });

  MealReview.beforeDestroy(function(review, options) {
    return sequelize.models.Meal.findById(review.mealId)
      .then(function(meal) {
        return meal.decrement('reviewCount');
      })
      .then(function(meal) {
        var rating = (meal.rating * (meal.reviewCount + 1)) - review.rating;
        meal.rating = rating / meal.reviewCount;
        return meal.save();
      });
  });

  MealReview.afterUpdate(function(review, options) {
    var delta = review.rating - review._previousDataValues.rating;

    return sequelize.models.Meal.findById(review.mealId)
      .then(function(meal) {
        var rating = (meal.rating * meal.reviewCount) + delta;
        meal.rating = rating / meal.reviewCount;
        return meal.save();
      });
  });

  return MealReview;
};
