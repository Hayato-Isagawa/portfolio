"use strict";

/* common
============================== */
const mediaQuery = window.matchMedia("(min-width: 768px)");

/* 慣性スクロール
------------------------------ */
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

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

/* service__card
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

  // breakpoints: {
  //   768: {
  //     spaceBetween: 20,
  //     slidesPerView: 1.5,
  //   },
  // },

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

// mouse-stalker 初期位置
const stalkerTl = gsap
  .timeline()
  .set("#mouse-stalker", { x: 368, y: 498, opacity: 0 })
  .from("#mouse-stalker", { x: 368, y: 498, opacity: 1, delay: 3 });

// header__logo & top__ttl
window.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".header__logo, .top__ttl").forEach((el, index) => {
    const topRect = el.querySelector(".top__rect");
    const headerTopTl = gsap
      .timeline()
      .from(topRect, {
        x: "105%",
        duration: 0.5,
        ease: "power4.out",
        delay: 2,
      })
      .set('.header__logo', {
        color: "#fff",
      })
      .set(".top__ttl", {
        backgroundImage:
          "linear-gradient(163deg, rgba(219, 87, 205, 1), rgba(47, 237, 167, 1))",
        color: "#fff",
        duration: 0.5,
      })
      .to(topRect, {
        x: "105%",
        duration: 0.25,
        ease: "power4.out",
      });
  });
});

// header__logo
const headerLogoTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#top",
      start: "top top",
      end: "+=800",
      scrub: true,
    },
  })
  .from(
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

// section__ttl
gsap.utils.toArray(".section__ttl").forEach((el, index) => {
  const elRect = el.querySelector(".section__rect");
  const sectionTtlTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: sections[index + 1],
        start: "top bottom",
        end: "center center",
        scrub: true,
        // markers: true
      },
    })
    .from(el, {
      y: 70,
      opacity: 0,
      duration: 0.1,
      ease: "power4.out",
    })
    .to(elRect, {
      x: "105%",
      duration: 0.1,
      ease: "power4.out",
    });
});

const conceptBgTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#concept",
      start: "center center",
      // end: 'center center',
      // end: '+=900',
      // scrub: true,
      scrub: 0.5,
      // markers: true,
      // pin: true,
      // pinSpacer: false,
    },
  })
  .to(".concept__bg", {
    y: "50%",
    scale: 0.9,
  });

gsap.utils.toArray(".js-bg").forEach((el, index) => {
  const BgTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "center center",
        end: "bottom center+=100",
        scrub: 1,
        // markers: true,
      },
    })
    .to(el, {
      backgroundPositionY: 2,
    });
});
