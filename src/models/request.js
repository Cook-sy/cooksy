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
    },

    instanceMethods: {
      updateNumOrdered: function() {
        var self = this;
        return sequelize.models.UserRequest.find({
          where: {
            requestId: self.id
          },
          attributes: [
            [
              sequelize.fn('SUM', sequelize.col('num')),
              'numOrdered'
            ]
          ],
          group: ['requestId']
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
  return Request;
};
