const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandBikes
} = require('../controllers/brandController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.get('/:id/bikes', getBrandBikes);

// Protected routes (Admin only)
router.post('/', verifyToken, isAdmin, createBrand);
router.put('/:id', verifyToken, isAdmin, updateBrand);
router.delete('/:id', verifyToken, isAdmin, deleteBrand);

module.exports = router;
