const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'asdfghiucv709586967';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d'; 

// Signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Validate inputs
      if (!email || !password) {
          return res.status(400).json({ message: 'Both email and password are required' });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

      // Set token as HTTP-only cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
