'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('corporate_orders', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.BIGINT(255),
        allowNull: false
      },
      department_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      employee_id: {
        type: Sequelize.BIGINT(255),
        allowNull: false
      },
      ticket_no: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        default: null,
      },
      remarks: {
        type: Sequelize.STRING(255),
        default: null,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('in-queue', 'waiting', 'working', 'served', 'done'),
        allowNull: false,
        default: 'in-queue'
      },
      in_queue: {
        type: Sequelize.DATE,
        allowNull: true
      },
      in_waiting: {
        type: Sequelize.DATE,
        allowNull: true
      },
      in_working: {
        type: Sequelize.DATE,
        allowNull: true
      },
      done_queue: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('corporate_orders');
  }
};
