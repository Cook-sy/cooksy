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
          foreignKey: 'userId'
        });
        ChefReview.belongsTo(models.Chef, {
          foreignKey: 'chefId'
        });
      }
    }
  });
  return ChefReview;
};
