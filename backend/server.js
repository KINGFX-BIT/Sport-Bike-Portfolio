const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const bikeRoutes = require('./routes/bikeRoutes');
const brandRoutes = require('./routes/brandRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow all Vercel deployments
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost
    if (origin && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    // Allow all Vercel deployments
    if (origin && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow production frontend URL
    if (origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    
    // For development, allow all origins
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/bikes', bikeRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sport Bike API is running', timestamp: new Date().toISOString() });
});

// Wake-up endpoint (for keeping server alive)
app.get('/api/wake', (req, res) => {
  res.json({ status: 'awake', uptime: process.uptime() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Route not found', status: 404 } });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏍️  Sport Bike API Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
