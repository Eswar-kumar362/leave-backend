const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HR = sequelize.define('HR', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'hrs',   // ✅ match your DB table name
  timestamps: true,
});

module.exports = HR;
