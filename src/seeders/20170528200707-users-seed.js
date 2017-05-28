'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'bono',
          password: 'hunter2',
          zipcode: '12345',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'jono',
          password: 'hunter2',
          zipcode: '00123',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'rono',
          password: 'hunter2',
          zipcode: '54213',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'vono',
          password: 'hunter2',
          zipcode: '66120',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'oono',
          password: 'hunter2',
          zipcode: '99912',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
