const Sequelize = require('sequelize');
var sequelize = require('../database/connection');

module.exports = sequelize.define('employee', {
    id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    panel_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    corporate_panel_department_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        default: null,
    },
    speciality: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null
    },
    education: {
        type: Sequelize.STRING(255),
        allowNull: true,
        default: null
    },
    max_allowed: {
        type: Sequelize.BIGINT(100),
        default: 0,
    }
});