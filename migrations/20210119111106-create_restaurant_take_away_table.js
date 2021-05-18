'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable('restaurant_take_away', {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      restaurant_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ticket_no: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: 'no'
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('restaurant_take_away');
  }
};
