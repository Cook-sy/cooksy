'use strict';

module.exports = function(sequelize, DataTypes) {
  var ChefReview = sequelize.define('ChefReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        ChefReview.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        });
        ChefReview.belongsTo(models.Chef, {
          foreignKey: 'chefId',
          as: 'chef'
        });
      }
    }
  });
  return ChefReview;
};
