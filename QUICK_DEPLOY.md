# Quick Deploy Script for Render

## Backend is ready! Here's your one-click deployment link:

### Deploy to Render (Click to Deploy):
https://render.com/deploy?repo=https://github.com/KINGFX-BIT/Sport-Bike-Portfolio

---

## OR Manual Steps (Takes 2 minutes):

1. Go to: https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub: KINGFX-BIT/Sport-Bike-Portfolio
4. Settings:
   - Name: sport-bike-backend
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

5. Add Environment Variables (click "Add Environment Variable"):

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://frontend-phi-eight-78.vercel.app
DB_HOST=ep-falling-hall-ai9vrr1n-pooler.c-4.us-east-1.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASSWORD=npg_QaOlvHdZ53Ef
DB_NAME=neondb
JWT_SECRET=SportBike2024SecureJWTSecretKeyMinimum32CharactersLong!!
```

6. Click "Create Web Service"

---

## Your Backend URL will be:
`https://sport-bike-backend-XXXX.onrender.com`

## After Deployment:

Run this to seed your database:
```bash
cd backend
npm run seed
```

Or visit: `https://your-backend-url.onrender.com/api/health`
Should return: `{"status":"OK","message":"Sport Bike API is running"}`

---

## All Set! 🚀
- ✅ Code pushed to GitHub
- ✅ render.yaml configured
- ✅ Database ready on Neon
- ✅ Frontend live on Vercel

Just click "Create Web Service" in Render!
