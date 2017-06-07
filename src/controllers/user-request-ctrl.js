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
