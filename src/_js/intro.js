gsap.registerPlugin(TextPlugin);
let mm = gsap.matchMedia();

const h1Cloned = gsap.utils.toArray(".intro-h1.cloned");

var introTimeline = gsap.timeline({
  onStart: function () {
    // introTimeline.progress(1);
  },
});

let h1Timeline = gsap.timeline({
  onComplete: function () {
    let pinEnd =
      document.querySelector(".intro-h1.initial").offsetTop +
      document.querySelector(".intro-h1.initial").offsetHeight;
  },
});

mm.add("(min-width: 576px)", () => {
  h1Cloned.forEach((el, i) => {
    const compStyles = window.getComputedStyle(el);

    h1Timeline.to(el, {
      marginTop: i == 0 ? "16" : 0,
      marginBottom: 12,
      height: compStyles.getPropertyValue("max-height"),
      ease: "power4.in",
      scrollTrigger: {
        trigger: el.previousElementSibling,
        scrub: 0.75,
        start: "bottom 55%",
        end: "+=2em",
      },
    });
  });
});

ScrollTrigger.create({
  trigger: "greeting",
  start: "top top",
  end: () => `+=${document.querySelector(".greeting").offsetHeight}`,
  onLeave: ({}) => introTimeline.timeScale(5),
  // markers: true,
});

ScrollTrigger.create({
  trigger: ".homepage-intro .wrap",
  pin: true,
  // scrub: 1,
  start: "top top",
  endTrigger: "#projects",
  end: () =>
    `top ${
      document.querySelector(".intro-h1.initial").offsetTop +
      document.querySelector(".intro-h1.initial").offsetHeight - document.querySelector("header").offsetHeight - 16
    }`,
  animation: h1Timeline,
  // toggleActions: "play reverse none none",
  markers: true,
});

/* ScrollTrigger.create({
  trigger: ".greeting",
  start: () =>
    `top ${document.querySelector(".greeting").offsetTop} + ${
      document.querySelector(".greeting").offsetHeight
    }`,
  end: "bottom 30%",
  animation: h1Timeline,
}); */

const h1Pt1 = document.querySelector(".h1-pt1");
const h1Pt2 = document.querySelector(".h1-pt2");
const h1Pt3 = document.querySelector(".h1-pt3");

introTimeline.set(".greeting", {
  scale: 5,
});
introTimeline.set(".greeting", {
  opacity: 1,
});
introTimeline.set(h1Pt2, {
  rotate: 330,
  y: "-40%",
});

introTimeline.to(".greeting", {
  scale: 1,
  duration: 0.75,
  ease: "bounce.out",
});

introTimeline.to(".homepage-intro .wavy-underline", {
  "--wavyRightPos": 0,
});

introTimeline.to(h1Pt1, {
  duration: 0.5,
  text: h1Pt1.dataset.gsapText,
  ease: "power1.inOut",
});
introTimeline.to(h1Pt2, {
  duration: h1Pt2.dataset.gsapDuration,
  text: h1Pt2.dataset.gsapText,
});
introTimeline.to(
  h1Pt2,
  {
    duration: 0.25,
    rotate: 360,
    y: 0,
    ease: "elastic.out(1,0.3)",
  },
  ">.1"
);

if (h1Pt3 !== null) {
  introTimeline.set(h1Pt3, {
    x: "-50%",
  });

  introTimeline.to(h1Pt3, {
    duration: 1,
    delay: 0.2,
    x: 0,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  });
}

introTimeline.to(
  ".tagline",
  {
    opacity: 1,
    duration: 0.5,
  },
  ">-0.25"
);

introTimeline.from(
  ".tagline span",
  {
    duration: 1.25,
    text: "",
  },
  ">-0.5"
);

introTimeline.to("header .wrap", { opacity: 1, duration: 0.5 }, ">-0.5");

introTimeline.to(".cases-section", { opacity: 1, duration: 0.5 }, ">-0.5");

introTimeline.set(".scroll-arrow", {
  opacity: 1,
  onComplete: function () {
    gsap.from(".scroll-arrow", {
      opacity: 1,
    });
    gsap.to(".scroll-arrow", {
      opacity: 0,
      animation: "none",
      scrollTrigger: {
        trigger: ".tagline",
        scrub: 0.5,
        start: () => `top ${document.querySelector(".tagline").offsetTop}`,
        end: "+=10",
      },
    });
  },
});
