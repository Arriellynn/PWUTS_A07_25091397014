window.initArtikel = function (subTarget) {
  var $container = $('#artikelContainer');
  var $emptyState = $('#emptyArtikel');
  var activeFilter = 'all';
  var searchQuery = '';
  var list = window.dataArtikel || [];

  function checkSubScroll() {
    if (subTarget === 'donasiSection') {
      setTimeout(function () {
        var el = document.getElementById('donasiSection');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  function renderArtikelList() {
    var filtered = list.filter(function (item) {
      var matchCategory = (activeFilter === 'all') || (item.kategori.toLowerCase() === activeFilter.toLowerCase());
      var matchSearch = searchQuery === '' ||
        item.judul.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.ringkasan.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.kategori.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      $container.hide();
      $emptyState.show();
    } else {
      $emptyState.hide();
      $container.show();

      var htmlCards = filtered.map(function (art) {
        return '' +
          '<article class="artikel-card" data-id="' + art.id + '">' +
            '<div class="artikel-thumb">' +
              '<img src="' + art.gambar + '" alt="' + art.judul + '" onerror="this.src=\'brand/head.png\'">' +
            '</div>' +
            '<div class="artikel-body">' +
              '<span class="artikel-category">' + art.kategori + '</span>' +
              '<h3 class="artikel-title">' + art.judul + '</h3>' +
              '<p class="artikel-summary">' + art.ringkasan + '</p>' +
              '<div class="artikel-meta">' +
                '<span>' + art.tanggal + '</span>' +
                '<button type="button" class="btn-read-article btn-open-modal" data-id="' + art.id + '">' +
                  'Baca Artikel &rarr;' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</article>';
      }).join('');

      $container.html(htmlCards);
    }
  }

  renderArtikelList();
  checkSubScroll();

  $('#kategoriFilters').on('click', '.filter-btn', function () {
    $('#kategoriFilters .filter-btn').removeClass('active');
    $(this).addClass('active');
    activeFilter = $(this).attr('data-filter');
    renderArtikelList();
  });

  $('#inputCariArtikel').on('input', function () {
    searchQuery = $(this).val().trim();
    renderArtikelList();
  });

  $('#btnResetSearch').on('click', function () {
    $('#inputCariArtikel').val('');
    searchQuery = '';
    $('#kategoriFilters .filter-btn[data-filter="all"]').trigger('click');
  });

  $(document).off('click', '.btn-open-modal').on('click', '.btn-open-modal', function (e) {
    e.preventDefault();
    var articleId = parseInt($(this).attr('data-id'), 10);
    var article = list.find(function (item) { return item.id === articleId; });

    if (article) {
      $('#modalBadgeKategori').text(article.kategori);
      $('#modalJudulArtikel').text(article.judul);
      $('#modalMetaArtikel').text('Penulis: ' + article.penulis + ' | Tanggal: ' + article.tanggal);

      var paragrafHtml = article.konten_lengkap.map(function (p) { return '<p>' + p + '</p>'; }).join('');
      $('#modalParagraf').html(paragrafHtml);

      var poinHtml = article.poin_kunci.map(function (pt) { return '<li>' + pt + '</li>'; }).join('');
      $('#modalPoinKunci').html(poinHtml);

      $('#modalArtikel').css('display', 'flex');
      $('body').css('overflow', 'hidden');
    }
  });

  $('#btnTutupModal, #modalArtikel').on('click', function (e) {
    if (e.target === this) {
      $('#modalArtikel').hide();
      $('body').css('overflow', 'auto');
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('#modalArtikel').is(':visible')) {
      $('#modalArtikel').hide();
      $('body').css('overflow', 'auto');
    }
  });

  $('#btnSalinRekening').on('click', function () {
    var rekening = $('#nomorRekening').text().replace(/-/g, '').trim();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rekening).then(showToast);
    } else {
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val(rekening).select();
      document.execCommand('copy');
      $temp.remove();
      showToast();
    }

    function showToast() {
      $('#toastSalin').fadeIn(200).delay(2200).fadeOut(300);
    }
  });

  $('#sliderDonasi').on('input', function () {
    var val = parseInt($(this).val(), 10);
    var formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);

    $('#labelNominalDonasi').text(formatted);

    var deskripsi = '';
    if (val < 25000) {
      deskripsi = 'Donasi <strong>' + formatted + '</strong> setara dengan <strong>1 Kaleng Wetfood Nutrisi</strong>, cukup untuk porsi makan <strong>2-3 kucing kampus</strong> selama 1 hari.';
    } else if (val < 75000) {
      deskripsi = 'Donasi <strong>' + formatted + '</strong> setara dengan <strong>2 Kaleng Wetfood + 1 kg Dryfood</strong>, mencukupi porsi makan <strong>5-6 kucing</strong> selama 2 hari.';
    } else if (val < 150000) {
      deskripsi = 'Donasi <strong>' + formatted + '</strong> setara dengan <strong>1 Sak Pakan Kering (3 kg) + Obat Cacing</strong>, mencukupi makan <strong>10 kucing</strong> selama 4 hari patroli.';
    } else if (val < 300000) {
      deskripsi = 'Donasi <strong>' + formatted + '</strong> setara dengan <strong>1 Sak Pakan Kering (5 kg) + Vitamin Imun</strong>, menyuplai kebutuhan <strong>15 kucing terdata</strong> selama 1 minggu penuh.';
    } else {
      deskripsi = 'Donasi <strong>' + formatted + '</strong> dapat mendanai <strong>1 Paket Sterilisasi Medis Lengkap</strong> di Klinik Nusantara Vet, mencegah overpopulasi kucing kampus secara etis seumur hidup.';
    }

    $('#teksEstimasiPakan').html(deskripsi);
  });
};
