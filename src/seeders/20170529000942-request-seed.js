'use strict';

var faker = require('faker');
faker.seed(70015);

var request = [];

for (var i = 0; i < 3; i++) {
  request.push({
    id: i,
    // eslint-disable-next-line no-mixed-operators
    numRequired: faker.random.number() % 6 + 10,
    numOrdered: faker.random.number() % 10,
    deadline: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    mealId: faker.random.number() % 9
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Requests', request, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
