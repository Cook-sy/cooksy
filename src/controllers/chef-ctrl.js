var db = require('../models');

exports.findUser = function(userId) {
  return db.Chef.findById(userId);
};

exports.findChefByUsername = function(username) {
  return db.Chef.findOne({
    where: {
      username: username
    }
  });
};
