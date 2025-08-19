const { Op } = require('sequelize');
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

function daysBetween(start, end) {
  const ms = (new Date(end) - new Date(start));
  return Math.floor(ms/(1000*60*60*24)) + 1;
}

exports.applyLeave = async (req, res) => {
  try {
    const { email, startDate, endDate, reason } = req.body;
    if (!email || !startDate || !endDate) return res.status(400).json({ error: 'Missing fields' });
    if (new Date(endDate) < new Date(startDate)) return res.status(400).json({ error: 'End date cannot be before start date' });

    const emp = await Employee.findOne({ where: { email } });
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    if (new Date(startDate) < new Date(emp.joiningDate)) {
      return res.status(400).json({ error: 'Cannot apply leave before joining date' });
    }

    const overlapping = await Leave.findOne({
      where: {
        employeeId: emp.id,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate:   { [Op.between]: [startDate, endDate] } },
          { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: endDate } }
        ],
        status: { [Op.in]: ['Pending','Approved'] }
      }
    });
    if (overlapping) return res.status(400).json({ error: 'Overlapping leave exists' });

    const reqDays = daysBetween(startDate, endDate);
    if (reqDays > emp.leaveBalance) return res.status(400).json({ error: 'Not enough leave balance' });

    const leave = await Leave.create({ employeeId: emp.id, startDate, endDate, reason });
    res.json({ message: 'Leave submitted', leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({ include: [{ model: Employee }], order: [['id','DESC']] });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await Leave.findByPk(id, { include: [{ model: Employee }] });
    if (!leave) return res.status(404).json({ error: 'Leave not found' });

    if (!['Approved','Rejected','Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    if (status === 'Approved' && leave.status !== 'Approved') {
      const days = daysBetween(leave.startDate, leave.endDate);
      if (leave.Employee.leaveBalance < days) {
        return res.status(400).json({ error: 'Insufficient balance at approval time' });
      }
      leave.Employee.leaveBalance -= days;
      await leave.Employee.save();
    }

    leave.status = status;
    await leave.save();
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};