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

exports.createRequest = function(request) {
  return db.Request.create(request)
    .then(function(req) {
      return db.Request.findById(req.id, {
        include: requestInclude
      });
    });
};
