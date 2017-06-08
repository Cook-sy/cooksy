'use strict';

module.exports = function(sequelize, DataTypes) {
  var MealReview = sequelize.define('MealReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
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

  var updateRating = function(mealId) {
    return sequelize.models.Meal.findById(mealId)
      .then(function(meal) {
        return meal.updateRating();
      });
  };

  MealReview.afterCreate(function(review, options) {
    return updateRating(review.mealId);
  });

  MealReview.afterDestroy(function(review, options) {
    return updateRating(review.mealId);
  });

  MealReview.afterUpdate(function(review, options) {
    return updateRating(review.mealId);
  });

  return MealReview;
};
