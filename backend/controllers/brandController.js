const Brand = require('../models/Brand');

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.getAll();
    res.json({ success: true, data: brands });
  } catch (error) {
    console.error('Error getting brands:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get brand by ID
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.getById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ 
        success: false, 
        error: 'Brand not found' 
      });
    }

    res.json({ success: true, data: brand });
  } catch (error) {
    console.error('Error getting brand:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new brand
const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: brand,
      message: 'Brand created successfully' 
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.update(req.params.id, req.body);
    
    if (!brand) {
      return res.status(404).json({ 
        success: false, 
        error: 'Brand not found' 
      });
    }

    res.json({ 
      success: true, 
      data: brand,
      message: 'Brand updated successfully' 
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete brand
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.delete(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ 
        success: false, 
        error: 'Brand not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Brand deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get bikes by brand
const getBrandBikes = async (req, res) => {
  try {
    const bikes = await Brand.getBikes(req.params.id, req.query.limit);
    res.json({ success: true, data: bikes });
  } catch (error) {
    console.error('Error getting brand bikes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandBikes
};
