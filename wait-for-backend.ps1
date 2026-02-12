Write-Host "🔄 Waiting for backend to redeploy..." -ForegroundColor Cyan
Write-Host "Backend: https://sport-bike-portfolio.onrender.com" -ForegroundColor Yellow
Write-Host "`nChecking every 15 seconds...`n" -ForegroundColor Gray

$maxAttempts = 20
$attempt = 0
$deployed = $false

while ($attempt -lt $maxAttempts -and -not $deployed) {
    $attempt++
    Write-Host "[$attempt/$maxAttempts] Checking backend status..." -ForegroundColor White
    
    try {
        $response = Invoke-WebRequest -Uri "https://sport-bike-portfolio.onrender.com/api/health" -TimeoutSec 10 -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            $deployed = $true
            Write-Host "`n✅ BACKEND IS LIVE!" -ForegroundColor Green
            Write-Host "`n📋 Backend Status:" -ForegroundColor Cyan
            Write-Host $response.Content
            Write-Host "`n🎉 Your site is now working!" -ForegroundColor Green
            Write-Host "🔗 Visit: https://frontend-phi-eight-78.vercel.app" -ForegroundColor Yellow
            Write-Host "`n👤 Login with:" -ForegroundColor Cyan
            Write-Host "   Email: admin@sportbikes.com"
            Write-Host "   Password: admin123"
            break
        }
    }
    catch {
        Write-Host "   ⏳ Still deploying..." -ForegroundColor Gray
    }
    
    if ($attempt -lt $maxAttempts) {
        Start-Sleep -Seconds 15
    }
}

if (-not $deployed) {
    Write-Host "`n⚠️  Backend is taking longer than expected" -ForegroundColor Yellow
    Write-Host "`nPlease:" -ForegroundColor White
    Write-Host "1. Check Render dashboard: https://dashboard.render.com" -ForegroundColor Cyan
    Write-Host "2. Look for 'sport-bike-portfolio' service" -ForegroundColor Cyan
    Write-Host "3. Check deployment logs" -ForegroundColor Cyan
    Write-Host "`nIf you see deployment in progress, wait a few more minutes." -ForegroundColor Gray
}

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
