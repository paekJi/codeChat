const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  userKey: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_key',
  },
  userId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'user_id',
  },
  userName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'user_name',
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'password',
  },
  profileImg: {
    type: DataTypes.STRING(300),
    allowNull: true,
    field: 'profile_img',
  },
  refreshToken: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'refresh_token',
  },
  tokenUpdate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'token_update',
  },
  createDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'create_date',
  }
}, {
  tableName: 'tb_user',
  timestamps: false,
  underscored: true
});


module.exports = User;
