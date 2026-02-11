const { Client } = require('pg');
const bcrypt = require('bcryptjs');

// Neon connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_QaOlvHdZ53Ef@ep-falling-hall-ai9vrr1n-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Import the seed data
const seedDataModule = require('./seed');

async function seedNeonDatabase() {
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

    // Start transaction
    await client.query('BEGIN');

    console.log('\n🌱 Starting database seeding...\n');

    // Run the original seed logic but with client instead of pool
    // We'll need to copy the seed logic here
    console.log('⚠️  Please run: node database/seed.js');
    console.log('   This will use the connection from db.js');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedNeonDatabase();
