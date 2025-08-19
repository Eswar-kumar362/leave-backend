const { Sequelize } = require("sequelize");
require("dotenv").config();

// Use DATABASE_URL directly (from Railway)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: { dateStrings: true },
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ DB connection error:", err));

module.exports = sequelize;
