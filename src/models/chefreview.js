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

  ChefReview.afterCreate(function(review, options) {
    return sequelize.models.Chef.findById(review.chefId)
      .then(function(chef) {
        return chef.increment('reviewCount');
      });
  });

  ChefReview.afterDestroy(function(review, options) {
    return sequelize.models.Chef.findById(review.chefId)
      .then(function(chef) {
        return chef.decrement('reviewCount');
      });
  });

  return ChefReview;
};
