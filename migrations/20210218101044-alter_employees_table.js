'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'corporate_panel_department_id', {
      type: Sequelize.BIGINT(20),
      allowNull: true,
      default: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'corporate_panel_department_id');
  }
};
