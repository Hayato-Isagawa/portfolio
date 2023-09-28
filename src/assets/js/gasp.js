// gsap.registerPlugin(MotionPathPlugin);

// gsap
// gsap.to(".section__ttl", { x: 200, duration: 5, delay: 2, repeat: -1 });
// gsap.to('.service__contents', {x:50, y:50, duration: 10, repeat: -1, yoyo: true, ease: 'power5.out'})
// gsap.from('.service__contents', {x: 100, duration: 5, repeat: -1})
// gsap.fromTo('.service__contents', { x: 0 }, {
//   x: 50, duration: 5, repeat: -1, ease: 'power4.out', stagger: {
//     each: 1,
//     from: 'center',
//     grid: 'auto',
//     ease: 'power4.out'
//   }
// });

// gsap.to('.service__contents', {
//   x: 200,
//   delay: 10,
//   duration: 2,
//   onStart: () => {
//     console.log('start');
//   },
//   onUpdate: () => {
//     console.log('update');
//   },
//   onComplete: () => {
//     console.log('complete');
//   }
// })

// const params = { radian: 0 };

// gsap.to(params, {
//   radian: Math.PI * 2,
//   duration: 10,
//   ease: 'power.out',
//   onUpdate: () => {
//     const { radian } = params;
//     const x = Math.cos(radian) * 100;
//     const y = Math.sin(radian) * 100;
//     gsap.set('.about__contents', { x, y });
//   },
//   repeat: -1,
// })

// const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5})

// tl.to('.service__list>.service__contents:nth-child(1)', { x: 10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(2)', { x: 10, y: 10, duration: 2 }, '<');
// tl.to('.service__list>.service__contents:nth-child(3)', { x: 10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(4)', { x: 10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(5)', { x: 10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(6)', { x: 10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(1)', { x: 0, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(1)', { x: -10, y: 10, duration: 2 }, '-=0.4');
// tl.to('.service__list>.service__contents:nth-child(1)', { x: 0, y: 0, duration: 2 }, '-=0.4');
