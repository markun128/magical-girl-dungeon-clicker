# 美少女魔法使いダンジョンクリッカー - Windows PowerShell起動スクリプト

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  美少女魔法使いダンジョンクリッカー" -ForegroundColor Magenta
Write-Host "  Windows Docker Desktop 起動スクリプト" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Docker Desktop が起動しているかチェック
Write-Host "Docker Desktop の状態をチェック中..." -ForegroundColor Yellow
try {
    $dockerVersion = docker version --format "{{.Server.Version}}" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Docker Desktop が正常に起動しています。(Version: $dockerVersion)" -ForegroundColor Green
    } else {
        throw "Docker not running"
    }
} catch {
    Write-Host "エラー: Docker Desktop が起動していません。" -ForegroundColor Red
    Write-Host "Docker Desktop を起動してから再度実行してください。" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# 既存のコンテナを停止・削除
Write-Host "既存のコンテナを停止中..." -ForegroundColor Yellow
docker-compose -f docker-compose.windows.yml down

# イメージをビルドして起動
Write-Host "アプリケーションをビルド・起動しています..." -ForegroundColor Yellow
docker-compose -f docker-compose.windows.yml up --build -d

# 起動確認
Write-Host ""
Write-Host "起動状況を確認中..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

docker-compose -f docker-compose.windows.yml ps

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  起動完了！" -ForegroundColor Green
Write-Host "  ブラウザで以下のURLにアクセス:" -ForegroundColor White
Write-Host "  http://localhost:3000" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "コンテナを停止する場合は stop-windows.ps1 を実行してください。" -ForegroundColor White
Write-Host "ログを確認する場合は logs-windows.ps1 を実行してください。" -ForegroundColor White

Read-Host "Press Enter to exit"