'use strict';

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
      type: DataTypes.DECIMAL,
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
        coordinates: [39.807222, -76.984722]
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
          as: 'mealPurchases'
        });
        Meal.hasMany(models.Request, {
          foreignKey: 'mealId',
          as: 'mealRequests'
        });
      }
    }
  });
  return Meal;
};
