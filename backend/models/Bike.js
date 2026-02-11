const pool = require('../database/db');

class Bike {
  // Get all bikes with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT 
        b.*,
        br.name as brand_name,
        br.logo_url as brand_logo,
        json_agg(DISTINCT jsonb_build_object(
          'id', bc.id,
          'name', bc.color_name,
          'hex', bc.color_hex
        )) FILTER (WHERE bc.id IS NOT NULL) as colors,
        json_agg(DISTINCT jsonb_build_object(
          'id', bi.id,
          'url', bi.image_url,
          'isPrimary', bi.is_primary,
          'order', bi.display_order
        )) FILTER (WHERE bi.id IS NOT NULL) as images
      FROM bikes b
      LEFT JOIN brands br ON b.brand_id = br.id
      LEFT JOIN bike_colors bc ON b.id = bc.bike_id
      LEFT JOIN bike_images bi ON b.id = bi.bike_id
      WHERE 1=1
    `;

    const params = [];
    let paramCount = 1;

    // Apply filters
    if (filters.brand_id) {
      query += ` AND b.brand_id = $${paramCount}`;
      params.push(filters.brand_id);
      paramCount++;
    }

    if (filters.category) {
      query += ` AND b.category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }

    if (filters.min_price) {
      query += ` AND b.price >= $${paramCount}`;
      params.push(filters.min_price);
      paramCount++;
    }

    if (filters.max_price) {
      query += ` AND b.price <= $${paramCount}`;
      params.push(filters.max_price);
      paramCount++;
    }

    if (filters.min_cc) {
      query += ` AND b.engine_cc >= $${paramCount}`;
      params.push(filters.min_cc);
      paramCount++;
    }

    if (filters.max_cc) {
      query += ` AND b.engine_cc <= $${paramCount}`;
      params.push(filters.max_cc);
      paramCount++;
    }

    if (filters.search) {
      query += ` AND (b.name ILIKE $${paramCount} OR b.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    query += ' GROUP BY b.id, br.name, br.logo_url';

    // Apply sorting
    const sortOptions = {
      'price_asc': 'b.price ASC',
      'price_desc': 'b.price DESC',
      'cc_asc': 'b.engine_cc ASC',
      'cc_desc': 'b.engine_cc DESC',
      'speed_desc': 'b.top_speed DESC',
      'name_asc': 'b.name ASC',
      'newest': 'b.model_year DESC'
    };

    const sortBy = sortOptions[filters.sort] || 'b.id DESC';
    query += ` ORDER BY ${sortBy}`;

    // Apply pagination
    const limit = parseInt(filters.limit) || 12;
    const offset = parseInt(filters.offset) || 0;
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  }

  // Get total count for pagination
  static async getCount(filters = {}) {
    let query = 'SELECT COUNT(*) FROM bikes b WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (filters.brand_id) {
      query += ` AND b.brand_id = $${paramCount}`;
      params.push(filters.brand_id);
      paramCount++;
    }

    if (filters.category) {
      query += ` AND b.category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }

    if (filters.min_price) {
      query += ` AND b.price >= $${paramCount}`;
      params.push(filters.min_price);
      paramCount++;
    }

    if (filters.max_price) {
      query += ` AND b.price <= $${paramCount}`;
      params.push(filters.max_price);
      paramCount++;
    }

    if (filters.min_cc) {
      query += ` AND b.engine_cc >= $${paramCount}`;
      params.push(filters.min_cc);
      paramCount++;
    }

    if (filters.max_cc) {
      query += ` AND b.engine_cc <= $${paramCount}`;
      params.push(filters.max_cc);
      paramCount++;
    }

    if (filters.search) {
      query += ` AND (b.name ILIKE $${paramCount} OR b.description ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count);
  }

  // Get bike by ID
  static async getById(id) {
    const query = `
      SELECT 
        b.*,
        br.name as brand_name,
        br.logo_url as brand_logo,
        json_agg(DISTINCT jsonb_build_object(
          'id', bc.id,
          'name', bc.color_name,
          'hex', bc.color_hex
        )) FILTER (WHERE bc.id IS NOT NULL) as colors,
        json_agg(DISTINCT jsonb_build_object(
          'id', bi.id,
          'url', bi.image_url,
          'isPrimary', bi.is_primary,
          'order', bi.display_order
        ) ORDER BY bi.display_order) FILTER (WHERE bi.id IS NOT NULL) as images
      FROM bikes b
      LEFT JOIN brands br ON b.brand_id = br.id
      LEFT JOIN bike_colors bc ON b.id = bc.bike_id
      LEFT JOIN bike_images bi ON b.id = bi.bike_id
      WHERE b.id = $1
      GROUP BY b.id, br.name, br.logo_url
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Create new bike
  static async create(bikeData) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const bikeQuery = `
        INSERT INTO bikes (
          brand_id, name, model_year, engine_cc, horsepower, 
          torque, top_speed, mileage, price, category, description
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;

      const bikeValues = [
        bikeData.brand_id,
        bikeData.name,
        bikeData.model_year,
        bikeData.engine_cc,
        bikeData.horsepower,
        bikeData.torque,
        bikeData.top_speed,
        bikeData.mileage,
        bikeData.price,
        bikeData.category,
        bikeData.description
      ];

      const bikeResult = await client.query(bikeQuery, bikeValues);
      const bike = bikeResult.rows[0];

      // Insert colors
      if (bikeData.colors && bikeData.colors.length > 0) {
        for (const color of bikeData.colors) {
          await client.query(
            'INSERT INTO bike_colors (bike_id, color_name, color_hex) VALUES ($1, $2, $3)',
            [bike.id, color.name, color.hex]
          );
        }
      }

      // Insert images
      if (bikeData.images && bikeData.images.length > 0) {
        for (let i = 0; i < bikeData.images.length; i++) {
          await client.query(
            'INSERT INTO bike_images (bike_id, image_url, is_primary, display_order) VALUES ($1, $2, $3, $4)',
            [bike.id, bikeData.images[i], i === 0, i]
          );
        }
      }

      await client.query('COMMIT');
      return bike;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Update bike
  static async update(id, bikeData) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const bikeQuery = `
        UPDATE bikes SET
          brand_id = $1,
          name = $2,
          model_year = $3,
          engine_cc = $4,
          horsepower = $5,
          torque = $6,
          top_speed = $7,
          mileage = $8,
          price = $9,
          category = $10,
          description = $11,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
      `;

      const bikeValues = [
        bikeData.brand_id,
        bikeData.name,
        bikeData.model_year,
        bikeData.engine_cc,
        bikeData.horsepower,
        bikeData.torque,
        bikeData.top_speed,
        bikeData.mileage,
        bikeData.price,
        bikeData.category,
        bikeData.description,
        id
      ];

      const bikeResult = await client.query(bikeQuery, bikeValues);

      if (bikeResult.rows.length === 0) {
        throw new Error('Bike not found');
      }

      // Update colors if provided
      if (bikeData.colors) {
        await client.query('DELETE FROM bike_colors WHERE bike_id = $1', [id]);
        for (const color of bikeData.colors) {
          await client.query(
            'INSERT INTO bike_colors (bike_id, color_name, color_hex) VALUES ($1, $2, $3)',
            [id, color.name, color.hex]
          );
        }
      }

      // Update images if provided
      if (bikeData.images) {
        await client.query('DELETE FROM bike_images WHERE bike_id = $1', [id]);
        for (let i = 0; i < bikeData.images.length; i++) {
          await client.query(
            'INSERT INTO bike_images (bike_id, image_url, is_primary, display_order) VALUES ($1, $2, $3, $4)',
            [id, bikeData.images[i], i === 0, i]
          );
        }
      }

      await client.query('COMMIT');
      return bikeResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete bike
  static async delete(id) {
    const result = await pool.query('DELETE FROM bikes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Get related bikes (same category or brand)
  static async getRelated(bikeId, limit = 4) {
    const query = `
      WITH current_bike AS (
        SELECT brand_id, category FROM bikes WHERE id = $1
      )
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
      CROSS JOIN current_bike cb
      WHERE b.id != $1 
        AND (b.category = cb.category OR b.brand_id = cb.brand_id)
      GROUP BY b.id, br.name
      ORDER BY 
        CASE WHEN b.category = cb.category THEN 0 ELSE 1 END,
        CASE WHEN b.brand_id = cb.brand_id THEN 0 ELSE 1 END,
        RANDOM()
      LIMIT $2
    `;

    const result = await pool.query(query, [bikeId, limit]);
    return result.rows;
  }

  // Get featured bikes
  static async getFeatured(limit = 6) {
    const query = `
      SELECT 
        b.*,
        br.name as brand_name,
        br.logo_url as brand_logo,
        json_agg(DISTINCT jsonb_build_object(
          'id', bi.id,
          'url', bi.image_url,
          'isPrimary', bi.is_primary
        )) FILTER (WHERE bi.id IS NOT NULL) as images
      FROM bikes b
      LEFT JOIN brands br ON b.brand_id = br.id
      LEFT JOIN bike_images bi ON b.id = bi.bike_id
      GROUP BY b.id, br.name, br.logo_url
      ORDER BY b.horsepower DESC, b.top_speed DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }
}

module.exports = Bike;
