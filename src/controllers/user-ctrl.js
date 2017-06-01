var db = require('../models');

exports.findUser = function(userId) {
  return db.User.findById(userId);
};
