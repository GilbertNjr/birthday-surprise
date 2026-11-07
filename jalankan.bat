@echo off
title Interactive Birthday Surprise World
echo ========================================================
echo   Sedang Menjalankan Website Kejutan Ulang Tahun... 🎂💖
echo ========================================================
echo.
echo Browser akan otomatis terbuka ke: http://localhost:5173
echo (Jangan tutup jendela hitam ini saat sedang membuka website)
echo.

cd /d "%~dp0"
start http://localhost:5173
npm run dev
pause

