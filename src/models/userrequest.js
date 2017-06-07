'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserRequest = sequelize.define('UserRequest', {
    num: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    classMethods: {
      associate: function(models) {
        UserRequest.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        UserRequest.belongsTo(models.Request, {
          foreignKey: 'requestId',
          as: 'request'
        });
      }
    },

    hooks: {
      beforeSave: function(request) {
        console.log('user request before save hook being called');
      }
    }
  });

  // UserRequest.beforeSave(function(request) {
  //   console.log('user request before save hook being called');
  // });

  return UserRequest;
};
