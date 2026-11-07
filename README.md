# Interactive Birthday Surprise World 🎂💖

Website kejutan ulang tahun interaktif bernuansa Scrapbook Aesthetic & Pastel dengan melodi musik kotak kado (music box), surat cinta interaktif, galeri foto polaroid, mini game couple, dan grand finale tiup lilin.

---

## 🚀 Cara Menjalankan Project

Buka terminal di folder ini (`c:\Ultah`), lalu jalankan perintah:

```bash
npm run dev
```

Buka URL yang muncul di browser (biasanya `http://localhost:5173`).

---

## 🛠️ Cara Kustomisasi Nama, Foto & Lagu

### 1. Kustomisasi Cepat Langsung di Website
Klik ikon gerigi **"Kustomisasi Kejutan 🛠️"** di pojok kanan atas tampilan saat website berjalan. Anda bisa langsung mengganti:
- Nama panggilan pacar
- Nama pengirim
- Tanggal / label spesial
- Upload file MP3 langsung dari perangkat untuk dicoba

### 2. Memasang File Permanen (Rekomendasi)
Simpan file foto/musik Anda ke folder yang sudah disiapkan:
```
public/
└── assets/
    ├── images/
    │   ├── memories/       <-- Masukkan foto-foto kenangan di sini (misal: photo-1.jpg)
    │   └── gallery/        <-- Masukkan foto spesial penutup (misal: final-special.jpg)
    ├── videos/             <-- Masukkan klip video kenangan (misal: memory-clip.mp4)
    └── music/              <-- Masukkan lagu MP3 favorit kalian (misal: birthday-song.mp3)
```

Lalu sesuaikan path-nya di file `interactive_birthday_surprise_world.tsx` pada bagian `initialBirthdayConfig`.

---

## 📦 Build untuk Diunggah / Online (Vercel / Netlify)

Untuk membuat file siap deploy ke internet:
```bash
npm run build
```
Folder `dist/` siap di-upload ke Vercel, Netlify, atau GitHub Pages secara gratis!

