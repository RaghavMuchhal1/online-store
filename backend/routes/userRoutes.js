const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/authUtils');
const { generateToken } = require('../utils/authUtils');

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields or invalid data
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword, role });
    const token = generateToken(newUser);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      role: user.role, 
      username: user.email 
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});


module.exports = router;
