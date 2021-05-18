'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('restaurant_dine_in',
      {
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
          type: Sequelize.BIGINT(255),
          allowNull: false
        },
        ticket_no: {
          type: Sequelize.STRING(20),
          allowNull: false
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
        dine_in: {
          type: Sequelize.DATE,
          allowNull: true
        },
        order_taken: {
          type: Sequelize.DATE,
          allowNull: true
        },
        order_served: {
          type: Sequelize.DATE,
          allowNull: true
        },
        done_queue: {
          type: Sequelize.DATE,
          allowNull: true
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
      });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('restaurant_dine_in');
  }
};
