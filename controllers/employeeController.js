const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, joiningDate } = req.body;
    const emp = await Employee.create({ name, email, department, joiningDate });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({ order: [['id','DESC']] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findByEmail = async (req, res) => {
  try {
    const email = req.params.email || req.query.email;
    const emp = await Employee.findOne({ where: { email } });
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};