const express = require('express');
const { applyLeave, getAllLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const router = express.Router();

router.post('/', applyLeave);
router.get('/', getAllLeaves);
router.put('/:id', updateLeaveStatus);

module.exports = router;