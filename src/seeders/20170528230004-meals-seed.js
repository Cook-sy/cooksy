'use strict';

var faker = require('faker');
faker.seed(45656);

var meals = [];
var id = 0;

for (var i = 0; i < 3; i++) {
  for (var chefId = 0; chefId < 3; chefId++) {
    meals.push({
      id: id,
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      deliveryDateTime: faker.date.future(),
      pickupInfo: faker.lorem.sentence(),
      price: +faker.commerce.price(),
      servings: faker.random.number(),
      images: faker.image.food(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipcode: faker.address.zipCode(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      chefId: chefId
    });
    id++;
  }
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Meals', meals, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
