'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('tables', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      restaurant_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      person_count: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      ticket_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
      },
      status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        default: 1
      },
      family: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0,
      },
      employee_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
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
    return await queryInterface.dropTable('tables');
  }
};
