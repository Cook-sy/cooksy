'use strict';

var faker = require('faker');
faker.seed(33650);

var userRequests = [];

for (var i = 0; i < 3; i++) {
  userRequests.push({
    id: i,
    // eslint-disable-next-line no-mixed-operators
    num: faker.random.number() % 3 + 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    requestId: faker.random.number() % 3,
    userId: i % 5
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserRequests', userRequests, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserRequests', null, {});
  }
};
