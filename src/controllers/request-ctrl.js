var db = require('../models');

var requestInclude = [
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
];

exports.getRequest = function(id) {
  return db.Request.findById(id, {
    include: requestInclude
  });
};

exports.getChefRequests = function(chefId) {
  return db.Request.findAll({
    include: [
      {
        model: db.Meal,
        as: 'meal',
        include: [
          {
            model: db.Chef,
            as: 'chef',
            attributes: { exclude: ['password', 'address'] },
            where: { id: chefId }
          }
        ]
      }
    ]
  });
};

exports.createRequest = function(request) {
  return db.Request.create(request)
    .then(function(req) {
      return db.Request.findById(req.id, {
        include: requestInclude
      });
    });
};

exports.updateRequest = function(id, newValues) {
  return db.Request.update(newValues, {
    where: { id: id },
    returning: true
  }).then(function(result) {
    return db.Request.findById(id, {
      include: requestInclude
    });
  });
};
