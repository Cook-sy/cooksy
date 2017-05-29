'use strict';

var bcrypt = require('bcryptjs');

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
      },

      instanceMethods: {
        comparePassword: function(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    }
  );

  User.beforeCreate(function(user, options) {
    return bcrypt
      .genSalt(10)
      .then(function(salt) {
        return bcrypt.hash(user.password, salt);
      })
      .then(function(hashedPassword) {
        user.password = hashedPassword;
      });
  });

  return User;
};
