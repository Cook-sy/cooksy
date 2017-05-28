'use strict';

module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define('Purchase', {
    individualPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
          foreignKey: 'userId'
        });
        Purchase.belongsTo(models.Meal, {
          foreignKey: 'mealId'
        });
      }
    }
  });
  return Purchase;
};
