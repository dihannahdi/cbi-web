@echo off
REM One-click: download every Google Search Console notification email.
REM Builds on first run, then reuses the compiled binary.
REM
REM Pass flags through, e.g.:  fetch.cmd --days 365 --site centrabiotechindonesia.com

setlocal
cd /d "%~dp0"
title Fetch GSC emails

where cargo >nul 2>&1
if errorlevel 1 (
  echo [!] cargo not found on PATH. Install Rust from https://rustup.rs and retry.
  goto :end
)

if not exist "target\release\gsc-mail.exe" (
  echo Building release binary, first run only...
  cargo build --release
  if errorlevel 1 goto :end
)

target\release\gsc-mail.exe %*

:end
echo.
pause
endlocal
