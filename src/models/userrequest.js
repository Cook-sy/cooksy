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
          foreignKey: 'userId'
        });
        UserRequest.belongsTo(models.Request, {
          foreignKey: 'requestId'
        });
      }
    }
  });
  return UserRequest;
};
