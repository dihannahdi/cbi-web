@echo off
REM One-click: download every Google Search Console notification email
REM and build out\DIGEST.md + out\gsc-emails.json + out\raw\*.txt
REM
REM Pass extra flags through, e.g.:  fetch.cmd --days 365 --site centrabiotechindonesia.com

setlocal
cd /d "%~dp0"
title Fetch GSC emails

where py >nul 2>&1
if errorlevel 1 (
  echo [!] Python launcher "py" not found on PATH.
  echo     Install Python 3 from https://www.python.org/downloads/ and retry.
  goto :end
)

py fetch_gsc_emails.py %*

:end
echo.
pause
endlocal
