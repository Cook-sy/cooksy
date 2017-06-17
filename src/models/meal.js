'use strict';

var geocodeAddress = require('../utils/geocode-address');

module.exports = function(sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    deliveryDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickupInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: DataTypes.TEXT,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numOrdered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalOrdered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    point: {
      type: DataTypes.GEOMETRY('POINT'),
      defaultValue: {
        type: 'POINT',
        coordinates: [37.7749, -122.4194]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Meal.belongsTo(models.Chef, {
          foreignKey: 'chefId',
          as: 'chef'
        });
        Meal.hasMany(models.MealReview, {
          foreignKey: 'mealId',
          as: 'mealReviews'
        });
        Meal.hasMany(models.Purchase, {
          foreignKey: 'mealId',
          as: 'purchases'
        });
        Meal.hasMany(models.Request, {
          foreignKey: 'mealId',
          as: 'requests'
        });
      }
    },

    instanceMethods: {
      updateRating: function() {
        var self = this;
        return sequelize.models.MealReview.find({
          where: {
            mealId: self.id
          },
          attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'rating'],
            [sequelize.fn('COUNT', sequelize.col('rating')), 'reviewCount']
          ],
          group: ['mealId']
        }).then(function(res) {
          if (res) {
            self.reviewCount = res.get('reviewCount');
            self.rating = res.get('rating');
          } else {
            self.reviewCount = 0;
            self.rating = 0;
          }
          return self.save();
        });
      },

      updateNumOrdered: function() {
        var self = this;
        return sequelize.models.Purchase.find({
          where: {
            mealId: self.id
          },
          attributes: [
            [sequelize.fn('SUM', sequelize.col('num')), 'numOrdered']
          ],
          group: ['mealId']
        }).then(function(res) {
          if (res) {
            self.numOrdered = res.get('numOrdered');
          } else {
            self.numOrdered = 0;
          }
          return self.save();
        });
      }
    }
  });

  Meal.beforeCreate(function(meal, options, cb) {
    geocodeAddress(meal, options, cb);
  });

  Meal.beforeUpdate(function(meal, options, cb) {
    if (
      meal.address !== meal._previousDataValues.address ||
      meal.city !== meal._previousDataValues.city ||
      meal.state !== meal._previousDataValues.state ||
      meal.zipcode !== meal._previousDataValues.zipcode
    ) {
      geocodeAddress(meal, options, cb);
    }
  });

  return Meal;
};
