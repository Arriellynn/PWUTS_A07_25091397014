window.pageTemplates = window.pageTemplates || {};
window.pageTemplates.beranda = `
<section class="hero-section">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <span class="hero-tag">Portal Edukasi &amp; Perlindungan Satwa Kampus</span>
        <h1 class="hero-title">Harmoni Hidup Berdampingan Bersama <span>Kucing UNESA</span></h1>
        <p class="hero-desc">
          Pusat informasi edukasi, transparansi tracking pengajuan adopsi, dan kampanye perlindungan satwa kampus terpadu di lingkungan Kampus Ketintang dan Lidah Wetan.
        </p>
        <div class="hero-actions">
          <a href="#artikel" class="btn btn-primary">Baca Artikel &amp; Edukasi</a>
          <a href="#lacak" class="btn btn-outline">Lacak Pengajuan Adopsi</a>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img src="img/brand/cat.png" alt="Maskot Kucing MeowNesa" onerror="this.src='brand/cat.png'">
      </div>
    </div>
  </div>
</section>

<section class="pilar-section">
  <div class="container">
    <div class="section-head">
      <div class="section-eyebrow">
        <span>PILAR PENGELOLAAN SATWA KAMPUS</span>
      </div>
      <h2 class="section-title">Ekosistem Kucing Kampus UNESA Terpadu</h2>
    </div>

    <div class="pilar-grid">
      <div class="pilar-card card-kalung">
        <div>
          <span class="badge-kalung-tag">IDENTITAS &amp; PROTEKSI</span>
          <h3>Bukan Sekadar Aksesoris.<br><span>Kalung Kucing UNESA Menyelamatkan Nyawa.</span></h3>
          <p>
            Setiap kucing asli kampus diberikan kalung dengan material khusus reflektif yang menyala saat tersorot lampu kendaraan malam hari dan menandai status sterilisasi medis.
          </p>
        </div>
        <div class="card-kalung-actions">
          <a href="#artikel" class="btn btn-primary" id="btnFilosofiKalung">Baca Filosofi Kalung</a>
          <button type="button" class="btn btn-warning-outline" id="btnHimbauanKalung">Dilarang Melepas Kalung Kucing</button>
        </div>
      </div>

      <div class="pilar-card card-medis">
        <div>
          <div class="card-medis-header">
            <span class="badge-mitra">Kerjasama Medis</span>
            <span class="est-tag">Est. 2021</span>
          </div>
          <h3>Klinik Nusantara Vet</h3>
          <p>
            Seluruh sterilisasi, vaksinasi Tricat, dan penanganan kucing sakit di bawah pengawasan dokter hewan berpengalaman.
          </p>
        </div>
        <div class="card-medis-pill">
          <span>Mencegah overpopulasi kampus secara etis dan manusiawi.</span>
        </div>
      </div>

      <div class="pilar-card card-wilayah">
        <div>
          <div class="badge-wilayah">WILAYAH TERITORIAL</div>
          <h3>2 Kampus Utama</h3>
          <p>
            Monitoring harian di Fakultas Vokasi, FT, FMIPA, FEB Ketintang, hingga Danau &amp; FBS Lidah Wetan.
          </p>
        </div>
      </div>

      <div class="pilar-card card-adopsi">
        <div>
          <span class="badge-alur">TANPA AKUN DI AWAL</span>
          <h3>Alur Adopsi Terverifikasi &amp; Transparan</h3>
          <p>
            Cukup isi form screening dan pantau perkembangan status verifikasi pengajuan Anda secara mandiri dengan Kode Tracking.
          </p>
        </div>
        <div>
          <a href="#lacak" class="btn btn-accent">Cek Status Pengajuan</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="highlight-section">
  <div class="container">
    <div class="section-head" style="margin-bottom: 24px;">
      <div class="section-eyebrow">
        <span>WAWASAN &amp; PANDUAN</span>
      </div>
      <h2 class="section-title">Artikel Edukasi Terbaru Jaga Satwa</h2>
    </div>

    <div class="highlight-grid">
      <div class="highlight-box">
        <h4>Filosofi Kalung Reflektif</h4>
        <p>Memahami standar keselamatan jalan raya malam hari bagi kucing liar yang berada di teritori kampus UNESA.</p>
        <a href="#artikel" class="btn-read-article">Pelajari lebih lanjut &rarr;</a>
      </div>
      <div class="highlight-box">
        <h4>Program TNR &amp; Steril Medis</h4>
        <p>Mengapa sterilisasi berkala jauh lebih etis dan efektif mengontrol overpopulasi dibanding pembuangan liar.</p>
        <a href="#artikel" class="btn-read-article">Pelajari lebih lanjut &rarr;</a>
      </div>
      <div class="highlight-box">
        <h4>Etika Pemberian Pakan (Feeding)</h4>
        <p>Tips memberi makan kucing di lingkungan kampus tanpa meninggalkan sisa sampah berbau di koridor perkuliahan.</p>
        <a href="#artikel" class="btn-read-article">Pelajari lebih lanjut &rarr;</a>
      </div>
    </div>
  </div>
</section>
`;
