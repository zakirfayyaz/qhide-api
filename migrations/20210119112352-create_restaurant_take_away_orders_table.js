'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('restaurant_take_away_orders', {
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
      user_id: {
        type: Sequelize.STRING(255),
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('restaurant_take_away_orders');
     */
    return await queryInterface.dropTable('restaurant_take_away_orders');
  }
};
