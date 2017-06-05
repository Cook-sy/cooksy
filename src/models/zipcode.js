'use strict';

module.exports = function(sequelize, DataTypes) {
  var Zipcode = sequelize.define('Zipcode', {
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Zipcode;
};
