@echo off
echo ===================================
echo   美少女魔法使いダンジョンクリッカー
echo   Windows Docker ログ表示
echo ===================================
echo.

echo コンテナのログを表示します...
echo Ctrl+C で終了します。
echo.

docker-compose -f docker-compose.windows.yml logs -f magical-girl-game