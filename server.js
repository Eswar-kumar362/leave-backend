const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Models
require('./models/Employee');
require('./models/Leave');
const HR = require('./models/HR');   // ✅ Import HR model

// Routes
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));

// Seed default HR (admin@example.com / admin123)
const bcrypt = require('bcryptjs');
async function seedAdmin() {
  const admin = await HR.findOne({ where: { email: 'admin@example.com' } });
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 10);
    await HR.create({ email: 'admin@example.com', password: hashed });
    console.log('✅ Default HR created: admin@example.com / admin123');
  }
}

// Start server
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => console.log('✅ DB connected'))
  .then(() => sequelize.sync())
  .then(() => seedAdmin())   // ✅ Auto-seed admin
 .then(() => app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`)))
  .catch(err => console.error('❌ DB error:', err));
