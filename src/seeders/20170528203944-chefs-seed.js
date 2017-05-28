'use strict';

var faker = require('faker');
faker.seed(88457);

var chefs = [];

for (var i = 0; i < 3; i++) {
  chefs.push({
    id: i,
    username: faker.internet.userName(),
    password: faker.internet.password(),
    image: faker.image.avatar(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipcode: faker.address.zipCode(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Chefs', chefs, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Chefs', null, {});
  }
};
