var db = require('../models');

module.exports = function(col, lat, lng) {
  return db.sequelize.fn(
    'ST_Distance_Sphere',
    db.sequelize.fn('ST_MakePoint', parseFloat(lat), parseFloat(lng)),
    db.sequelize.col(col)
  );
};
