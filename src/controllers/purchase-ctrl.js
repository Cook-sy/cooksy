var db = require('../models');

var purchaseInclude = [
  {
    model: db.Meal,
    as: 'meal',
    include: [
      {
        model: db.Chef,
        as: 'chef',
        attributes: {
          exclude: ['password', 'address']
        }
      }
    ]
  }
];

exports.createPurchase = function(body, id) {
  body.userId = id;
  return db.Purchase.create(body)
    .then(function(purchase) {
      return db.Purchase.findById(purchase.id, {
        include: purchaseInclude
      });
    });
};

exports.getPurchases = function(id) {
  return db.Purchase.findAll({
    where: {
      userId: id
    },
    include: purchaseInclude
  });
};
