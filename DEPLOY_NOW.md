# 🚀 BACKEND DEPLOYMENT - FINAL STEPS

## ✅ Database Seeded Successfully!

Your Neon PostgreSQL database now has:
- ✅ 11 Brands
- ✅ 2 Sample Bikes (Yamaha YZF-R1M, Kawasaki Ninja H2R)
- ✅ Colors and Images
- ✅ Admin user

**Admin Login:**
- Email: admin@sportbikes.com
- Password: admin123

---

## 🎯 Deploy Backend to Render (3 Minutes)

### Step 1: Create Web Service

1. Go to: https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub repo: `KINGFX-BIT/Sport-Bike-Portfolio`
4. Click "Connect"

### Step 2: Configure Service

**Basic Settings:**
- Name: `sport-bike-backend`
- Region: `Oregon (US West)`
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free`

### Step 3: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add ALL these:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://frontend-phi-eight-78.vercel.app
DB_HOST=ep-falling-hall-ai9vrr1n-pooler.c-4.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASSWORD=npg_QaOlvHdZ53Ef
DB_NAME=neondb
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Copy your backend URL (will be like: `https://sport-bike-backend-xxxx.onrender.com`)

---

## 🔗 Connect Frontend to Backend

Once backend is deployed, run this command (replace with your actual Render URL):

```powershell
# Set environment variable in Vercel
vercel env add VITE_API_URL production
# When prompted, enter: https://sport-bike-backend-xxxx.onrender.com/api
```

Then redeploy frontend:
```powershell
cd frontend
vercel --prod
```

---

## ✅ Test Your Live Site

1. Visit: https://frontend-phi-eight-78.vercel.app
2. You should see bikes loading
3. Try logging in with admin credentials
4. Browse, filter, search bikes

---

## 🎉 COMPLETE!

Your full-stack Sport Bike Portfolio will be:
- ✅ Frontend: Vercel (LIVE)
- ✅ Backend: Render (After deployment)
- ✅ Database: Neon PostgreSQL (LIVE with data)
- ✅ 11 Brands + Bikes ready to view

**Need help?** Check [RENDER_CONFIG.md](RENDER_CONFIG.md) for detailed instructions.
