const pool = require('../database/db');

class Brand {
  // Get all brands
  static async getAll() {
    const query = `
      SELECT 
        br.*,
        COUNT(b.id) as bike_count
      FROM brands br
      LEFT JOIN bikes b ON br.id = b.brand_id
      GROUP BY br.id
      ORDER BY br.name ASC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  // Get brand by ID
  static async getById(id) {
    const query = 'SELECT * FROM brands WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Create new brand
  static async create(brandData) {
    const query = `
      INSERT INTO brands (name, logo_url)
      VALUES ($1, $2)
      RETURNING *
    `;
    
    const values = [brandData.name, brandData.logo_url || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Update brand
  static async update(id, brandData) {
    const query = `
      UPDATE brands
      SET name = $1, logo_url = $2
      WHERE id = $3
      RETURNING *
    `;
    
    const values = [brandData.name, brandData.logo_url, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Delete brand
  static async delete(id) {
    const result = await pool.query('DELETE FROM brands WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Get bikes by brand
  static async getBikes(brandId, limit = 20) {
    const query = `
      SELECT 
        b.*,
        br.name as brand_name,
        json_agg(DISTINCT jsonb_build_object(
          'id', bi.id,
          'url', bi.image_url,
          'isPrimary', bi.is_primary
        )) FILTER (WHERE bi.id IS NOT NULL) as images
      FROM bikes b
      LEFT JOIN brands br ON b.brand_id = br.id
      LEFT JOIN bike_images bi ON b.id = bi.bike_id
      WHERE b.brand_id = $1
      GROUP BY b.id, br.name
      ORDER BY b.model_year DESC, b.name ASC
      LIMIT $2
    `;

    const result = await pool.query(query, [brandId, limit]);
    return result.rows;
  }
}

module.exports = Brand;
