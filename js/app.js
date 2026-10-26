$(document).ready(function () {
  'use strict';

  var $navToggle = $('#navToggle');
  var $navMenu = $('#navMenu');

  $navToggle.on('click', function () {
    var isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !isExpanded);
    $(this).toggleClass('active');
    $navMenu.toggleClass('active');
  });

  $(document).on('click', '.nav-link', function () {
    $navToggle.removeClass('active').attr('aria-expanded', 'false');
    $navMenu.removeClass('active');
  });

  function parseHash() {
    var rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash) return { page: 'beranda', sub: null };
    if (rawHash === 'donasi') return { page: 'artikel', sub: 'donasiSection' };
    return { page: rawHash, sub: null };
  }

  function renderPageContent(targetPage, html, subTarget) {
    $('#konten').html(html);
    $('.nav-link').removeClass('active');
    $('.nav-link[data-page="' + targetPage + '"]').addClass('active');
    window.scrollTo(0, 0);

    if (targetPage === 'beranda') {
      initBeranda();
    } else if (targetPage === 'artikel' && typeof window.initArtikel === 'function') {
      window.initArtikel(subTarget);
    } else if (targetPage === 'lacak' && typeof window.initLacak === 'function') {
      window.initLacak();
    }
  }

  function loadPage(pageName, subTarget) {
    var validPages = ['beranda', 'artikel', 'lacak'];
    var targetPage = validPages.indexOf(pageName) !== -1 ? pageName : 'beranda';

    $('#konten').html('<div class="spa-loader"><div class="spinner"></div><p>Memuat halaman...</p></div>');

    $.ajax({
      url: 'pages/' + targetPage + '.html',
      method: 'GET',
      dataType: 'html',
      cache: false
    }).done(function (responseHtml) {
      renderPageContent(targetPage, responseHtml, subTarget);
    }).fail(function () {
      if (window.pageTemplates && window.pageTemplates[targetPage]) {
        renderPageContent(targetPage, window.pageTemplates[targetPage], subTarget);
      }
    });
  }

  $(window).on('hashchange', function () {
    var route = parseHash();
    loadPage(route.page, route.sub);
  });

  var initialRoute = parseHash();
  loadPage(initialRoute.page, initialRoute.sub);

  function initBeranda() {
    $('#btnHimbauanKalung').on('click', function () {
      alert(
        'PERINGATAN RESMI JAGA SATWA UNESA:\n\n' +
        'Kalung kucing kampus adalah alat proteksi keselamatan berstandar reflektif jalan raya dan penanda sterilisasi medis.\n\n' +
        'Dilarang melepas atau memindahkan kalung kucing di lingkungan kampus demi keselamatan satwa.'
      );
    });
  }

});
