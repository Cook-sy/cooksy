var db = require('../models');

exports.createPurchase = function(body) {
  return db.Purchase.create(body);
};
