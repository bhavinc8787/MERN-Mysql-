const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

// Try to authenticate DB first, then sync and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message || err);
    // Start server anyway so API can respond with DB errors where appropriate
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (DB connection failed)`);
    });
  });