'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('restaurants', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      dine_in: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0,
      },
      take_away: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0,
      },
      two_persons: {
        type: Sequelize.BIGINT(20),
        default: null,
      },
      four_persons: {
        type: Sequelize.BIGINT(20),
        default: null,
      },
      total_table: {
        type: Sequelize.BIGINT(20),
        default: null,
      },
      allow: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0,
      },
      f_two_persons: {
        type: Sequelize.BIGINT(20),
        default: null,
      },
      f_four_persons: {
        type: Sequelize.BIGINT(20),
        default: null,
      },
      no_of_employee: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('restaurants');
  }
};
