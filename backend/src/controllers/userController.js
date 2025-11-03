const User = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      avatar: req.file ? `/uploads/${req.file.filename}` : null
    });

    const token = generateToken(user.id);

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(updates);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Fetch and Store Users from ReqRes API
exports.fetchAndStoreUsers = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.REQRES_API_URL}/users`);
    const users = response.data.data;

    for (const userData of users) {
      await User.findOrCreate({
        where: { email: userData.email },
        defaults: {
          firstName: userData.first_name,
          lastName: userData.last_name,
          avatar: userData.avatar,
          password: Math.random().toString(36).slice(-8) // Generate random password
        }
      });
    }

    res.json({ message: 'Users imported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error importing users', error: error.message });
  }
};