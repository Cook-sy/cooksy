'use strict';

var faker = require('faker');
faker.seed(45814);

var chefReviews = [];

for (var i = 0; i < 9; i++) {
  chefReviews.push({
    id: i,
    // eslint-disable-next-line no-mixed-operators
    rating: faker.random.number() % 5 + 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    chefId: faker.random.number() % 3,
    userId: i % 5
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ChefReviews', chefReviews, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ChefReviews', null, {});
  }
};
