'use strict';

module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define('Purchase', {
    individualPrice: {
      type: DataTypes.DECIMAL
    },
    num: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        Purchase.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        Purchase.belongsTo(models.Meal, {
          foreignKey: 'mealId',
          as: 'meal'
        });
      }
    }
  });

  var updateNumOrdered = function(mealId) {
    return sequelize.models.Meal.findById(mealId)
      .then(function(meal) {
        return meal.updateNumOrdered();
      });
  };

  Purchase.beforeCreate(function(purchase, options) {
    return sequelize.models.Meal.findById(purchase.mealId)
      .then(function(meal) {
        purchase.individualPrice = meal.price;
      });
  });

  Purchase.afterCreate(function(purchase, options) {
    return updateNumOrdered(purchase.mealId);
  });

  Purchase.afterDestroy(function(purchase, options) {
    return updateNumOrdered(purchase.mealId);
  });

  Purchase.afterUpdate(function(purchase, options) {
    return updateNumOrdered(purchase.mealId);
  });

  return Purchase;
};
