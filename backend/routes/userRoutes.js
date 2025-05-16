const express = require('express');
const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword, role });

    const token = generateToken(user);
    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

module.exports = router;
