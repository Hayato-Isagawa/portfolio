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

//CodePenからの引用
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

particlesJS("particles-js", params__snow);

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

/* scrolldown-show
------------------------------ */
const scrollDown = document.querySelector(".scrolldown");

const fadeInKeyframes = {
  opacity: [0, 1],
};

const fadeOutKeyframes = {
  opacity: [1, 0],
};

setTimeout(() => {
  scrollDown.style.display = "block";
  scrollDown.animate(fadeInKeyframes, 1000);
}, 8000);

/* link
------------------------------ */
const headerNavs = document.querySelectorAll(".nav__link");

headerNavs.forEach((headerNav) => {
  headerNav.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.hash;
    const target = document.querySelector(targetId);
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const sections = document.querySelectorAll("section");

const navLinkOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const navLinkCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const targetSection = entry.target.getAttribute("id");
      const link = document.querySelector(`a[href="#${targetSection}"]`);
      if (link) {
        link.classList.add("is-active");
      }
    } else {
      const targetSection = entry.target.getAttribute("id");
      const link = document.querySelector(`a[href="#${targetSection}"]`);
      if (link) {
        link.classList.remove("is-active");
      }
    }
  });
};

const navLinkObserver = new IntersectionObserver(
  navLinkCallback,
  navLinkOptions
);

sections.forEach((section) => {
  navLinkObserver.observe(section);
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

/* about__big-img
------------------------------ */
// const aboutContents = $('.about__contents');

// aboutContents.on('click', function () {
//     let imgSrc = $(this).find('img').attr('data-image');
//     $('.big-img').attr('src', `${imgData}`);
// })

const aboutButtons = document.querySelectorAll(".about__tab");
aboutButtons[0].style.boxShadow = "0 0 10px #76c1ec";
aboutButtons[0].style.filter = "grayscale(0%)";

aboutButtons.forEach((item, index) => {
  item.addEventListener("click", () => {
    let imgSrc = item.querySelector(".about__img").getAttribute("data-image");
    let bigImg = document.getElementById("big-img");
    let bigImgSrc = bigImg.getAttribute("src");
    let bigImgDesc = document
      .getElementById("about__big-img")
      .querySelectorAll("dl");

    aboutButtons.forEach((btn) => {
      btn.removeAttribute("style");
    });
    item.style.boxShadow = "0 0 10px #76c1ec";
    item.style.filter = "grayscale(0%)";

    if (bigImgSrc !== imgSrc) {
      bigImgDesc.forEach(function (item, index) {
        item.style.display = "none";
      });

      bigImg.animate(
        [
          {
            offset: 0.0,
            opacity: 1,
          },
          {
            offset: 0.5,
            opacity: 0,
          },
          {
            offset: 1.0,
            opacity: 1,
          },
        ],
        {
          duration: 100,
          easing: "ease",
          fill: "forwards",
        }
      );
      bigImg.animate(
        [
          {
            offset: 0.0,
            transform: 'scale3d(1, 1, 1)',
          },
          {
            offset: 0.1,
            transform: 'scale3d(1, 1.6, 1)',
          },
          {
            offset: 0.25,
            transform: 'scale3d(1, 0.005, 1)',
          },
          {
            offset: 0.5,
            transform: 'scale3d(0, 0, 1)',
          },
          {
            offset: 0.75,
            transform: 'scale3d(1, 0.005, 1)',
          },
          {
            offset: 0.9,
            transform: 'scale3d(1, 1.6, 1)',
          },
          {
            offset: 1,
            transform: 'scale3d(1, 1, 1)',
          },
        ],
        {
          duration: 500,
          easing: "ease",
          fill: "forwards",
        }
      );

      setTimeout(function () {
        // bigImg.src = imgSrc;
        bigImg.setAttribute("src", `${imgSrc}`);
      }, 300);

      setTimeout(function () {
        bigImgDesc[index].style.display = "block";
      }, 1000);
    }
  });
});

/* service__modal
------------------------------ */
let header = $(".header"),
  speed = 700;

MicroModal.init({
  disableScroll: true,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
});

$(".service__link").on("click", function () {
  header.stop(true).animate(
    {
      top: "-60px",
    },
    speed / 3
  );

  return false;
});

$(".modal__overlay, .modal__container .modal__close").on("click", function () {
  header.stop(true).animate(
    {
      top: "0",
    },
    speed / 3
  );
});

$(window).keyup(function (e) {
  if (e.keyCode == 27) {
    header.stop(true).animate(
      {
        top: "0",
      },
      speed / 3
    );
  }

  return false;
});

/* works__swiper
------------------------------ */
const worksSwiper = new Swiper(".works__swiper", {
  // direction: "horizontal",
  loop: true,
  // autoplay: {
  //   delay: 0,
  // },
  spaceBetween: 10,
  slidesPerView: 1.2,
  speed: 1000,
  effect: "slide",
  parallax: true,

  breakpoints: {
    768: {
      spaceBetween: 20,
      slidePerView: 1.5,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


/* contact__form
------------------------------ */
let required = document.querySelectorAll(".contact__required");
let input = document.querySelectorAll("#js-form input, #js-form textarea");
let inputMessage = document.querySelectorAll(".contact__input");

input.forEach(function (item, index) {
  item.addEventListener("blur", function () {
    checkText(index);

    if (item.value !== "" && checkText(index) === true) {
      required[index].animate(
        [
          {
            transform: "rotateY(0deg)",
          },
          {
            transform: "rotateY(360deg)",
          },
        ],
        {
          duration: 1000,
          easing: "ease",
          fill: "forwards",
        }
      );
      setTimeout(function () {
        required[index].textContent = "OK!!";
        required[index].style.borderColor = "#7fff7d";
      }, 550);
    } else {
      required[index].animate(
        [
          {
            transform: "rotateY(360deg)",
          },
          {
            transform: "rotateY(0deg)",
          },
        ],
        {
          duration: 1000,
          easing: "ease",
          fill: "forwards",
        }
      );
      setTimeout(function () {
        required[index].textContent = "!";
        required[index].style.borderColor = "#ff7a7a";
      }, 550);
    }
  });
});

function checkText(index) {
  switch (index) {
    case 0:
      if (input[0].value.trim().length >= 2) {
        input[0].classList.remove("is-error");
        inputMessage[0].classList.remove("is-error");
        input[0].classList.add("is-success");
        return true;
      } else {
        input[0].classList.remove("is-success");
        input[0].classList.add("is-error");
        inputMessage[0].classList.add("is-error");
        return false;
      }
    case 1:
      /* E-mail形式の正規表現パターン */
      /* @が含まれていて、最後が .(ドット)でないなら正しいとする */
      var pattern = /[!#-9A-~]+@+[a-z0-9]+.+[^.]$/i;
      /* 入力された値がパターンにマッチするか調べる */
      if (input[1].value.match(pattern)) {
        input[1].classList.remove("is-error");
        inputMessage[1].classList.remove("is-error");
        input[1].classList.add("is-success");
        return true;
      } else {
        input[1].classList.remove("is-success");
        input[1].classList.add("is-error");
        inputMessage[1].classList.add("is-error");
        return false;
      }
    case 2:
      if (input[2].value.trim().length >= 10) {
        input[2].classList.remove("is-error");
        inputMessage[2].classList.remove("is-error");
        input[2].classList.add("is-success");
        return true;
      } else {
        input[2].classList.remove("is-success");
        input[2].classList.add("is-error");
        inputMessage[2].classList.add("is-error");
        return false;
      }
  }
}

// let required = $('.contact__required');
// let requiredText = $('.contact__required .required__add');
// let input = $('input, textarea');
// let inputMessage = $('.contact__input');

// input.each(function (index, item) {
//     $(item).on('blur', function () {
//         checkText(index);

//         if ($(item).val() !== '' && checkText(index) === true) {
//             $(required[index]).animate(
//                 {
//                     transform: 'rotateY(720deg)',
//                 },
//                 1000,
//                 'linear'
//             );
//             setTimeout(function () {
//                 $(requiredText[index]).text('OK!!');
//             }, 550);
//         } else {
//             $(required[index]).animate(
//                 {
//                     transform: 'rotateY(360deg)',
//                 },
//                 1000,
//                 'linear'
//             );
//             setTimeout(function () {
//                 $(requiredText[index]).text('必須');
//             }, 550);
//         }
//     });
// });

// function checkText(index) {
//     switch (index) {
//         case 0:
//             if ($(input[0]).val().trim().length >= 2) {
//                 $(input[0]).removeClass('is-error');
//                 $(inputMessage[0]).removeClass('is-error');
//                 $(input[0]).addClass('is-success');
//                 return true;
//             } else {
//                 $(input[0]).removeClass('is-success');
//                 $(input[0]).addClass('is-error');
//                 $(inputMessage[0]).addClass('is-error');
//                 return false;
//             }
//             break;
//         case 1:
//             var pattern = /[!#-9A-~]+@+[a-z0-9]+.+[^.]$/i;
//             if ($(input[1]).val().match(pattern)) {
//                 $(input[1]).removeClass('is-error');
//                 $(inputMessage[1]).removeClass('is-error');
//                 $(input[1]).addClass('is-success');
//                 return true;
//             } else {
//                 $(input[1]).removeClass('is-success');
//                 $(input[1]).addClass('is-error');
//                 $(inputMessage[1]).addClass('is-error');
//                 return false;
//             }
//             break;
//         case 2:
//             if ($(input[2]).val().trim().length >= 10) {
//                 $(input[2]).removeClass('is-error');
//                 $(inputMessage[2]).removeClass('is-error');
//                 $(input[2]).addClass('is-success');
//                 return true;
//             } else {
//                 $(input[2]).removeClass('is-success');
//                 $(input[2]).addClass('is-error');
//                 $(inputMessage[2]).addClass('is-error');
//                 return false;
//             }
//             break;
//     }
// }

let submit = document.getElementById("contact__submit"),
  submitBtn = document.getElementById("js-submit"),
  contactForm = document.getElementById("js-form");

contactForm.addEventListener("change", function () {
  if (
    input[0].value !== "" &&
    checkText(0) === true &&
    input[1].value !== "" &&
    checkText(1) === true &&
    input[2].value !== "" &&
    checkText(2) === true
  ) {
    submit.classList.remove("is-disabled");
    submitBtn.disabled = false;
  } else {
    submit.classList.add("is-disabled");
    submitBtn.disabled = true;
  }
});

let $form = $("#js-form");
let success = $("#js-success");
let error = $("#js-error");

$form.on("submit", function () {
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.fadeOut(500);
        success.fadeIn(2000);
      },
      200: function () {
        //送信に失敗したときの処理
        $form.fadeOut(500);
        error.fadeIn(2000);
      },
    },
  });
  return false;
});
