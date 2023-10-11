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

/* header__drawer
------------------------------ */

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

/* desc-swiper
------------------------------ */
const descSwiper = new Swiper(".desc-swiper", {
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
