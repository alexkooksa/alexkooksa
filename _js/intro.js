gsap.registerPlugin(TextPlugin);

var introTimeline = gsap.timeline({
  onStart: function () {
    // introTimeline.progress(1);
  },
  onComplete: function () {
    animateH1();
  },
  /*   onStart: function () {
    if (window.scrollY > window.innerHeight) {
      introTimeline.progress(1);
    }
  }, */
});

ScrollTrigger.create({
  trigger: ".homepage-intro",
  start: "top top",
  end: "bottom 40%",
  onLeave: ({}) => introTimeline.timeScale(5),
});

const h1Pt1 = document.querySelector(".h1-pt1");
const h1Pt2 = document.querySelector(".h1-pt2");
const h1Pt3 = document.querySelector(".h1-pt3");

const clonedH1 = document.querySelector(".intro-h1").cloneNode(true);

introTimeline.set(".greeting", {
  opacity: 1,
  scale: 5,
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
    // ease: "bounce.out",
    duration: 0.25,
    rotate: 360,
    y: 0,
    // webkitTextFillColor: '#edfb55'
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
    onComplete: function () {},
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

introTimeline.set(".scroll-arrow", {
  opacity: 1,
  onComplete: function () {
    gsap.from(".scroll-arrow", {
      opacity: 1,
    });
    gsap.to(".scroll-arrow", {
      opacity: 0.2,
      animation: "none",
      color: "#aaa",
      scrollTrigger: {
        trigger: "#projects",
        scrub: 0.5,
        start: "top center",
        end: "+=50",
      },
    });
  },
});

gsap.to(".homepage-intro .wrap", {
  scrollTrigger: {
    pin: true,
    trigger: ".homepage-intro",
    scrub: 0.5,
    start: "top top",
    end: "bottom top",
  },
});

// TODO optimize

const h1Cloned = gsap.utils.toArray(".intro-h1.cloned");

let animateH1 = () => {

  h1Cloned.forEach((el, i) => {
    const compStyles = window.getComputedStyle(el);

    gsap.to(el, {
      marginTop: i == 0 ? '16' : 0,
      marginBottom: 12,
      height: compStyles.getPropertyValue("max-height"),
      scrollTrigger: {
        trigger: el.previousElementSibling,
        scrub: 0.75,
        start: "bottom center",
        end: "+=2em",
      },
    });
  });
};

/*
gsap.to(".intro-h1.cloned.cl1", {
  marginTop: 8,
  height: "0.45em",
  scrollTrigger: {
    trigger: ".intro-h1.initial",
    scrub: 0.75,
    start: "bottom center",
    end: "+=2em",
  },
});

  gsap.to(".intro-h1.cloned.cl2", {
    marginTop: 8,
    height: "0.42em",
    scrollTrigger: {
      trigger: ".intro-h1.cloned.cl1",
      scrub: 0.75,
      start: "bottom center",
      end: "+=2em",
    },
  });
  gsap.to(".intro-h1.cloned.cl3", {
    marginTop: 8,
    height: "0.25em",
    scrollTrigger: {
      trigger: ".intro-h1.cloned.cl2",
      scrub: 0.75,
      start: "bottom center",
      end: "+=2em",
    },
  }); */
