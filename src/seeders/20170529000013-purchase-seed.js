'use strict';

var faker = require('faker');
faker.seed(23109);

var purchases = [];

for (var i = 0; i < 11; i++) {
  purchases.push({
    id: i,
    // eslint-disable-next-line no-mixed-operators
    individualPrice: +faker.commerce.price(),
    num: faker.random.number() % 5,
    status: faker.random.number() % 3,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    mealId: faker.random.number() % 9,
    userId: i % 5
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Purchases', purchases, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Purchases', null, {});
  }
};
