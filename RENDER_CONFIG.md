# Render Backend Configuration

## Outbound IP Addresses
When connecting to external databases (Neon, Supabase, etc.), whitelist these IPs:

```
74.220.48.0/24
74.220.56.0/24
```

## Environment Variables Required

```bash
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://frontend-phi-eight-78.vercel.app

# Database (get from Neon)
DB_HOST=ep-your-endpoint.region.aws.neon.tech
DB_PORT=5432
DB_USER=your_neon_user
DB_PASSWORD=your_neon_password
DB_NAME=sportbike_db

# JWT Secret (generate random string)
JWT_SECRET=your-super-secure-random-string-here-min-32-chars
```

## Generate JWT Secret

```bash
# On Windows PowerShell
[System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use online generator:
# https://www.grc.com/passwords.htm
```

## Backend URL
After deployment, your backend will be available at:
```
https://sport-bike-backend-XXXX.onrender.com
```

## Health Check
Test if backend is running:
```
https://sport-bike-backend-XXXX.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Sport Bike API is running"
}
```
