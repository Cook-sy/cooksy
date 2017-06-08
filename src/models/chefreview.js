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

  var updateRating = function(chefId) {
    return sequelize.models.Chef.findById(chefId)
      .then(function(chef) {
        return chef.updateRating();
      });
  };

  ChefReview.afterCreate(function(review, options) {
    return updateRating(review.chefId);
  });

  ChefReview.afterDestroy(function(review, options) {
    return updateRating(review.chefId);
  });

  ChefReview.afterUpdate(function(review, options) {
    return updateRating(review.chefId);
  });

  return ChefReview;
};
