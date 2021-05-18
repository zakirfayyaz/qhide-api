'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('employees', 'education', {
      type: Sequelize.STRING(255),
      allowNull: true,
      default: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('employees', 'education');
  }
};
