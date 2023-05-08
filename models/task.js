const Sequelize = require('sequelize');
const sequelize = require('../util/mysqlDatabase');

const Task = sequelize.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    taskBody: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    creationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    completionDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    complete: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Task;