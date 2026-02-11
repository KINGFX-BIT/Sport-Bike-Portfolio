#!/usr/bin/env node

/**
 * Update Frontend with Backend URL
 * Usage: node update-frontend.js <backend-url>
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const backendUrl = process.argv[2];

if (!backendUrl) {
  console.log('❌ Please provide backend URL');
  console.log('\nUsage:');
  console.log('  node update-frontend.js https://your-backend.onrender.com');
  process.exit(1);
}

console.log('🔗 Updating frontend with backend URL...\n');
console.log(`Backend URL: ${backendUrl}`);

try {
  // Update .env.production
  const envPath = path.join(__dirname, 'frontend', '.env.production');
  const envContent = `VITE_API_URL=${backendUrl}/api\n`;
  fs.writeFileSync(envPath, envContent);
  console.log('✓ Updated frontend/.env.production');

  // Update Vercel environment variable
  console.log('\n📤 Updating Vercel environment...');
  process.chdir(path.join(__dirname, 'frontend'));
  
  try {
    // Remove old env var if exists
    try {
      execSync('vercel env rm VITE_API_URL production --yes', { stdio: 'ignore' });
    } catch { /* ignore if doesn't exist */ }
    
    // Add new env var
    execSync(`echo ${backendUrl}/api | vercel env add VITE_API_URL production`, { stdio: 'inherit' });
    console.log('✓ Vercel environment variable set');
    
    // Redeploy
    console.log('\n🚀 Redeploying frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    const output = execSync('vercel --prod --yes', { encoding: 'utf8' });
    console.log(output);
    
    console.log('\n✅ DEPLOYMENT COMPLETE!');
    console.log('\n🎉 Your live site:');
    console.log('   Frontend: https://frontend-phi-eight-78.vercel.app');
    console.log(`   Backend: ${backendUrl}`);
    console.log('\n👤 Admin Login:');
    console.log('   Email: admin@sportbikes.com');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.log('\n⚠️  Vercel CLI error. Manual steps:');
    console.log(`1. vercel env add VITE_API_URL production`);
    console.log(`   Value: ${backendUrl}/api`);
    console.log('2. vercel --prod');
  }

} catch (error) {
  console.error('❌ Error:', error.message);
}
