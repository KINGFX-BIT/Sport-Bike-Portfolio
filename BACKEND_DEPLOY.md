# 🚀 Backend Deployment Guide

## Deploy to Render

### Method 1: Using render.yaml (Recommended - 1 Click)

1. **Go to Render Dashboard**
   - Visit: https://render.com
   - Sign in with GitHub

2. **Create New Blueprint**
   - Click **"New +"** → **"Blueprint"**
   - Connect repository: **KINGFX-BIT/Sport-Bike-Portfolio**
   - Render will auto-detect `render.yaml`
   - Click **"Apply"**

3. **Configure Environment Variables**
   After deployment starts, add these in Render dashboard:
   ```
   DB_HOST=<your-neon-host>
   DB_USER=<your-neon-user>
   DB_PASSWORD=<your-neon-password>
   DB_NAME=sportbike_db
   ```

### Method 2: Manual Setup

1. **Create New Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect: **KINGFX-BIT/Sport-Bike-Portfolio**

2. **Configure Service**
   ```
   Name:           sport-bike-backend
   Region:         Oregon (US West)
   Branch:         main
   Root Directory: backend
   Runtime:        Node
   Build Command:  npm install
   Start Command:  npm start
   ```

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=<neon-host>
   DB_PORT=5432
   DB_USER=<neon-user>
   DB_PASSWORD=<neon-password>
   DB_NAME=sportbike_db
   JWT_SECRET=<generate-secure-random-string>
   ```

4. **Deploy**
   - Click **"Create Web Service"**
   - Wait 2-3 minutes for deployment

---

## Deploy Database to Neon

### Step 1: Create Neon Project

1. **Sign Up/Login**
   - Visit: https://neon.tech
   - Sign in with GitHub

2. **Create New Project**
   - Click **"Create a project"**
   - Project name: `sport-bike-db`
   - Region: Choose closest to your users (e.g., US East)
   - PostgreSQL version: **16** (latest)

3. **Get Connection String**
   - Copy the connection string (looks like):
   ```
   postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/sportbike_db?sslmode=require
   ```

### Step 2: Run Schema

1. **Install PostgreSQL Client** (if not installed)
   ```bash
   # Windows (via Chocolatey)
   choco install postgresql
   
   # Or download from: https://www.postgresql.org/download/
   ```

2. **Run Schema SQL**
   ```bash
   cd backend
   psql "<your-neon-connection-string>" -f database/schema.sql
   ```

### Step 3: Seed Database

1. **Update backend/.env temporarily**
   ```env
   DB_HOST=ep-cool-darkness-123456.us-east-2.aws.neon.tech
   DB_PORT=5432
   DB_USER=your_neon_user
   DB_PASSWORD=your_neon_password
   DB_NAME=sportbike_db
   DB_SSL=true
   ```

2. **Run Seed Script**
   ```bash
   cd backend
   npm install
   npm run seed
   ```

   This will populate:
   - ✅ 11 brands
   - ✅ 102 sport bikes
   - ✅ Multiple colors per bike
   - ✅ Multiple images per bike
   - ✅ Admin user (admin@sportbikes.com / admin123)

---

## Alternative: Deploy Database to Supabase

1. **Go to Supabase**
   - Visit: https://supabase.com
   - Create new project

2. **Get Database Credentials**
   - Go to Settings → Database
   - Copy connection details

3. **Run Schema & Seed**
   - Use same commands as Neon above

---

## Connect Everything

### Step 1: Update Backend Environment
In Render dashboard, add Neon credentials:
```
DB_HOST=ep-cool-darkness-123456.us-east-2.aws.neon.tech
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=sportbike_db
```

### Step 2: Update Frontend Environment
In Vercel dashboard:
1. Go to your frontend project
2. Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://sport-bike-backend.onrender.com/api
   ```
4. Redeploy (automatic)

### Step 3: Update Backend CORS
Your backend already has CORS configured, but verify in `server.js`:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-phi-eight-78.vercel.app',
  'https://your-custom-domain.com'
];
```

---

## Quick Deploy Checklist

- [ ] Create Neon PostgreSQL database
- [ ] Run schema.sql on Neon
- [ ] Run seed.js to populate data
- [ ] Deploy backend to Render with Neon credentials
- [ ] Update Vercel environment with backend URL
- [ ] Test API endpoint: `https://your-backend.onrender.com/api/bikes`
- [ ] Test frontend connection

---

## Troubleshooting

### Backend won't start:
- Check environment variables are set correctly
- Check database connection string
- View logs in Render dashboard

### Database connection fails:
- Neon requires SSL: ensure `ssl: { rejectUnauthorized: false }` in db.js
- Check IP whitelist (Neon allows all by default)
- Verify connection string format

### Frontend can't connect:
- Check CORS settings in backend
- Verify VITE_API_URL in Vercel
- Check backend is actually running on Render

---

**Your Backend URL will be:** `https://sport-bike-backend-XXXX.onrender.com`

**Free tier notes:**
- Render: Spins down after 15 min of inactivity (cold starts ~30s)
- Neon: 1 project, 10 branches, 3GB storage (free forever)

---

Ready to deploy? Follow Method 1 for fastest deployment! 🚀
