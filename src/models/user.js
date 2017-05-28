'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.ChefReview, {
            foreignKey: 'userId',
            as: 'chefReviews'
          });
          User.hasMany(models.MealReview, {
            foreignKey: 'userId',
            as: 'mealReviews'
          });
          User.hasMany(models.Purchase, {
            foreignKey: 'userId',
            as: 'purchases'
          });
          User.hasMany(models.UserRequest, {
            foreignKey: 'userId',
            as: 'userRequests'
          });
        }
      }
    }
  );
  return User;
};
