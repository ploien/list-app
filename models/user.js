const Sequelize = require('sequelize');
const sequelize = require('../util/mysqlDatabase');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = User;