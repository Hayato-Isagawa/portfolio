$(function() {
    /*=======================================================================================
    wow
    =======================================================================================*/
    new WOW().init();

    /*=======================================================================================
    link
    =======================================================================================*/
    $("a[href^='#']").click(function(e) {
        e.preventDefault();

        let headerHeight = $(".header").innerHeight();
        let speed = 500;
        let id = $(this).attr("href");
        let target = $("#" === id ? "html" : id);
        let position = $(target).offset().top - headerHeight;

        $("html, body").animate(
            {scrollTop: position}, speed
        );

        if ($(".header__drawer").hasClass("is-active")) {
            $(".header__nav__list, .header__drawer, .drawer__background, body, html").removeClass("is-active");
        }

        return false;
    });

    /*=======================================================================================
    drawer
    =======================================================================================*/
    let drawerIcon = $(".header__drawer__icon");

    drawerIcon.on("click", function() {
        $(".header__nav__list, .header__drawer, .drawer__background, body, html").toggleClass("is-active");
    });

    /*=======================================================================================
    page-top
    =======================================================================================*/
    let pageTop = $("#page-top");

    pageTop.hide();

    $(window).on("scroll", function() {

        if (100 < $(this).scrollTop()) {
            $("#page-top").fadeIn(500);
        } else {
            $("#page-top").fadeOut(500);
        }
    })

    $("#page-top").click(function(e) {
        e.preventDefault();

        $("html, body").animate(
            {scrollTop: 0}, 500
        );

        return false;
    })
    /*=======================================================================================
    swiper
    =======================================================================================*/
    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,

        breakpoints: {
            // 768px以上の場合
            768: {
              spaceBetween: 40,
            },
        },
        // Optional parameters

        autoplay: {
            delay: 5000,
          },
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },

        variableWidth: true,

        infinite: true,

        watchSlidesVisibility: true
    });

    /*=======================================================================================
    accordion
    =======================================================================================*/
    let question = $(".question")

    question.on("click", function(e) {
        e.preventDefault();

        $(this).next().slideToggle();
        $(this).toggleClass("is-open")

    });

    /*=======================================================================================
    form
    =======================================================================================*/
    //↓の$はhtmlの中にあるformと区別するため
    let $form = $("#js-form")
    let success = $("#js-success")
    let error = $("#js-error")

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
              success.slideDown();
            },
            200: function () {
              //送信に失敗したときの処理
              $form.slideUp();
              error.slideDown();
            }
          }
        });
        return false;
    });

    let $submit = $("#js-submit")

    $('#contact__input__name, #contact__input__kana, .contact__checkbox').on("change",function() {

        if ($("#contact__input__name").val() !=="" &&
            $("#contact__input__kana").val() !=="" &&
            $(".contact__checkbox").prop("checked") === true
        ) {
            $submit.removeClass("is-disabled")
            $submit.prop("disable", false)
        } else {
            $submit.addClass("is-disabled")
            $submit.prop("disable", true)
        }
    })
});