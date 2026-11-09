# 🚀 Aryo.dev — Futuristic Interactive Portfolio (Laravel 12)

Website portofolio interaktif dan modern untuk **Aryo Kalimasada**, terinspirasi dari konsep visual futuristik cyber dark space dengan simulasi **3D Lanyard Card (Three.js & WebGL)**, micro-interactions halus, dan fitur backend **Live Guestbook & Contact System**.

---

## 🌟 Fitur Utama

1. **Interactive 3D Lanyard Pass (Three.js & WebGL)**
   * ID card 3D yang dapat ditarik, diayunkan, dan berinteraksi secara fisik dengan kursor/sentuhan layar.
   * Render tekstur holografik dinamis (CanvasTexture) lengkap dengan data pass, avatar, chip sirkuit, dan barcode.
2. **Cyber Dark Space Theme & Neon Glow**
   * Palet warna *deep cosmic dark* (`#050510`) dipadukan dengan tipografi modern (*Space Grotesk*, *JetBrains Mono*, *Inter*).
   * Efek glassmorphism dan border glow ambient yang dinamis.
3. **Animated Hero Section**
   * Dynamic typewriter cycling text yang menampilkan keahlian dan peran.
   * Tombol CTA langsung menuju karya dan form kontak.
4. **Showcase Portofolio Multi-Kategori**
   * **Proyek Unggulan**: Kartu proyek dengan glow neon, tag teknologi, link demo & repository, serta modal pop-up detail proyek.
   * **Keahlian & Stack**: Bar persentase keahlian yang terkelompok (Frontend, Backend, Database, Tools/DevOps).
   * **Sertifikasi & Prestasi**: Pratinjau penghargaan dan sertifikat.
5. **Timeline Pengalaman**
   * Riwayat pendidikan dan pengalaman kerja dengan indikator bercahaya.
6. **Soundtrack Mode (Spotify Embed)**
   * Widget pemutar musik Spotify dengan animasi visualizer equalizer audio.
7. **Buku Tamu Interaktif (Live Guestbook) & Form Kontak**
   * Kolom komentar real-time yang tersimpan di database **SQLite** (Laravel Eloquent).
   * Pengunjung dapat memilih avatar emoji favorit dan mengirimkan pesan tanpa reload halaman (AJAX).
   * Efek selebrasi partikel **Canvas Confetti** saat berhasil mengirim pesan.

---

## 🛠️ Tech Stack

* **Backend Framework**: [Laravel 12](https://laravel.com/) (PHP 8.2+)
* **Database**: SQLite (Zero configuration, instan)
* **Frontend Tooling**: Vite 7 & Tailwind CSS
* **3D & Visual**: Three.js & WebGL
* **Animasi & Interaksi**: Canvas Confetti, CSS Keyframe Animations
* **Icons**: Lucide Icons

---

## 💻 Cara Menjalankan Project

### 1. Jalankan Server Laravel
Buka terminal di direktori proyek:
```bash
php artisan serve
```
Aplikasi akan aktif di `http://127.0.0.1:8000`.

### 2. Jalankan Vite Development Server (Opsional saat mengubah CSS/JS)
Untuk live reload aset frontend saat proses pengembangan:
```bash
npm run dev
```

Untuk mem-build aset produksi:
```bash
npm run build
```

---

## 📂 Struktur Direktori Utama

```
Web-Porto-Aryo/
├── app/
│   ├── Http/Controllers/
│   │   └── PortfolioController.php   # Logika portofolio, kontak & guestbook
│   └── Models/
│       ├── GuestbookMessage.php       # Model buku tamu (dengan accessor waktu relatif)
│       └── ContactMessage.php         # Model pesan kontak
├── database/
│   ├── migrations/                    # Tabel guestbook & contact
│   └── seeders/GuestbookSeeder.php    # Data awal buku tamu
├── resources/
│   ├── css/app.css                    # Styling cyberpunk, glow, dan glassmorphism
│   ├── js/
│   │   ├── app.js                     # Inisialisasi icons, modal, tabs, confetti, AJAX
│   │   └── lanyard-3d.js              # Simulasi fisika 3D Lanyard Card Three.js
│   └── views/
│       ├── layouts/app.blade.php      # Layout utama HTML & ambient glows
│       ├── components/                # Navbar, Footer, Project Modal
│       ├── sections/                  # Hero, About, Portfolio, Experience, Spotify, Contact
│       └── portfolio.blade.php        # Master template
└── routes/web.php                     # Route halaman utama & endpoint API
```
