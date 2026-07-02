@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "NODE=C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
title LUMA server

echo ============================================
echo   LUMA landing page
echo   URL:  http://localhost:3100/
echo   Keep this window open. Close it to stop.
echo ============================================
echo.

rem --- Free port 3100 if something is already using it ---
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3100 " ^| findstr LISTENING') do (
  echo Freeing port 3100 (PID %%p)...
  taskkill /F /PID %%p >nul 2>&1
)

rem --- Check Node exists ---
if not exist "%NODE%" (
  echo [ERROR] Node not found at:
  echo   %NODE%
  echo.
  pause
  exit /b 1
)

rem --- Open the browser a moment after the server starts ---
start "" /b cmd /c "timeout /t 2 >nul & start "" http://localhost:3100/"

rem --- Run the server in THIS window (foreground) so errors stay visible ---
"%NODE%" preview-server.mjs

echo.
echo Server stopped. Press any key to close.
pause >nul
