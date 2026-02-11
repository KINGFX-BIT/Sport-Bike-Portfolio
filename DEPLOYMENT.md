# 🚀 Deployment Guide - Sport Bike Portfolio

## ✅ Vite Migration Complete!

Your project has been successfully migrated from Create React App to Vite for faster builds and better performance.

## 📦 What's Changed

### Frontend Updates:
- ✅ Migrated to Vite 5.x
- ✅ Updated package.json with Vite scripts
- ✅ Created vite.config.js with optimized settings
- ✅ Updated environment variables (VITE_API_URL)
- ✅ Added deployment configurations for Vercel and Netlify
- ✅ Optimized build with code splitting

### New Commands:
```bash
# Development
npm run dev          # Start dev server (faster than CRA!)

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🌐 Deploy Frontend to Vercel (Recommended)

### Method 1: Deploy via Vercel CLI (Fast)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   
5. **Follow the prompts:**
   - Link to existing project? **N**
   - Project name: **sport-bike-portfolio**
   - Directory: **.**
   - Override settings? **N**

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Dashboard (Easy)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository: **KINGFX-BIT/Sport-Bike-Portfolio**
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

5. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend URL (see backend deployment below)

6. Click **"Deploy"**

---

## 🌐 Deploy Frontend to Netlify (Alternative)

### Via Netlify CLI:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Navigate to frontend and build:**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy
   ```

4. **Deploy to production:**
   ```bash
   netlify deploy --prod
   ```

### Via Netlify Dashboard:

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select: **KINGFX-BIT/Sport-Bike-Portfolio**
4. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
   
5. Add environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend URL

6. Click **"Deploy site"**

---

## 🔧 Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** sport-bike-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   ```
   PORT=5000
   DB_HOST=<your-neon-host>
   DB_PORT=5432
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_NAME=sportbike_db
   JWT_SECRET=<generate-secure-secret>
   NODE_ENV=production
   ```

6. Click **"Create Web Service"**

---

## 🗄️ Deploy Database to Neon (PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and sign in
2. Click **"Create Project"**
3. Configure:
   - **Project name:** sport-bike-db
   - **Region:** Choose closest to your users
   - **PostgreSQL version:** Latest

4. **Copy connection string** (you'll need this)

5. **Run migrations:**
   ```bash
   # Install PostgreSQL client if needed
   # Use the connection string from Neon
   
   psql "postgresql://user:pass@host/db?sslmode=require" -f backend/database/schema.sql
   ```

6. **Seed the database:**
   ```bash
   # Update backend/.env with Neon credentials
   cd backend
   npm run seed
   ```

---

## 🔗 Connect Everything

1. **Update Backend .env with Neon database URL**
2. **Deploy backend to Render** (it will give you a URL like: https://sport-bike-backend.onrender.com)
3. **Update frontend .env.production:**
   ```env
   VITE_API_URL=https://sport-bike-backend.onrender.com/api
   ```
4. **Redeploy frontend to Vercel/Netlify**

---

## ✨ Your Live URLs

After deployment, you'll have:

- **Frontend:** https://sport-bike-portfolio.vercel.app
- **Backend:** https://sport-bike-backend.onrender.com
- **Database:** Hosted on Neon
- **GitHub:** https://github.com/KINGFX-BIT/Sport-Bike-Portfolio

---

## 📝 Post-Deployment Checklist

- [ ] Backend is running (test: `https://your-backend-url.com/api/bikes`)
- [ ] Database is seeded with 100+ bikes
- [ ] Frontend can fetch bikes from backend
- [ ] Login/Register works
- [ ] Images are loading
- [ ] Responsive design works on mobile
- [ ] All routes work (check React Router)

---

## 🐛 Troubleshooting

### Frontend can't connect to backend:
- Check VITE_API_URL in environment variables
- Ensure backend CORS allows your frontend domain

### Build fails on Vercel:
- Check Node version (should be 18+)
- Verify all dependencies in package.json
- Check build logs for specific errors

### Database connection fails:
- Verify Neon connection string
- Check if IP whitelist is configured (Neon allows all by default)
- Ensure SSL mode is enabled

---

## 🎉 Quick Deploy Now!

**Fastest way to deploy:**

```bash
# Deploy Frontend to Vercel
cd frontend
vercel --prod

# Your app will be live in 2 minutes! 🚀
```

Then follow the Render and Neon guides for backend and database!

---

**Need help?** Check the main README.md or create an issue on GitHub!
