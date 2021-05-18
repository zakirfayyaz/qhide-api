'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('attribute_values', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      attribute_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      price: {
        type: Sequelize.BIGINT(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('attribute_values');
  }
};
