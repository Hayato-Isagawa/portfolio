'use strict';

$(function () {
    /* common
    ============================== */
    new WOW().init();

    /* loading-animation
    ============================== */
    $(window).on('load', function () {
        $("#invi__splash").delay(3000).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
        $("#invi__splash_logo").delay(3000).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
    });

    /* background-animation
    ============================== */
    particlesJS("invi__particles-js", {
        "particles": {
            "number": {
                "value": 50,//この数値を変更すると星の数が増減できる
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#d6a93a"
            },
            "shape": {
                "type": "polygon",//形状はcircleを指定
                "stroke": {
                    "width": 0
                },
            },
            "opacity": {
                "value": 1,//シェイプの透明度
                "random": true,//シェイプの透明度をランダムにする
                "anim": {
                    "enable": true,//シェイプの透明度をアニメーションさせる
                    "speed": 3,//シェイプの透明度をアニメーションさせる
                    "opacity_min": 0,//透明度の最小値０
                    "sync": false//全てを同時にアニメーションさせない
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
            },
            "move": {
                "enable": true,
                "speed": 120,//この数値を小さくするとゆっくりな動きになる
                "direction": "none",//方向指定なし
                "random": true,//動きはランダムに
                "straight": true,//動きをとどめる
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                },
                "onclick": {
                    "enable": false,
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    /*     front-cover animation
    ------------------------------ */
    function BlurTextAnimeControl() {
        $('.invi__blurTrigger').each(function () { //blurTriggerというクラス名が
            var elemPos = $(this).offset().top - 50;//要素より、50px上の
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight) {
                $(this).addClass('invi__blur');// 画面内に入ったらblurというクラス名を追記
            } else {
                $(this).removeClass('invi__blur');// 画面外に出たらblurというクラス名を外す
            }
        });
    }
    // 画面が読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load', function () {
        setTimeout(function () {
            BlurTextAnimeControl();
        }, 3000)
    });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

    function GlowAnimeControl() {
        $('.invi__glowAnime').each(function () {
            var elemPos = $(this).offset().top - 50;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight) {
                $(this).addClass("invi__glow");

            } else {
                $(this).removeClass("invi__glow");
            }
        });
    }

    $(window).on('load', function () {
        //spanタグを追加する
        var element = $(".invi__glowAnime");
        element.each(function () {
            var text = $(this).text();
            var textbox = "";
            text.split('').forEach(function (t, i) {
                if (t !== " ") {
                    if (i < 10) {
                        textbox += '<span style="animation-delay: .' + i + 's;">' + t + '</span>';
                    } else {
                        var n = i / 10;
                        textbox += '<span style="animation-delay: ' + n + 's;">' + t + '</span>';
                    }

                } else {
                    textbox += t;
                }
            });
            $(this).html(textbox);
        });

        setTimeout(function () {
            GlowAnimeControl();/* アニメーション用の関数を呼ぶ*/
        }, 4000)
    });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

    /* page-home & scrolldown icon
    ------------------------------ */
    const pageHome = $('#page-home');
    const scrollDown = $(".invi__scrolldown4");

    pageHome.hide();
    scrollDown.hide();

    $(window).on("load", function () {
        setTimeout(function () {
            pageHome.fadeIn(1000)
            scrollDown.fadeIn(1000);
        }, 7000);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() + 150 > frontCoverHeight) {
            scrollDown.fadeOut(300)
        } else {
            scrollDown.fadeIn(300)
        }
    });

    /* header__drawer
    ------------------------------ */
    $(".invi__openbtn1").click(function () {//ボタンがクリックされたら

        if ($(".invi__openbtn1").hasClass("active")) {
            $(".invi__openbtn1").removeClass('active');//ボタンの activeクラスを除去し
            $("#invi__g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
            $(".invi__circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
            $("body,html").css("overflow", "auto");
            $("body,html").css("overscroll-behavior", "auto");
            $("#invi__page-top").show();
        } else {
            $(this).addClass('active');//ボタン自身に activeクラスを付与し
            $("#invi__g-nav").addClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
            $(".invi__circle-bg").addClass('circleactive');//丸背景にcircleactiveクラスを付与
            $("body,html").css("overflow", "clip");
            $("body,html").css("overscroll-behavior", "contain");
            $("#invi__page-top").hide();
        }
    });

    /* link
    ------------------------------ */
    $("a[href^='#']").click(function (e) {
        e.preventDefault();

        let id = $(this).attr("href");
        let target = $(id != "#" ? id : "html");
        let position = $(target).offset().top;
        let speed = 800

        $("html, body").animate({
            scrollTop: position
        }, speed);

        $(".invi__openbtn1").removeClass('active');//ボタンの activeクラスを除去し
        $("#invi__g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
        $(".invi__circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
        $("body,html").css("overflow", "auto");
        $("body,html").css("overscroll-behavior", "auto");
        $("#invi__page-top").show();

        return false;
    });

    $("#invi__g-nav").click(function () {
        $(".invi__openbtn1").removeClass('active');//ボタンの activeクラスを除去し
        $("#invi__g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
        $(".invi__circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
        $("body,html").css("overflow", "auto");
        $("body,html").css("overscroll-behavior", "auto");
        $("#invi__page-top").show();
    });

    /* reception-card-anime
    ------------------------------ */
    $.fn.commentCards = function () {

        return this.each(function () {

            var $this = $(this),
                $cards = $this.find('.invi__card'),
                $current = $cards.filter('.invi__card--current'),
                $next;

            $cards.on('click', function () {
                if (!$current.is(this)) {
                    $cards.removeClass('invi__card--current invi__card--out invi__card--next');
                    $current.addClass('invi__card--out');
                    $current = $(this).addClass('invi__card--current');
                    $next = $current.next();
                    $next = $next.length ? $next : $cards.first();
                    $next.addClass('invi__card--next');
                }
            });

            if (!$current.length) {
                $current = $cards.last();
                $cards.first().trigger('click');
            }

            $this.addClass('invi__cards--active');

        })

    };

    $('.invi__cards').commentCards();

    /* countdown
    ------------------------------ */
    const year = new Date().getFullYear();
    const twentyFirstOfDecember = new Date(year, 11, 21, 18, 30).getTime();
    const twentyFirstOfDecemberNextYear = new Date(year + 1, 11, 21, 18, 30).getTime();
    const month = new Date().getMonth();

    // countdown
    let timer = setInterval(function () {

        // get today's date
        const today = new Date().getTime();

        // get the difference
        let diff;
        if (month > 1) {
            diff = twentyFirstOfDecemberNextYear - today;
        } else {
            diff = twentyFirstOfDecember - today;
        }

        // math
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // display
        document.getElementById("invi__timer").innerHTML =
            "<div class=\"invi__days\"> \
      <div class=\"invi__numbers\">" + days + "</div>days</div> \
    <div class=\"invi__hours\"> \
      <div class=\"invi__numbers\">" + hours + "</div>hours</div> \
    <div class=\"invi__minutes\"> \
      <div class=\"invi__numbers\">" + minutes + "</div>minutes</div> \
    <div class=\"invi__seconds\"> \
      <div class=\"invi__numbers\">" + seconds + "</div>seconds</div> \
    </div>";

    }, 1000);


    $(document).ready(function () {
        $(".invi__view_timer").each(function (index, target) {
            var startDate = $(this).attr("data-start-date");
            var endDate = $(this).attr("data-end-date");
            var nowDate = new Date();

            if (startDate) {
                startDate = new Date(startDate);
            } else {
                startDate = nowDate;
            }
            if (endDate) {
                endDate = new Date(endDate);
            }

            if (startDate <= nowDate && (!endDate || nowDate <= endDate)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    /* gallery__swiper
    ------------------------------ */
    // galleryのスクリプト
    const defaultOptions = {
        // ドットインジケーターの表示
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // 前後スライドボタンを表示
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true, // ループの有効化

        grabCursor: true,

        effect: "cards",

        autoHeight: true,

        autoplay: {
            delay: 5000,
        },
    }

    // デフォルトの表示
    const swiper = new Swiper(".invi__card-swiper .invi__swiper-container", {
        ...defaultOptions,
    });

    /* page-top
    ------------------------------ */
    // page-topのスクリプト
    const pageTop = $("#invi__page-top");
    const frontCoverHeight = $("#invi__front-cover").innerHeight();
    const navBtn = $(".invi__openbtn1");

    pageTop.hide();
    navBtn.hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > frontCoverHeight + 150) {
            pageTop.fadeIn(300);
        } else {
            pageTop.fadeOut(300);
        }
    });

    pageTop.click(function () {
        $("body, html").animate({ scrollTop: frontCoverHeight }, 800);
        return false;
    })

    $(window).scroll(function () {
        if ($(this).scrollTop() > frontCoverHeight + 150) {
            navBtn.fadeIn(300);
        } else {
            navBtn.fadeOut(300);
        }
    });
});
