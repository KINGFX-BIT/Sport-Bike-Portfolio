#!/usr/bin/env node

/**
 * Wake up backend and test endpoints
 */

const https = require('https');

const BACKEND_URL = 'https://sport-bike-portfolio.onrender.com';

async function testEndpoint(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BACKEND_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🔥 Warming up backend...\n');
  console.log(`Backend: ${BACKEND_URL}`);
  console.log('='.repeat(50));

  try {
    // Test 1: Health check
    console.log('\n1️⃣  Testing health endpoint...');
    const health = await testEndpoint('/api/health');
    if (health.status === 200) {
      console.log('   ✅ Health check passed');
      console.log(`   ⏰ Timestamp: ${health.data.timestamp}`);
    } else {
      console.log(`   ❌ Health check failed: ${health.status}`);
    }

    // Test 2: Brands
    console.log('\n2️⃣  Testing brands endpoint...');
    const brands = await testEndpoint('/api/brands');
    if (brands.status === 200) {
      console.log(`   ✅ Brands loaded: ${brands.data.data?.length || 0} brands`);
    } else {
      console.log(`   ❌ Brands failed: ${brands.status}`);
    }

    // Test 3: Bikes
    console.log('\n3️⃣  Testing bikes endpoint...');
    const bikes = await testEndpoint('/api/bikes');
    if (bikes.status === 200) {
      console.log(`   ✅ Bikes loaded: ${bikes.data.data?.length || 0} bikes`);
    } else {
      console.log(`   ❌ Bikes failed: ${bikes.status}`);
    }

    // Test 4: Login
    console.log('\n4️⃣  Testing login endpoint...');
    const login = await testEndpoint('/api/auth/login', 'POST', {
      email: 'admin@sportbikes.com',
      password: 'admin123'
    });
    if (login.status === 200) {
      console.log('   ✅ Login successful');
      console.log(`   👤 User: ${login.data.data?.user?.username}`);
      console.log(`   🔑 Token: ${login.data.data?.token?.substring(0, 20)}...`);
    } else {
      console.log(`   ❌ Login failed: ${login.status}`);
      console.log(`   Message: ${JSON.stringify(login.data)}`);
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ BACKEND IS READY!\n');
    console.log('🌐 Frontend: https://frontend-phi-eight-78.vercel.app');
    console.log('🔗 Backend: ' + BACKEND_URL);
    console.log('\n👤 Test Login:');
    console.log('   Email: admin@sportbikes.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n⚠️  Backend might be cold starting (first request can take 30-60s)');
    console.log('   Try again in a minute or visit the site to wake it up.');
  }
}

runTests();
