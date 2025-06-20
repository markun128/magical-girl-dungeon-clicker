@echo off
echo ===================================
echo   美少女魔法使いダンジョンクリッカー
echo   Windows Docker コンテナ停止
echo ===================================
echo.

echo コンテナを停止しています...
docker-compose -f docker-compose.windows.yml down

echo.
echo コンテナが停止されました。
pause