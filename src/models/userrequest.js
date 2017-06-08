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
    }
  });

  var updateNumOrdered = function(requestId) {
    return sequelize.models.Request.findById(requestId)
      .then(function(request) {
        return request.updateNumOrdered();
      });
  };

  UserRequest.afterCreate(function(userReq, options) {
    return updateNumOrdered(userReq.requestId);
  });

  UserRequest.afterDestroy(function(userReq, options) {
    return updateNumOrdered(userReq.requestId);
  });

  UserRequest.afterUpdate(function(userReq, options) {
    return updateNumOrdered(userReq.requestId);
  });

  return UserRequest;
};
