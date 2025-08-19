const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  department: { type: DataTypes.STRING, allowNull: false },
  joiningDate: { type: DataTypes.DATEONLY, allowNull: false },
  leaveBalance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 20 }
}, { tableName: 'Employees' });

module.exports = Employee;