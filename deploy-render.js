const https = require('https');
const fs = require('fs');
require('dotenv').config();

// You need to get your Render API key from: https://dashboard.render.com/u/settings#api-keys
const RENDER_API_KEY = process.env.RENDER_API_KEY || 'YOUR_RENDER_API_KEY_HERE';

const serviceConfig = {
  "type": "web_service",
  "name": "sport-bike-backend",
  "repo": "https://github.com/KINGFX-BIT/Sport-Bike-Portfolio",
  "branch": "main",
  "rootDir": "backend",
  "region": "oregon",
  "plan": "free",
  "runtime": "node",
  "buildCommand": "npm install",
  "startCommand": "npm start",
  "envVars": [
    { "key": "NODE_ENV", "value": "production" },
    { "key": "PORT", "value": "5000" },
    { "key": "FRONTEND_URL", "value": "https://frontend-phi-eight-78.vercel.app" },
    { "key": "DB_HOST", "value": "ep-falling-hall-ai9vrr1n-pooler.c-4.us-east-1.aws.neon.tech" },
    { "key": "DB_PORT", "value": "5432" },
    { "key": "DB_USER", "value": "neondb_owner" },
    { "key": "DB_PASSWORD", "value": "npg_QaOlvHdZ53Ef" },
    { "key": "DB_NAME", "value": "neondb" },
    { "key": "JWT_SECRET", "value": "your-super-secret-jwt-key-change-this-in-production-12345" }
  ]
};

function deployToRender() {
  const data = JSON.stringify(serviceConfig);

  const options = {
    hostname: 'api.render.com',
    port: 443,
    path: '/v1/services',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RENDER_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  console.log('🚀 Deploying backend to Render...\n');

  const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 201) {
        const service = JSON.parse(responseData);
        console.log('✅ Backend deployed successfully!\n');
        console.log('📋 Service Details:');
        console.log(`   Name: ${service.name}`);
        console.log(`   URL: https://${service.name}.onrender.com`);
        console.log(`   Status: ${service.status}`);
        console.log('\n🔗 Your backend URL: https://' + service.name + '.onrender.com');
        console.log('\n⏳ Deployment usually takes 2-3 minutes...');
        console.log('   Visit: https://dashboard.render.com to monitor progress');
        
        // Save URL to file for frontend update
        fs.writeFileSync('backend-url.txt', `https://${service.name}.onrender.com`);
      } else {
        console.error('❌ Deployment failed!');
        console.error('Status Code:', res.statusCode);
        console.error('Response:', responseData);
        
        if (res.statusCode === 401) {
          console.error('\n⚠️  AUTHENTICATION ERROR');
          console.error('Please set your Render API key:');
          console.error('1. Get key from: https://dashboard.render.com/u/settings#api-keys');
          console.error('2. Set environment variable: $env:RENDER_API_KEY="your-key"');
          console.error('3. Or edit this file and add your key at line 6');
        }
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error:', error.message);
  });

  req.write(data);
  req.end();
}

// Check if API key is set
if (!RENDER_API_KEY || RENDER_API_KEY === 'YOUR_RENDER_API_KEY_HERE') {
  console.log('⚠️  Render API Key Required\n');
  console.log('To deploy automatically:');
  console.log('1. Visit: https://dashboard.render.com/u/settings#api-keys');
  console.log('2. Create new API key');
  console.log('3. Run: $env:RENDER_API_KEY="your-key"; node deploy-render.js');
  console.log('\n📖 Or follow manual steps in DEPLOY_NOW.md');
  process.exit(1);
} else {
  deployToRender();
}
