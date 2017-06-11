'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var Chef = sequelize.define(
    'Chef',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipcode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0
      },
      reviewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        defaultValue: {
          type: 'POINT',
          coordinates: [37.7749, -122.4194]
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Chef.hasMany(models.ChefReview, {
            foreignKey: 'chefId',
            as: 'chefReviews'
          });
          Chef.hasMany(models.Meal, {
            foreignKey: 'chefId',
            as: 'meals'
          });
        }
      },

      instanceMethods: {
        comparePassword: function(password) {
          return bcrypt.compare(password, this.password);
        },
        updateRating: function() {
          var self = this;
          return sequelize.models.ChefReview.find({
            where: {
              chefId: self.id
            },
            attributes: [
              [sequelize.fn('AVG', sequelize.col('rating')), 'rating'],
              [sequelize.fn('COUNT', sequelize.col('rating')), 'reviewCount']
            ],
            group: ['chefId']
          }).then(function(res) {
            if (res) {
              self.reviewCount = res.get('reviewCount');
              self.rating = res.get('rating');
            } else {
              self.reviewCount = 0;
              self.rating = 0;
            }
            return self.save();
          });
        }
      }
    }
  );

  Chef.beforeCreate(function(chef, options) {
    return bcrypt.genSalt(10)
      .then(function(salt) {
        return bcrypt.hash(chef.password, salt);
      })
      .then(function(hashedPassword) {
        chef.password = hashedPassword;
      });
  });

  Chef.beforeCreate(function(chef, options) {
    return sequelize.models.Zipcode.findById(chef.zipcode)
      .then(function(zip) {
        chef.point = {
          type: 'POINT',
          coordinates: [zip.lat, zip.lng]
        };
      });
  });

  Chef.beforeUpdate(function(chef, options) {
    if (chef.zipcode !== chef._previousDataValues.zipcode) {
      return sequelize.models.Zipcode.findById(chef.zipcode)
        .then(function(zip) {
          chef.point = {
            type: 'POINT',
            coordinates: [zip.lat, zip.lng]
          };
        });
    }
  });

  return Chef;
};
