# PWUTS_A07_25091397014

# MeowNesa – Portal Edukasi & Lacak Pengajuan Adopsi Jaga Satwa UNESA

Website tugas **Ujian Tengah Semester (UTS) Pemrograman Web**, Gasal 2026/2027.

| Identitas | Keterangan |
|---|---|
| **Nama** | Reissa Nathania Syahfitri |
| **NIM** | 25091397014 |
| **Kelompok** | A07 (Kelompok 7) |
| **Program Studi** | D4 Manajemen Informatika, Fakultas Vokasi, Universitas Negeri Surabaya |
| **Mata Kuliah** | Pemrograman Web (2 SKS) |
| **Dosen Pengampu** | Ari Kurniawan, S.Kom., M.T. |

---

## 1. Tentang Website

**MeowNesa** adalah platform sistem informasi terpadu komunitas **Jaga Satwa UNESA** yang mengelola ekosistem kucing kampus di **Kampus Ketintang** dan **Kampus Lidah Wetan**.

Modul yang dikerjakan pada proyek ini berfokus pada sisi **Informasi Publik, Edukasi Keselamatan Satwa, dan Transparansi Lacak Pengajuan Adopsi**, yang mencakup:
1. Edukasi masyarakat kampus mengenai fungsi vital kalung reflektif kucing kampus dan program sterilisasi massal bersama mitra medis Klinik Nusantara Vet.
2. Penyediaan artikel panduan etika interaksi satwa kampus serta simulasi dampak donasi pakan.
3. Layanan mandiri bagi pemohon adopsi untuk melacak progres tahapan verifikasi pengajuan mereka secara transparan menggunakan nomor tiket dan kode tracking.

---

## 2. Kesesuaian dengan Soal UTS

| Item Soal | Ketentuan | Pemenuhan pada Sistem | File Terkait |
|---|---|---|---|
| **2.a** | Homepage sebagai layout utama, *responsive web design*, HTML5 + CSS3 murni + JS/jQuery (Tanpa framework Bootstrap). | Layout utama mencakup header sticky dengan navigasi responsif (hamburger menu mobile), container dinamis `#konten`, dan footer lengkap. | `index.html`<br>`css/style.css`<br>`js/app.js` |
| **2.a** | Menu navigasi ke halaman 2.b dan 2.c memakai teknik **Ajax**. | Berpindah halaman memanggil fungsi `loadPage()` berbasis `$.ajax()`, mengubah konten `#konten` tanpa *full page reload*. Mendukung URL hash (`#beranda`, `#artikel`, `#lacak`) dan tombol browser Back/Forward. | `js/app.js` |
| **2.a** | Penggunaan gambar (image) untuk kebutuhan layout dan konten. | Logo resmi MeowNesa, ikon kucing ekspresif, foto ilustrasi, dan badge komunitas Jaga Satwa. | `img/brand/`<br>`img/kucing/` |
| **2.b** | Minimal 1 halaman konten interaktif dengan Javascript/jQuery atau fitur simulasi. | **Pusat Artikel & Edukasi Satwa Kampus**: Dilengkapi live search real-time, filter kategori dinamis, modal popup pembaca artikel, serta **Kalkulator Simulasi Dampak Donasi Pakan**. | `pages/artikel.html`<br>`data/artikel.json` |
| **2.c** | Minimal 1 halaman form sesuai topik yang berelasi dengan tabel database proposal, dengan validasi jQuery sebelum submit ke server HTTP. | **Formulir Lacak Status Pengajuan Adopsi** (berelasi dengan tabel proposal `pengajuan_adopsi`). Dilengkapi validasi client-side regex format tiket, feedback visual valid/invalid, pengiriman `$.ajax` POST ke server HTTP (`httpbin.org`), dan rendering visual stepper progres. | `pages/lacak.html`<br>`data/tracking_sample.json` |
| **2.d** | Tugas mandiri tanpa duplikasi antar anggota kelompok. | Pembagian modul tegas: Ariz mengerjakan Katalog & Form Pengajuan Calon Adopter; Lionel mengerjakan Admin Medis; Reissa mengerjakan Edukasi Publik & Lacak Pengajuan Adopsi. | Seluruh repositori |
| **2.e** | Catatan pengerjaan. | Dokumentasi teknis lengkap ini. | `README.md` |
| **3.b** | Format penamaan folder penyerahan: `PWUTS_<kode_kelompok>_<nim>`. | `PWUTS_A07_25091397014` | – |

---

## 3. Rincian Fitur & Modul

### 3.1 Layout Utama & Navigasi Ajax (Item 2.a)
- Dibangun dengan **HTML5 dan CSS3 native (Grid & Flexbox)** tanpa menggunakan framework CSS eksternal (Bootstrap).
- Header *sticky* dengan logo MeowNesa dan status navigasi aktif.
- Menu navigasi responsif: pada resolusi layar $\le$ 768px, menu otomatis berubah menjadi toggle hamburger yang dapat dibuka-tutup secara mulus.
- Perpindahan halaman (*Single Page Application*) berjalan instan melalui `$.ajax()` GET ke folder `pages/`.

### 3.2 Halaman Beranda (`pages/beranda.html`)
- **Hero Banner:** Memperkenalkan visi perlindungan satwa kampus terpadu.
- **Pilar Pengelolaan Satwa Kampus (Bento-Grid):**
  - *Identitas & Proteksi:* Penjelasan kalung reflektif penanda steril dan keselamatan malam hari, lengkap dengan tombol interaktif peringatan larangan melepas kalung.
  - *Kerjasama Medis:* Rekam jejak kemitraan bersama Klinik Nusantara Vet sejak 2021 dalam program sterilisasi dan penanganan kucing sakit.
  - *Wilayah Teritorial:* Cakupan monitoring rutin di 2 kampus utama (Ketintang dan Lidah Wetan).
  - *Alur Adopsi Terverifikasi:* Tombol cepat menuju fitur pengecekan tiket adopsi.
- **Wawasan & Panduan Pilihan:** Highlight 3 topik edukasi unggulan yang terhubung ke modul artikel.

### 3.3 Halaman Konten Interaktif 2.b (`pages/artikel.html`)
- Data artikel dimuat secara asinkron dari `data/artikel.json`.
- **Live Search Bar:** Penyaringan daftar artikel langsung saat pengguna mengetik judul, ringkasan, atau kata kunci.
- **Category Filter Tabs:** Tombol filter interaktif (*Semua Topik*, *Edukasi Kalung*, *Kesehatan & Steril*, *Etika Interaksi*, *Edukasi Adopsi*).
- **Interactive Modal Reader:** Mengklik kartu artikel memicu jendela *modal pop-up* dengan animasi halus, menampilkan naskah lengkap, identitas penulis, dan poin kunci keselamatan.
- **Kalkulator Simulasi Donasi Pakan:** Pengguna dapat menggeser slider nominal donasi (Rp 10.000 s/d Rp 500.000) untuk melihat perhitungan matematis estimasi kaleng wetfood, kilogram pakan kering, dan jumlah kucing kampus yang tercukupi nutrisinya.
- **Tombol Salin No. Rekening:** Fitur penyalinan nomor rekening bank Jaga Satwa ke *clipboard* dengan notifikasi toast konfirmasi.

### 3.4 Halaman Formulir Transaksi 2.c (`pages/lacak.html`)
Formulir dirancang sesuai dengan struktur entitas tabel `pengajuan_adopsi`:

| Field Formulir | Tipe Input | Aturan Validasi jQuery Client-Side |
|---|---|---|
| `nomor_pengajuan` | Text | Wajib diisi, format regex harus memenuhi pola `^ADP-\d{4}-\d{3,4}$` (contoh: `ADP-2026-001`). Border merah jika salah. |
| `kode_tracking` | Text | Wajib diisi, minimal 6 karakter alfanumerik. |
| `nomor_whatsapp` | Tel | Opsional, jika diisi harus berformat nomor telepon Indonesia valid (10–14 digit, awalan 08/+628). |

**Mekanisme Kerja Validasi & Submit:**
1. Validasi berjalan saat field kehilangan fokus (*blur*) maupun saat sedang diketik (*input*). Field yang valid otomatis mendapatkan border hijau (`.is-valid`), sedangkan field keliru mendapatkan border merah (`.is-invalid`) beserta pesan error spesifik.
2. Saat tombol kirim ditekan, sistem mengevaluasi seluruh input. Jika ada kesalahan, pengiriman dibatalkan dan kursor otomatis diarahkan (*focus*) ke field yang bermasalah.
3. Setelah seluruh field lolos validasi, tombol menampilkan status *loading spinner* dan mengirimkan data via `$.ajax` **POST** ke server HTTP publik (`https://httpbin.org/post`).
4. Data yang diterima kemudian dicocokkan dengan basis data simulasi di `data/tracking_sample.json`.
5. Tampilan hasil lacak dimunculkan ke layar berupa **Visual Timeline Stepper 4 Tahap**:
   - Tahap 1: *Pengajuan Masuk*
   - Tahap 2: *Pemeriksaan Dokumen & Hunian*
   - Tahap 3: *Screening Wawancara*
   - Tahap 4: *Serah Terima Kucing (BAST)*
6. Disediakan tombol jalan pintas *(Sample Ticket Pills)* agar penguji/dosen dapat langsung menguji tanpa perlu mengetik manual.

---

## 4. Struktur Direktori Proyek

```
PWUTS_A07_25091397014/
├── index.html              # Layout utama SPA & navigasi (2.a)
├── css/
│   └── style.css           # Desain CSS3 native (No Bootstrap)
├── js/
│   └── app.js              # Routing Ajax, interaktivitas artikel, validasi form
├── pages/                  # Halaman konten dimuat via Ajax
│   ├── beranda.html        # Konten pilar ekosistem & wawasan
│   ├── artikel.html        # Konten interaktif & simulasi donasi (2.b)
│   └── lacak.html          # Form lacak adopsi & validasi (2.c)
├── data/
│   ├── artikel.json        # Data artikel edukasi satwa kampus
│   └── tracking_sample.json# Data sample status tiket adopsi
├── img/
│   ├── brand/              # Asset visual logo & ikon MeowNesa
│   └── kucing/             # Foto kucing kampus pendukung
└── README.md               # Dokumentasi pengerjaan tugas UTS (2.e)
```

---

## 5. Cara Menjalankan

Karena pemuatan halaman memakai teknik **Ajax** (`$.ajax()`), browser menerapkan kebijakan keamanan *CORS/Same-Origin Policy* jika file dibuka secara langsung lewat protokol `file:///`. Proyek wajib dijalankan menggunakan web server lokal:

### Menggunakan Python (Paling Praktis)
1. Buka Command Prompt / PowerShell di dalam folder proyek ini.
2. Jalankan perintah:
   ```bash
   python -m http.server 8000
   ```
3. Buka browser dan akses alamat:
   ```
   http://localhost:8000
   ```

### Menggunakan VS Code (Live Server)
1. Buka folder proyek di Visual Studio Code.
2. Klik kanan pada file `index.html` lalu pilih **"Open with Live Server"**.
