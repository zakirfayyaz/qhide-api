const Sequelize = require('sequelize');
var sequelize = require('../database/connection');

module.exports = sequelize.define('restaurant_take_away', {
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
        type: Sequelize.ENUM('waiting', 'working', 'ready', 'done'),
        allowNull: false,
        default: 'waiting'
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
    }
});

