'use strict';

module.exports = function(sequelize, DataTypes) {
  var Zipcode = sequelize.define('Zipcode', {
    zip: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Zipcode;
};
