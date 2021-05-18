'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('users', {
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
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
        }
      },
      email_verified_at: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        },
      },
      device_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        },
        device_id: {
          type: Sequelize.STRING(255),
        }
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        }
      },
      cell: {
        type: Sequelize.STRING(20),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        }
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        }
      },
      remember_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null,
        validate: {
          notEmpty: false
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
        default: null,
        validate: {
          notEmpty: true
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('users');
  }
};
