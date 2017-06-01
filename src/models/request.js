'use strict';

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    numRequired: {
      type: DataTypes.INTEGER,
      defaultValue: 20
    },
    numOrdered: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.Meal, {
          foreignKey: 'mealId',
          as: 'meal'
        });
        Request.hasMany(models.UserRequest, {
          foreignKey: 'requestId',
          as: 'userRequests'
        });
      }
    }
  });
  return Request;
};
