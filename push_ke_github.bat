@echo off
title Upload ke GitHub - birthday-surprise
echo ========================================================
echo   Mengunggah Proyek ke:
echo   https://github.com/GilbertNjr/birthday-surprise
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Menyiapkan remote origin GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/GilbertNjr/birthday-surprise.git
git branch -M main

echo [2/4] Menyimpan seluruh perubahan (foto, video, musik, dll)...
git add .
git commit -m "feat: website kejutan ulang tahun lengkap dengan foto dan musik"

echo.
echo [3/4] Mengunggah (push) ke GitHub branch main...
git push -u origin main

echo.
echo ========================================================
echo [SELESAI] Jika muncul 'Everything up-to-date' atau 'branch main set up to track origin/main', artinya berhasil!
echo.
echo Langkah Deploy ke Vercel:
echo 1. Buka https://vercel.com
echo 2. Login dengan akun GitHub Anda (GilbertNjr)
echo 3. Klik "Add New..." -^> "Project"
echo 4. Pilih "birthday-surprise" -^> klik "Import"
echo 5. Klik tombol "Deploy"
echo ========================================================
echo.
pause
