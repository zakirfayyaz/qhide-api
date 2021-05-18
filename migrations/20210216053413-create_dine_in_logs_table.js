'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('restaurant_dine_in_orders_logs', {
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
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('restaurant_dine_in_orders_logs');
  }
};
