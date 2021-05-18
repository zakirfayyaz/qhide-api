'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Restaurant_Cart_Extras', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cart_item_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      extra_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Restaurant_Cart_Extras');
  }
};
