gsap.registerPlugin(TextPlugin);

var introTimeline = gsap.timeline({
  onStart: function () {
    console.log(window.scrollY, window.innerHeight);
    if (window.scrollY > window.innerHeight) {
      introTimeline.progress(1);
    }
  },
});


introTimeline.to('[data-gsap-el="greeting"]', { opacity: 1, duration: 0.75 });
introTimeline.from('[data-gsap-el="greeting"]', { duration: 1.5, text: "" });
introTimeline.to('[data-gsap-el="mainline-1"]', {
  opacity: 1,
  duration: 1.2,
  fontWeight: 800,
});
introTimeline.to(
  '[data-gsap-el="mainline-2"]',
  {
    opacity: 1,
    duration: 1.5,
    fontWeight: 800,
  },
  ">-0.75"
);

introTimeline.to(
  '[data-gsap-el="tagline"]',
  {
    opacity: 1,
    duration: 0.5,
  },
  ">-0.25"
);

introTimeline.from(
  '[data-gsap-el="tagline"] span',
  {
    duration: 1.25,
    text: "",
  },
  ">-0.5"
);

introTimeline.to(
  '[data-gsap-el="bg2"]',
  {
    opacity: 1,
    duration: 1,
    onStart: () => {
      // document.body.style.overflow = "auto";
      document.querySelector(".homepage-intro").classList.add("no-underlay");
    },
  },
  ">-0.5"
);
introTimeline.to("header .wrap", { opacity: 1, duration: 0.5 }, ">-0.5");
introTimeline.to('[data-gsap-el="bg3"]', { opacity: 1, duration: 1 });
introTimeline.to(
  '[data-gsap-el="buttonNext"]',
  {
    opacity: 1,
  },
  ">-0.5"
);
