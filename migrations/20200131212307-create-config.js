'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      milkTime: {
        type: Sequelize.STRING
      },
      cowPrice: {
        type: Sequelize.STRING
      },
      tax: {
        type: Sequelize.INTEGER
      },
      tax2: {
        type: Sequelize.INTEGER
      },
      tax3: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Configs');
  }
};