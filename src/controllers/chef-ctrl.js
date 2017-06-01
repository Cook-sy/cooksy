var db = require('../models');

exports.createChef = function(body, username, password) {
  return db.Chef.create({
    username: username.trim(),
    password: password.trim(),
    image: body.image.trim(),
    address: body.address.trim(),
    city: body.city.trim(),
    state: body.state.trim(),
    zipcode: body.zipcode.trim()
  });
};

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
