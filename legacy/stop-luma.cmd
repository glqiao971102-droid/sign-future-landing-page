@echo off
chcp 65001 >nul
echo Stopping LUMA server on port 3100...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3100 " ^| findstr LISTENING') do taskkill /F /PID %%p >nul 2>&1
echo Done.
timeout /t 2 >nul
