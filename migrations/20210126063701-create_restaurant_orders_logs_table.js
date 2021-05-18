'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('restaurant_orders_logs',
      {
        id: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        restaurant_id: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
        },
        order_id: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
        },
        dish_id: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
        },
        quantity: {
          type: Sequelize.BIGINT(20),
          allowNull: false,
        },
        notes: {
          type: Sequelize.STRING(255),
          allowNull: true,
          default: null,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('restaurant_orders_logs');
  }
};
