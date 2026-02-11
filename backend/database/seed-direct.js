const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.NODE_ENV === 'production' 
  ? `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`
  : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const brands = [
  { name: 'Yamaha', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Yamaha_Motor_Company_logo.svg/200px-Yamaha_Motor_Company_logo.svg.png' },
  { name: 'Kawasaki', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Kawasaki_Heavy_Industries_logo.svg/200px-Kawasaki_Heavy_Industries_logo.svg.png' },
  { name: 'Suzuki', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/200px-Suzuki_logo_2.svg.png' },
  { name: 'Honda', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/200px-Honda.svg.png' },
  { name: 'Ducati', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Ducati_red_logo.PNG/200px-Ducati_red_logo.PNG' },
  { name: 'BMW', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png' },
  { name: 'KTM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/KTM-Logo.svg/200px-KTM-Logo.svg.png' },
  { name: 'Aprilia', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aprilia_logo.svg/200px-Aprilia_logo.svg.png' },
  { name: 'Triumph', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Triumph_Motorcycles_logo.svg/200px-Triumph_Motorcycles_logo.svg.png' },
  { name: 'MV Agusta', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MV-Agusta-Logo.svg/200px-MV-Agusta-Logo.svg.png' },
  { name: 'Harley Davidson', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Harley-Davidson_logo.svg/200px-Harley-Davidson_logo.svg.png' }
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('✓ Connected to database');

    // Clear existing data
    console.log('\nClearing existing data...');
    await client.query('DELETE FROM bike_images');
    await client.query('DELETE FROM bike_colors');
    await client.query('DELETE FROM bikes');
    await client.query('DELETE FROM brands');
    await client.query('DELETE FROM users');
    console.log('✓ Cleared');

    // Insert brands
    console.log('\nInserting brands...');
    for (const brand of brands) {
      await client.query(
        'INSERT INTO brands (name, logo_url) VALUES ($1, $2)',
        [brand.name, brand.logo_url]
      );
      console.log(`  ✓ ${brand.name}`);
    }

    // Verify brands
    const brandCheck = await client.query('SELECT COUNT(*) FROM brands');
    console.log(`\n✓ ${brandCheck.rows[0].count} brands inserted`);

    // Insert a few sample bikes
    console.log('\nInserting sample bikes...');
    const yamahaBrand = await client.query('SELECT id FROM brands WHERE name = $1', ['Yamaha']);
    const kawasakiBrand = await client.query('SELECT id FROM brands WHERE name = $1', ['Kawasaki']);
    
    // Insert Yamaha YZF-R1M
    const r1m = await client.query(
      `INSERT INTO bikes (brand_id, name, model_year, engine_cc, horsepower, torque, top_speed, mileage, price, category, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [yamahaBrand.rows[0].id, 'YZF-R1M', 2024, 998, 200.0, 113.0, 299, 15.5, 26499.00, 'HyperSport', 'MotoGP-derived electronics and carbon fiber bodywork']
    );
    console.log('  ✓ Yamaha YZF-R1M');

    // Add colors for R1M
    await client.query(
      'INSERT INTO bike_colors (bike_id, color_name, color_hex) VALUES ($1, $2, $3)',
      [r1m.rows[0].id, 'Yamaha Blue', '#0033A0']
    );

    // Add images for R1M
    await client.query(
      'INSERT INTO bike_images (bike_id, image_url, is_primary) VALUES ($1, $2, $3)',
      [r1m.rows[0].id, 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800', true]
    );

    // Insert Kawasaki H2R
    const h2r = await client.query(
      `INSERT INTO bikes (brand_id, name, model_year, engine_cc, horsepower, torque, top_speed, mileage, price, category, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [kawasakiBrand.rows[0].id, 'Ninja H2R', 2024, 998, 310.0, 165.0, 400, 12.0, 55000.00, 'Track', 'Supercharged track-only motorcycle']
    );
    console.log('  ✓ Kawasaki Ninja H2R');

    // Add colors for H2R
    await client.query(
      'INSERT INTO bike_colors (bike_id, color_name, color_hex) VALUES ($1, $2, $3)',
      [h2r.rows[0].id, 'Lime Green', '#00FF00']
    );

    // Add images for H2R
    await client.query(
      'INSERT INTO bike_images (bike_id, image_url, is_primary) VALUES ($1, $2, $3)',
      [h2r.rows[0].id, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', true]
    );

    // Create admin user
    console.log('\nCreating admin user...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await client.query(
      `INSERT INTO users (username, email, password_hash, role) 
       VALUES ($1, $2, $3, $4)`,
      ['admin', 'admin@sportbikes.com', hashedPassword, 'admin']
    );
    console.log('✓ Admin user created');

    // Final verification
    console.log('\n=== VERIFICATION ===');
    const counts = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM brands) as brands,
        (SELECT COUNT(*) FROM bikes) as bikes,
        (SELECT COUNT(*) FROM bike_colors) as colors,
        (SELECT COUNT(*) FROM bike_images) as images,
        (SELECT COUNT(*) FROM users) as users
    `);
    
    console.log(`Brands: ${counts.rows[0].brands}`);
    console.log(`Bikes: ${counts.rows[0].bikes}`);
    console.log(`Colors: ${counts.rows[0].colors}`);
    console.log(`Images: ${counts.rows[0].images}`);
    console.log(`Users: ${counts.rows[0].users}`);
    
    console.log('\n✅ Database seeded successfully!');
    console.log('   Email: admin@sportbikes.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error(error);
  } finally {
    await client.end();
    console.log('\n✓ Connection closed');
  }
}

seedDatabase();
