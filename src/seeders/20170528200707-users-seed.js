'use strict';

var faker = require('faker');
faker.seed(38448);

var users = [];

for (var i = 0; i < 5; i++) {
  users.push({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    zipcode: faker.address.zipCode(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  });
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
