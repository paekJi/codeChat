"use strict";

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('code_chat', 'admin', 'Mv5033cm12!', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 50, 
    min: 0,
    acquire: 30000, 
    idle: 10000 
  }
});

module.exports = sequelize;