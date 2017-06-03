var db = require('../models');

exports.createPurchase = function(body, id) {
  body.userId = id;
  return db.Purchase.create(body);
};

exports.getPurchases = function(id) {

};
