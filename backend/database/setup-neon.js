const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Neon connection string
const connectionString = 'postgresql://neondb_owner:npg_QaOlvHdZ53Ef@ep-falling-hall-ai9vrr1n-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function setupDatabase() {
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to Neon database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Read schema file
    console.log('\n📄 Reading schema.sql...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    console.log('🏗️  Creating database schema...');
    await client.query(schemaSQL);
    console.log('✅ Schema created successfully!');
    console.log('\n📊 Database tables created:');
    console.log('   - brands');
    console.log('   - bikes');
    console.log('   - bike_colors');
    console.log('   - bike_images');
    console.log('   - users');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n✅ Database setup complete! Ready to seed data.');
  }
}

setupDatabase();
