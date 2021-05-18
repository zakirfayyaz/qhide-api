'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
    return await queryInterface.createTable('corporate_panel_department', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      corporate_panel_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      parent_id: {
        type: Sequelize.BIGINT(20),
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
    return await queryInterface.dropTable('corporate_panel_department');
  }
};
