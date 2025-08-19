const express = require('express');
const { addEmployee, getEmployees, findByEmail } = require('../controllers/employeeController');
const router = express.Router();

router.post('/', addEmployee);
router.get('/', getEmployees);
router.get('/by-email', findByEmail);
router.get('/find/:email', findByEmail);

module.exports = router;