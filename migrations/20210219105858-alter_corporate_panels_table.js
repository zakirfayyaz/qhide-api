'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('corporate_panels', 'image', {
      type: Sequelize.STRING(255),
      allowNull: true,
      default: null
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('corporate_panels', 'image');
  }
};
