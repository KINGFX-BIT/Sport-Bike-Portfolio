const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already registered' 
      });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username already taken' 
      });
    }

    // Create new user
    const user = await User.create({ username, email, password });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: { user, token },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: { user: userWithoutPassword, token },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
