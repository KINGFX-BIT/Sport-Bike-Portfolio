const express = require('express');
const router = express.Router();
const {
  getAllBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
  getRelatedBikes,
  getFeaturedBikes
} = require('../controllers/bikeController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllBikes);
router.get('/featured', getFeaturedBikes);
router.get('/:id', getBikeById);
router.get('/:id/related', getRelatedBikes);

// Protected routes (Admin only)
router.post('/', verifyToken, isAdmin, createBike);
router.put('/:id', verifyToken, isAdmin, updateBike);
router.delete('/:id', verifyToken, isAdmin, deleteBike);

module.exports = router;
