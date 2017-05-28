'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      deliveryDateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pickupInfo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      images: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      numOrdered: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalOrdered: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      chefId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chefs',
          key: 'id',
          as: 'chefId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Meals');
  }
};
