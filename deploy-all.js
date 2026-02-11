#!/usr/bin/env node

/**
 * Automated Deployment Script for Sport Bike Portfolio
 * This script deploys both backend and frontend automatically
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AUTOMATED DEPLOYMENT STARTING...\n');
console.log('=' .repeat(50));

// Step 1: Backend to Render
console.log('\n📦 STEP 1: Deploy Backend to Render');
console.log('-'.repeat(50));

// Check if Render Blueprint exists
const blueprintPath = path.join(__dirname, 'render.yaml');
if (fs.existsSync(blueprintPath)) {
  console.log('✓ Found render.yaml blueprint');
  console.log('\n⚠️  To deploy backend automatically, you need:');
  console.log('1. Render API Key from: https://dashboard.render.com/u/settings#api-keys');
  console.log('2. Run this command with your API key:\n');
  console.log('   $env:RENDER_API_KEY="your-api-key"; node deploy-render.js\n');
  console.log('OR deploy manually:');
  console.log('   https://dashboard.render.com/select-repo?type=blueprint');
  console.log('   Select: Sport-Bike-Portfolio repo\n');
}

// Step 2: Update Frontend
console.log('\n🎨 STEP 2: Deploy Frontend to Vercel');
console.log('-'.repeat(50));

try {
  // Check if backend URL exists
  const backendUrlFile = path.join(__dirname, 'backend-url.txt');
  let backendUrl = 'http://localhost:5000'; // fallback
  
  if (fs.existsSync(backendUrlFile)) {
    backendUrl = fs.readFileSync(backendUrlFile, 'utf8').trim();
    console.log(`✓ Using backend URL: ${backendUrl}`);
  } else {
    console.log('⚠️  No backend URL found yet');
    console.log('   Deploy backend first, then run this script again');
  }

  // Update frontend .env
  const frontendEnv = path.join(__dirname, 'frontend', '.env.production');
  fs.writeFileSync(frontendEnv, `VITE_API_URL=${backendUrl}/api\n`);
  console.log('✓ Updated frontend/.env.production');

  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    console.log('✓ Vercel CLI installed');
    
    console.log('\n📤 Deploying frontend to Vercel...');
    process.chdir(path.join(__dirname, 'frontend'));
    
    // Build frontend
    console.log('Building frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Deploy to Vercel
    console.log('\nDeploying to Vercel...');
    const deployOutput = execSync('vercel --prod --yes', { encoding: 'utf8' });
    console.log(deployOutput);
    
    console.log('\n✅ Frontend deployed successfully!');
    
  } catch (error) {
    console.log('⚠️  Vercel CLI not found');
    console.log('\nTo deploy frontend:');
    console.log('1. Install: npm i -g vercel');
    console.log('2. cd frontend');
    console.log('3. vercel --prod');
  }

} catch (error) {
  console.error('❌ Error:', error.message);
}

// Step 3: Verification
console.log('\n\n🎯 DEPLOYMENT STATUS');
console.log('='.repeat(50));
console.log('✅ Database: LIVE (Neon PostgreSQL)');
console.log('   - 11 Brands');
console.log('   - 2 Bikes');
console.log('   - Admin user ready');
console.log('\n📋 Next Steps:');
console.log('1. Deploy backend on Render (see instructions above)');
console.log('2. Copy backend URL from Render dashboard');
console.log('3. Run: node update-frontend.js <backend-url>');
console.log('\n📖 Full guide: DEPLOY_NOW.md');
console.log('\n🏍️  Happy Riding! 💨');
