'use strict';

var faker = require('faker');
faker.seed(44581);

var mealReviews = [];

for (var i = 0; i < 11; i++) {
  mealReviews.push({
    id: i,
    // eslint-disable-next-line no-mixed-operators
    rating: faker.random.number() % 5 + 1,
    review: faker.lorem.paragraphs(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    mealId: faker.random.number() % 9,
    userId: i % 5
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MealReviews', mealReviews, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MealReviews', null, {});
  }
};
