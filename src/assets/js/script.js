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

/* スクロール中のhover無効
------------------------------ */
let body = document.body,
  timer;
window.addEventListener(
  "scroll",
  () => {
    clearTimeout(timer);
    if (!body.classList.contains("disable-hover")) {
      body.classList.add("disable-hover");
    }

    timer = setTimeout(() => {
      body.classList.remove("disable-hover");
    }, 500);
  },
  false
);

/* splash
============================== */

/* background
============================== */
// const params__snow = {
//   particles: {
//     number: {
//       value: 100, //この数値を変更すると星の数が増減できる
//       density: {
//         enable: true,
//         value_area: 800,
//       },
//     },
//     color: {
//       value: ['#FFFFFF'],
//     },
//     shape: {
//       type: 'polygon', //形状は画像を指定
//       stroke: {
//         width: 0,
//         color: ['#FFFFFF'],
//       },
//     },
//     opacity: {
//       value: 1,
//       random: true,
//       anim: {
//         enable: true,
//         speed: 1,
//         opacity_min: 0,
//         sync: false,
//       },
//     },
//     size: {
//       value: 1,
//       random: true,
//       anim: {
//         enable: false,
//         speed: 1,
//         size_min: 0.1,
//         sync: false,
//       },
//     },
//     line_linked: {
//       enable: false,
//     },
//     move: {
//       enable: true,
//       speed: 1, //この数値を小さくするとゆっくりな動きになる
//       direction: 'none', //下に向かって落ちる
//       random: true, //動きはランダム
//       straight: true, //動きをとどめない
//       out_mode: 'out', //画面の外に出るように描写
//       bounce: false, //跳ね返りなし
//       attract: {
//         enable: false,
//         rotateX: 600,
//         rotateY: 600,
//       },
//     },
//   },
//   interactivity: {
//     detect_on: 'canvas',
//     events: {
//       onhover: {
//         enable: true,
//         mode: 'bubble',
//       },
//       onclick: {
//         enable: true,
//         mode: 'repulse'
//       },
//       resize: true,
//     },
//   },
//   retina_detect: true,
// };

// particlesJS('particles-js', params__snow);

/* header__drawer
============================== */

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
}, 7000);

/* link
------------------------------ */
const headerNavs = document.querySelectorAll(".nav__link");

headerNavs.forEach((headerNav) => {
  headerNav.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(this);
    const targetId = e.currentTarget.getAttribute("href");
    console.log(targetId);
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
      const link = document.querySelector(`a[href='#${targetSection}']`);
      if (link) {
        link.classList.add("is-active");
      }
    } else {
      const targetSection = entry.target.getAttribute("id");
      const link = document.querySelector(`a[href='#${targetSection}']`);
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
// const fadeInContents = document.querySelectorAll('.js-fadeIn');
// const fadeInOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0, //閾値は0から1の範囲で指定し、0は要素が画面に少しでも表示されたとき、1は要素が完全に表示されたときを意味
// };

// const fadeInCallback = (entries, observer) => {
//   entries.forEach((entry) => {
//     entry.target.style.opacity = 0;
//     if (entry.isIntersecting) {
//       entry.target.animate(
//         {
//           opacity: [0, 1],
//           translate: ['0 4rem', 0],
//         },
//         {
//           duration: 1000,
//           easing: 'ease',
//           fill: 'forwards',
//         }
//       );
//       observer.unobserve(entry.target);
//     }
//   });
// };

// const fadeInObserver = new IntersectionObserver(fadeInCallback, fadeInOptions);

// fadeInContents.forEach((fadeInContent) => {
//   fadeInObserver.observe(fadeInContent);
// });

/* service__modal
------------------------------ */
// let header = $('.header'),
//   speed = 700;

// $('.service__link').on('click', function () {
//   header.stop(true).animate(
//     {
//       top: '-60px',
//     },
//     speed / 3
//   );

//   return false;
// });

// $(window).keyup(function (e) {
//   if (e.keyCode == 27) {
//     header.stop(true).animate(
//       {
//         top: '0',
//       },
//       speed / 3
//     );
//   }

//   return false;
// });

/* service__accordion
------------------------------ */
const serviceButtons = document.querySelectorAll(".service__link");

serviceButtons.forEach((serviceButton) => {
  serviceButton.addEventListener("click", (e) => {
    if (serviceButton.classList.contains("is-open")) {
      serviceButton.classList.remove("is-open");
    } else {
      serviceButton.classList.add("is-open");
    }
  });
});

/* works__swiper
------------------------------ */
const worksSwiper = new Swiper(".works__swiper", {
  loop: true,
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
        required[index].textContent = "OK";
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

/* gsapでのアニメーション
------------------------------ */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".section__ttl").forEach((el, index) => {
  const sectionTtlTl = gsap.timeline({
    scrollTrigger: {
      trigger: sections[index + 1],
      start: "top center",
      end: "",
      scrub: true,
      markers: true
    },
  });
  sectionTtlTl.from(el, {
    x: 100,
    opacity: 0,
    duration: 2,
    ease: "power4.out",
  });
});

const topTtlTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#top",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    // pin: true,
  },
});

topTtlTl.fromTo(
  ".top__ttl",
  {
    opacity: 1,
  },
  {
    opacity: 0.2,
    fontSize: 24,
    y: "-45vh",
    ease: "Power4.out",
  }
);

const headerLogoTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#top",
    start: "top top",
    end: "+=800",
    scrub: true,
  },
});

headerLogoTl.from(
  ".header__logo",
  {
    fontSize: 108,
    y: "46vh",
  },
  {
    fontSize: 24,
    y: 0,
    ease: "Power4.out",
  }
);
