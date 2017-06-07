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
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        defaultValue: {
          type: 'POINT',
          coordinates: [37.7749, -122.4194]
        }
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
    return sequelize.models.Zipcode.findById(user.zipcode)
      .then(function(zip) {
        user.point = {
          type: 'POINT',
          coordinates: [zip.lat, zip.lng]
        };
      })
      .then(function() {
        return bcrypt.genSalt(10);
      })
      .then(function(salt) {
        return bcrypt.hash(user.password, salt);
      })
      .then(function(hashedPassword) {
        user.password = hashedPassword;
      });
  });

  return User;
};
