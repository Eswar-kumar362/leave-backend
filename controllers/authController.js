const HR = require('../models/HR');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const hr = await HR.findOne({ where: { email } });
    if (!hr) return res.status(404).json({ error: 'HR not found' });

    // Compare hashed password OR fallback plain-text
    let ok = false;
    if (hr.password.startsWith('$2a$') || hr.password.startsWith('$2b$')) {
      ok = await bcrypt.compare(password, hr.password);
    } else {
      ok = hr.password === password; // fallback if stored as plain text
    }

    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: hr.id, email: hr.email },
      'secretkey',
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
