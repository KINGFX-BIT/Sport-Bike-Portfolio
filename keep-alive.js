// Keep-Alive Service for Render Free Tier
// Pings the backend every 10 minutes to prevent cold starts

const BACKEND_URL = 'https://sport-bike-portfolio.onrender.com';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

async function pingBackend() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/wake`);
    const data = await response.json();
    console.log(`✓ Backend alive - Uptime: ${Math.floor(data.uptime)}s`);
  } catch (error) {
    console.error('✗ Backend ping failed:', error.message);
  }
}

// Ping immediately
pingBackend();

// Then ping every 10 minutes
setInterval(pingBackend, PING_INTERVAL);

console.log(`🔄 Keep-alive service started - Pinging every 10 minutes`);
