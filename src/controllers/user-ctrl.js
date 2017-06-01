var db = require('../models');

exports.createUser = function(body, username, password) {
  return db.User.create({
    username: username.trim(),
    password: password.trim(),
    zipcode: body.zipcode.trim()
  });
};

exports.findUser = function(userId) {
  return db.User.findById(userId);
};

exports.findUserByUsername = function(username) {
  return db.User.findOne({
    where: {
      username: username
    }
  });
};
