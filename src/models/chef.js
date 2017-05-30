'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var Chef = sequelize.define(
    'Chef',
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
      image: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      reviewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Chef.hasMany(models.ChefReview, {
            foreignKey: 'chefId',
            as: 'chefReviews'
          });
          Chef.hasMany(models.Meal, {
            foreignKey: 'chefId',
            as: 'chefMeals'
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

  Chef.beforeCreate(function(chef, options) {
    return bcrypt
      .genSalt(10)
      .then(function(salt) {
        return bcrypt.hash(chef.password, salt);
      })
      .then(function(hashedPassword) {
        chef.password = hashedPassword;
      });
  });

  return Chef;
};
