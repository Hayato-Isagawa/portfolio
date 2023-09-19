// wowのスクリプト
new WOW().init();

// ドロワーのスクリプト
$(document).ready(function () {
  $('.drawer').drawer();
});

$('.drawer').drawer({
  class: {
    nav: 'drawer-nav',
    toggle: 'drawer-toggle',
    overlay: 'drawer-overlay',
    open: 'drawer-open',
    close: 'drawer-close',
    dropdown: 'drawer-dropdown'
  },
  iscroll: {
    // Configuring the iScroll
    // https://github.com/cubiq/iscroll#configuring-the-iscroll
    mouseWheel: true,
    preventDefault: false
  },
  showOverlay: true
});

// リンクスクロールのスクリプト(ドロワーは閉じる)
jQuery('a[href^="#"]').click(function (e) {
  e.preventDefault();

  let headerHeight = jQuery(".header").innerHeight();
  let id = jQuery(this).attr("href");
  let target = jQuery(id != "#" ? id : "html");
  let position = jQuery(target).offset().top - headerHeight;
  let speed = 800

  jQuery("html, body").animate({
    scrollTop: position
  }, speed);

  if (jQuery(".drawer").hasClass("drawer-open")) {
    jQuery('.drawer').drawer("close");
  }

  return false;
});

// $(function () {
//   //始めにjQueryで送信ボタンを無効化する
//   $('.submit').prop("disabled", true);

//   //入力欄の操作時
//   $('form input:required,form textarea:required').change(function () {
//     //必須項目が空かどうかフラグ
//     let flag = true;
//     //必須項目をひとつずつチェック
//     $('form input:required, form textarea:required').each(function (e) {
//       //もし必須項目が空なら
//       if ($('form input:required, form textarea:required').eq(e).val() === "") {
//         flag = false;
//       }
//     });
//     //全て埋まっていたら
//     if (flag) {
//       //送信ボタンを復活
//       $('.submit').prop("disabled", false);
//     }
//     else {
//       //送信ボタンを閉じる
//       $('.submit').prop("disabled", true);
//     }
//   });
// });

let $form = $("#js-form");

$form.submit(function (e) {

  $.ajax({
    url: $form.attr('action'),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp();
        $("#js-success").slideDown();
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp();
        $("#js-error").slideDown();
      }
    }
  });
  return false;
});

let $submit = $("#js-submit");

$("#js-form input, #js-form textarea").on("change", function() {
  if (
    //全ての項目が空じゃないとき
    $('#js-form input[type="text"]').val() !=="" &&
    $('#js-form input[type="email"]').val() !=="" &&
    $('#js-form textarea[name="entry.1821708334"]').val() !=="" &&
    $('#js-form input[name="entry.2064773267"]').prop("checked") === true
  ) {
    $submit.addClass("-active")
    $submit.prop("disable", false)
  } else {
    $submit.removeClass("-active")
    $submit.prop("disable", true)
  }
});