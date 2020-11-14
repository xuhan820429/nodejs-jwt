const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'dao/node-auth.db'
});
module.exports = sequelize