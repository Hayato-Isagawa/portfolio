"use strict";

/* common
============================== */
const mediaQuery = window.matchMedia("(min-width: 768px)");

/* splash
============================== */
const splash = document.querySelector("#splash");
const splashText = document.querySelector("#splash__text");
const space = document.querySelector("#space");

var bar = new ProgressBar.Line(splash__text, {
  easing: "easeInOut",
  duration: 2000,
  strokeWidth: 6,
  color: "#fffdf7",
  trailWidth: 3,
  trailColor: "#3e3e3e",
  svgStyle: { width: "80%" },
  text: {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      padding: "0",
      margin: "-50px 0 0 0",
      transform: "translate(-50%, -50%)",
      "font-size": "1.5rem",
      color: "#fffdf7",
      font: "Bruno Ace",
    },
    autoStyleContainer: false,
  },
  step: function (state, bar) {
    bar.setText(Math.round(bar.value() * 100) + "%");
  },
});

bar.text.style.fontFamily = '"Bruno Ace", Helvetica, sans-serif';

bar.animate(1.0, function () {
  const splashFadeOutKeyframes = {
    opacity: [1, 0],
  };
  splashText.animate(splashFadeOutKeyframes, 100).finished.then(() => {
    splashText.style.display = "none";
  });
  window.warp = window.warp == 1 ? 0 : 1;
  executeFrame();
  setTimeout(() => {
    splash.animate(splashFadeOutKeyframes, 300).finished.then(() => {
      splash.style.display = "none";
    });
  }, 1500);
  setTimeout(() => {
    stroke.play();
  }, 3000);
});

//based on an Example by @curran
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame;
})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = "0." + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var centerX, centerY;

var stars = [],
  star;
var i;

var animate = true;

initializeStars();

function executeFrame() {
  if (animate) requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  stars = [];
  for (i = 0; i < numStars; i++) {
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: "0." + Math.floor(Math.random() * 99) + 1,
    };
    stars.push(star);
  }
}

function moveStars() {
  for (i = 0; i < numStars; i++) {
    star = stars[i];
    star.z--;

    if (star.z <= 0) {
      star.z = canvas.width;
    }
  }
}

function drawStars() {
  var pixelX, pixelY, pixelRadius;

  // Resize to the screen
  if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if (warp == 0) {
    c.fillStyle = "rgba(0,10,20,1)";
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
  c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
  for (i = 0; i < numStars; i++) {
    star = stars[i];

    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / star.z);

    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
    //c.fill();
  }
}

executeFrame();

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
      value: [
        "#FFFFFF",
      ],
    },
    shape: {
      type: "polygon", //形状は画像を指定
      stroke: {
        width: 0,
        color: [
          "#FFFFFF",
        ],
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
