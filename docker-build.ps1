# PowerShell Build script for Docker image

Write-Host "🐋 Building Docker image..." -ForegroundColor Cyan
docker build -t aayush-portfolio:latest .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker image built successfully!" -ForegroundColor Green
    Write-Host "📊 Image details:" -ForegroundColor Yellow
    docker images | Select-String "aayush-portfolio"
} else {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}
