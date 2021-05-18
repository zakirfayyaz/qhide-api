'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
    return queryInterface.addColumn('restaurant_dine_in_orders', 'createdAt', {
      type: Sequelize.DATE,
      after: "table_id"
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('restaurant_dine_in_orders');
     */
    return queryInterface.removeColumn('restaurant_dine_in_orders', 'createAt');
  }
};
