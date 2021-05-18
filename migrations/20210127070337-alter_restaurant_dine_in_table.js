'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [queryInterface.addColumn('restaurant_dine_in', 'persons', {
      type: Sequelize.DATE,
      after: "createdAt"
    }), queryInterface.addColumn('restaurant_dine_in', 'has_family', {
      type: Sequelize.DATE,
      after: "createdAt"
    })];
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('restaurant_dine_in');
  }
};
