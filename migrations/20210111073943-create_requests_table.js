'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('requests', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      business_type_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      company_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      business_type_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      latitude: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      longitude: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
      },
      package_duration: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      package_start: {
        type: Sequelize.DATE,
      },
      package_end: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING(3000),
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
    return await queryInterface.dropTable('requests');
  }
};
