window.initLacak = function () {
  var $form = $('#formLacakAdopsi');
  var $noPengajuan = $('#inputNomorPengajuan');
  var $kodeTracking = $('#inputKodeTracking');
  var $whatsapp = $('#inputWhatsapp');
  var $hasilWrap = $('#hasilTracking');

  $('.sample-ticket-pill').on('click', function () {
    var no = $(this).attr('data-no');
    var trk = $(this).attr('data-trk');

    $noPengajuan.val(no);
    $kodeTracking.val(trk);

    validateField($noPengajuan);
    validateField($kodeTracking);
  });

  function validateField($input) {
    var id = $input.attr('id');
    var val = $input.val().trim();
    var isValid = true;
    var errorMsg = '';

    if (id === 'inputNomorPengajuan') {
      var regexNo = /^ADP-\d{4}-\d{3,4}$/i;
      if (!val) {
        isValid = false;
        errorMsg = 'Nomor pengajuan wajib diisi.';
      } else if (!regexNo.test(val)) {
        isValid = false;
        errorMsg = 'Format harus ADP-YYYY-XXX (Contoh: ADP-2026-001).';
      }
      showFeedback($input, $('#msgNomorPengajuan'), isValid, errorMsg, 'Format nomor pengajuan valid.');
    }

    if (id === 'inputKodeTracking') {
      if (!val) {
        isValid = false;
        errorMsg = 'Kode tracking wajib diisi.';
      } else if (val.length < 6) {
        isValid = false;
        errorMsg = 'Kode tracking minimal 6 karakter alfanumerik.';
      }
      showFeedback($input, $('#msgKodeTracking'), isValid, errorMsg, 'Format kode tracking valid.');
    }

    if (id === 'inputWhatsapp') {
      if (val) {
        var regexWa = /^(08|\+628)[0-9]{8,12}$/;
        if (!regexWa.test(val)) {
          isValid = false;
          errorMsg = 'Format WhatsApp harus diawali 08 atau +628 (10-14 digit).';
        }
        showFeedback($input, $('#msgWhatsapp'), isValid, errorMsg, 'Nomor WhatsApp valid.');
      } else {
        $input.removeClass('is-valid is-invalid');
        $('#msgWhatsapp').empty().removeClass('error success');
      }
    }

    return isValid;
  }

  function showFeedback($input, $msgEl, isValid, errorText, successText) {
    if (isValid) {
      $input.removeClass('is-invalid').addClass('is-valid');
      $msgEl.text(successText).removeClass('error').addClass('success');
    } else {
      $input.removeClass('is-valid').addClass('is-invalid');
      $msgEl.text(errorText).removeClass('success').addClass('error');
    }
  }

  $noPengajuan.on('blur input', function () {
    validateField($(this));
  });

  $kodeTracking.on('blur input', function () {
    validateField($(this));
  });

  $whatsapp.on('blur input', function () {
    validateField($(this));
  });

  $form.on('submit', function (e) {
    e.preventDefault();

    var valid1 = validateField($noPengajuan);
    var valid2 = validateField($kodeTracking);
    var valid3 = validateField($whatsapp);

    if (!valid1 || !valid2 || !valid3) {
      if (!valid1) $noPengajuan.focus();
      else if (!valid2) $kodeTracking.focus();
      else $whatsapp.focus();
      return;
    }

    var postData = {
      nomor_pengajuan: $noPengajuan.val().trim().toUpperCase(),
      kode_tracking: $kodeTracking.val().trim(),
      nomor_whatsapp: $whatsapp.val().trim() || null,
      timestamp: new Date().toISOString()
    };

    $('#btnText').hide();
    $('#btnSpinner').show();
    $('#btnSubmitLacak').prop('disabled', true);

    $.ajax({
      url: 'https://httpbin.org/post',
      method: 'POST',
      data: JSON.stringify(postData),
      contentType: 'application/json',
      timeout: 4000
    }).always(function () {
      $('#btnText').show();
      $('#btnSpinner').hide();
      $('#btnSubmitLacak').prop('disabled', false);

      prosesHasilTracking(postData);
    });
  });

  function prosesHasilTracking(formData) {
    var sampleList = window.dataTracking || [];
    cariDanTampilkan(sampleList, formData);
  }

  function cariDanTampilkan(sampleList, formData) {
    var targetTiket = formData.nomor_pengajuan;
    var targetTracking = formData.kode_tracking;

    var match = sampleList.find(function (item) {
      return item.nomor_pengajuan.toUpperCase() === targetTiket &&
             item.kode_tracking.toUpperCase() === targetTracking.toUpperCase();
    });

    if (match) {
      renderDataTracking(match);
    } else {
      var defaultData = {
        nomor_pengajuan: targetTiket,
        nama_pemohon_masked: formData.nomor_whatsapp ? formData.nomor_whatsapp.substring(0, 4) + '****' : 'Calon Adopter',
        nama_kucing: 'Kucing Kampus UNESA',
        kampus: 'Ketintang / Lidah Wetan',
        tanggal_pengajuan: 'Baru Diajukan',
        status_tahap: 1,
        status_nama: 'Dalam Antrean Verifikasi Reviewer',
        status_badge: 'status-proses',
        catatan_admin: 'Data pengajuan Anda dengan nomor tiket ini telah tersimpan di antrean sistem Jaga Satwa UNESA. Tim admin akan meninjau kelayakan dalam 1-2 hari kerja.',
        timeline: [
          { tahap: 1, judul: 'Pengajuan Masuk', tanggal: 'Hari ini', selesai: true, keterangan: 'Formulir berhasil masuk ke server database MeowNesa.' },
          { tahap: 2, judul: 'Pemeriksaan Dokumen & Hunian', tanggal: 'Menunggu', selesai: false, keterangan: 'Menunggu giliran evaluasi tim verifikator.' },
          { tahap: 3, judul: 'Screening Wawancara', tanggal: 'Menunggu', selesai: false, keterangan: 'Tahapan interview komitmen dan fasilitas.' },
          { tahap: 4, judul: 'Serah Terima Kucing (BAST)', tanggal: 'Menunggu', selesai: false, keterangan: 'Penerbitan berita acara serah terima resmi.' }
        ]
      };
      renderDataTracking(defaultData);
    }
  }

  function renderDataTracking(data) {
    $('#trackNomorTiket').text(data.nomor_pengajuan);
    $('#trackLabelKampus').text('Kampus ' + data.kampus);
    $('#trackNamaKucing').text(data.nama_kucing);
    $('#trackNamaPemohon').text(data.nama_pemohon_masked);
    $('#trackTanggalPengajuan').text(data.tanggal_pengajuan);
    $('#trackCatatanAdmin').text(data.catatan_admin);

    var $badge = $('#trackStatusBadge');
    $badge.text(data.status_nama)
          .removeClass('status-selesai status-proses')
          .addClass(data.status_badge || 'status-proses');

    var stepperHtml = data.timeline.map(function (step, index) {
      var stepClass = '';
      if (step.selesai) {
        stepClass = 'completed';
      } else if (index + 1 === data.status_tahap) {
        stepClass = 'active';
      }

      var iconNode = step.selesai ? '&#10003;' : (index + 1);

      return '' +
        '<div class="step-item ' + stepClass + '">' +
          '<div class="step-node">' + iconNode + '</div>' +
          '<div class="step-content">' +
            '<h5>' + step.judul + '</h5>' +
            '<div class="step-date">' + step.tanggal + '</div>' +
            '<p>' + step.keterangan + '</p>' +
          '</div>' +
        '</div>';
    }).join('');

    $('#trackTimelineStepper').html(stepperHtml);

    $hasilWrap.slideDown(400, function () {
      $('html, body').animate({
        scrollTop: $hasilWrap.offset().top - 90
      }, 500);
    });
  }

  $('#btnResetLacak').on('click', function () {
    $form[0].reset();
    $('.form-control').removeClass('is-valid is-invalid');
    $('.feedback-msg').empty().removeClass('error success');
    $hasilWrap.slideUp(300);
    $('html, body').animate({
      scrollTop: $form.offset().top - 90
    }, 400);
  });
};
