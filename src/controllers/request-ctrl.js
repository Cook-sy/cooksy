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

exports.getChefRequests(1)
  .then(function(requests) {
    requests.forEach(function(inst) {
      console.log(inst.get({ plain: true }));
    });
  });