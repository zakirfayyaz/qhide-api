'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('services', {
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
      department_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      corporate_panel_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null
      },
      max_allowed: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        default: 1
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        default: 0
      },
      employee_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
      },
      ticket_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null
      },
      service_charges: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('services');
  }
};
