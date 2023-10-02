"use strict";

/* common
============================== */
const mediaQuery = window.matchMedia("(min-width: 768px)");

/* mouse-stalker
------------------------------ */
const stalker = document.getElementById("mouse-stalker");
let hovFlag = false;
let stalkerX = 0;
let stalkerY = 0;

document.addEventListener("mousemove", (e) => {
  // if (!hovFlag) {
  stalkerX = e.clientX;
  stalkerY = e.clientY;
  stalker.style.transform = `translate(${stalkerX}px, ${stalkerY}px)`;
  // }
});

const linkElem = document.querySelectorAll(
  'a:not(.no_stick_), button, input, textarea, div[class^="swiper-button-"]'
);
for (let i = 0; i < linkElem.length; i++) {
  linkElem[i].addEventListener("mouseover", (e) => {
    hovFlag = true;
    stalker.classList.add("is-active");

    // let rect = e.target.getBoundingClientRect();
    // let posX = rect.left + rect.width / 2;
    // let posY = rect.top + rect.height / 2;

    // stalker.style.transform = `translate(${posX}px, ${posY}px)`;
  });
  linkElem[i].addEventListener("mouseout", (e) => {
    hovFlag = false;
    stalker.classList.remove("is-active");
    // stalker.style.transform = `translate(${stalkerX}px, ${stalkerY}px)`;
  });
}

/* splash
============================== */

/* background
============================== */
const params__snow = {
  particles: {
    number: {
      value: 100, //この数値を変更すると星の数が増減できる
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#FFFFFF"],
    },
    shape: {
      type: "polygon", //形状は画像を指定
      stroke: {
        width: 0,
        color: ["#FFFFFF"],
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 1, //この数値を小さくするとゆっくりな動きになる
      direction: "none", //下に向かって落ちる
      random: true, //動きはランダム
      straight: true, //動きをとどめない
      out_mode: "out", //画面の外に出るように描写
      bounce: false, //跳ね返りなし
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: true,
    },
  },
  retina_detect: true,
};

particlesJS("particles-js--desc", params__snow);

/* header__drawer
============================== */
particlesJS("drawer-background", params__snow);

const hamburger = $(".hamburger__menu");
const headerNav = $(".header__nav");

hamburger.on("click", function () {
  if (headerNav.hasClass("is-open")) {
    $("body").css("overflowY", "visible");
    $(this).attr("aria-expanded", "false");
  } else {
    $("body").css("overflowY", "hidden");
    $(this).attr("aria-expanded", "true");
  }
  $(
    ".drawer-background, .hamburger__icon, .header__nav, #nav__list"
  ).toggleClass("is-open");

  return false;
});

headerNav.on("click", function () {
  if (headerNav.hasClass("is-open")) {
    $(
      ".drawer-background, .hamburger__icon, .header__nav, #nav__list"
    ).removeClass("is-open");
    $("body").css("overflowY", "visible");
    hamburger.attr("aria-expanded", "false");
  }

  return false;
});

/* fadeIn-animation
------------------------------ */
const fadeInContents = document.querySelectorAll(".js-fadeIn");
const fadeInOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0, //閾値は0から1の範囲で指定し、0は要素が画面に少しでも表示されたとき、1は要素が完全に表示されたときを意味
};

const fadeInCallback = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.style.opacity = 0;
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          translate: ["0 4rem", 0],
        },
        {
          duration: 1000,
          easing: "ease",
          fill: "forwards",
        }
      );
      observer.unobserve(entry.target);
    }
  });
};

const fadeInObserver = new IntersectionObserver(fadeInCallback, fadeInOptions);

fadeInContents.forEach((fadeInContent) => {
  fadeInObserver.observe(fadeInContent);
});

/* desc-swiper
------------------------------ */

const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 7500,
  },
  loop: true,
  effect: "fade",

  navigation: {
    nextEl: ".swiper-button-next", // 「次へ」ボタン要素のクラス
    prevEl: ".swiper-button-prev", // 「前へ」ボタン要素のクラス
  },
});
