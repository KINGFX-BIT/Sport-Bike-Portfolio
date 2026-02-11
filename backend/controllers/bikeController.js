const Bike = require('../models/Bike');

// Get all bikes with filters
const getAllBikes = async (req, res) => {
  try {
    const filters = {
      brand_id: req.query.brand_id,
      category: req.query.category,
      min_price: req.query.min_price,
      max_price: req.query.max_price,
      min_cc: req.query.min_cc,
      max_cc: req.query.max_cc,
      search: req.query.search,
      sort: req.query.sort,
      limit: req.query.limit || 12,
      offset: req.query.offset || 0
    };

    const bikes = await Bike.getAll(filters);
    const total = await Bike.getCount(filters);

    res.json({
      success: true,
      data: bikes,
      pagination: {
        total,
        limit: parseInt(filters.limit),
        offset: parseInt(filters.offset),
        pages: Math.ceil(total / filters.limit)
      }
    });
  } catch (error) {
    console.error('Error getting bikes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get bike by ID
const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.getById(req.params.id);
    
    if (!bike) {
      return res.status(404).json({ 
        success: false, 
        error: 'Bike not found' 
      });
    }

    res.json({ success: true, data: bike });
  } catch (error) {
    console.error('Error getting bike:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new bike
const createBike = async (req, res) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: bike,
      message: 'Bike created successfully' 
    });
  } catch (error) {
    console.error('Error creating bike:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update bike
const updateBike = async (req, res) => {
  try {
    const bike = await Bike.update(req.params.id, req.body);
    res.json({ 
      success: true, 
      data: bike,
      message: 'Bike updated successfully' 
    });
  } catch (error) {
    console.error('Error updating bike:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete bike
const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.delete(req.params.id);
    
    if (!bike) {
      return res.status(404).json({ 
        success: false, 
        error: 'Bike not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Bike deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting bike:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get related bikes
const getRelatedBikes = async (req, res) => {
  try {
    const bikes = await Bike.getRelated(req.params.id, req.query.limit || 4);
    res.json({ success: true, data: bikes });
  } catch (error) {
    console.error('Error getting related bikes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get featured bikes
const getFeaturedBikes = async (req, res) => {
  try {
    const bikes = await Bike.getFeatured(req.query.limit || 6);
    res.json({ success: true, data: bikes });
  } catch (error) {
    console.error('Error getting featured bikes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
  getRelatedBikes,
  getFeaturedBikes
};
