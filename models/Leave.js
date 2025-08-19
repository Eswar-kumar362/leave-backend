const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./Employee');

const Leave = sequelize.define('Leave', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  reason: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Pending','Approved','Rejected'), defaultValue: 'Pending' }
}, { tableName: 'Leaves' });

Employee.hasMany(Leave, { foreignKey: 'employeeId' });
Leave.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = Leave;