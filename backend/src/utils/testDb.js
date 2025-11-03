require('dotenv').config();
const sequelize = require('../config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection OK');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
})();