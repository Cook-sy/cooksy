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
          foreignKey: 'userId'
        });
        MealReview.belongsTo(models.Meal, {
          foreignKey: 'mealId'
        });
      }
    }
  });
  return MealReview;
};
