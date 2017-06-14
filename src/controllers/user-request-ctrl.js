var db = require('../models');

var userRequestInclude = [
  {
    model: db.User,
    as: 'user',
    attributes: { exclude: ['password'] }
  },
  {
    model: db.Request,
    as: 'request',
    include: [
      {
        model: db.Meal,
        as: 'meal',
        include: [
          {
            model: db.Chef,
            as: 'chef',
            attributes: { exclude: ['password', 'address'] }
          }
        ]
      }
    ]
  }
];

exports.getRequest = function(id) {
  return db.UserRequest.findById(id, {
    include: userRequestInclude
  });
};

exports.getUserRequests = function(userId) {
  return db.UserRequest.findAll({
    where: { userId: userId },
    include: userRequestInclude
  });
};

exports.createRequest = function(request) {
  return db.UserRequest.create(request)
    .then(function(req) {
      return db.UserRequest.findById(req.id, {
        include: userRequestInclude
      });
    });
};

exports.updateRequest = function(id, newValues) {
  return db.UserRequest.update(newValues, {
    where: { id: id },
    returning: true
  }).then(function(result) {
    return db.UserRequest.findById(id, {
      include: userRequestInclude
    });
  });
};

exports.deleteRequest = function(id) {
  return db.UserRequest.findById(id, {
    include: userRequestInclude
  }).then(function(request) {
    if (request) {
      request.destroy();
    }
    return request;
  });
};
