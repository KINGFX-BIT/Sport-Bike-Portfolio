const pool = require('../database/db');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const query = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at
    `;
    
    const values = [
      userData.username,
      userData.email,
      hashedPassword,
      userData.role || 'user'
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
