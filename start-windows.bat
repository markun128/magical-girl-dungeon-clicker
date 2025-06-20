@echo off
echo ===================================
echo   美少女魔法使いダンジョンクリッカー
echo   Windows Docker Desktop 起動スクリプト
echo ===================================
echo.

REM Docker Desktop が起動しているかチェック
echo Docker Desktop の状態をチェック中...
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo エラー: Docker Desktop が起動していません。
    echo Docker Desktop を起動してから再度実行してください。
    pause
    exit /b 1
)

echo Docker Desktop が正常に起動しています。
echo.

REM 既存のコンテナを停止・削除
echo 既存のコンテナを停止中...
docker-compose -f docker-compose.windows.yml down

REM イメージをビルドして起動
echo アプリケーションをビルド・起動しています...
docker-compose -f docker-compose.windows.yml up --build -d

REM 起動確認
echo.
echo 起動状況を確認中...
timeout /t 5 /nobreak >nul

docker-compose -f docker-compose.windows.yml ps

echo.
echo ===================================
echo   起動完了！
echo   ブラウザで以下のURLにアクセス:
echo   http://localhost:3000
echo ===================================
echo.
echo コンテナを停止する場合は stop-windows.bat を実行してください。
echo ログを確認する場合は logs-windows.bat を実行してください。
pause