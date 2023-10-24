gsap.registerPlugin(ScrollTrigger);
const min576 = window.matchMedia("(min-width: 576px)");
const isLandscape =
  screen.orientation.type == "landscape-primary" ||
  screen.orientation.type == "landscape-secondary";
// GSAP ... probably needs some optimization later

ScrollTrigger.defaults({
  // once: true,
  scrub: 1,
});

const gsapOpacity = gsap.utils.toArray('[data-gsap="opacity"]');
if (gsapOpacity.length) {
  gsapOpacity.forEach((el, i) => {
    gsap.to(el, {
      autoAlpha: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        end: "+=100",
        /* onEnter: () => {
            el.classList.add("gsap-enter");
          }, */
      },
    });
  });
}

/* const gsapSections = gsap.utils.toArray(
    '[data-gsap-el="section"], section.border-top, [data-gsap-el="section-rounded"]'
  );

  if (gsapSections.length) {
    gsapSections.forEach((el, i) => {
      gsap.to(el, {});
      gsap.to(el, {
        y: -40,
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 40%",
          scrub: true,
        },
      });
    });
  } */

const gsapScale = gsap.utils.toArray(
  '[data-gsap="scale"], .block-image picture'
);

if (gsapScale.length) {
  gsapScale.forEach((el, i) => {
    gsap.set(el, {
      scale: 0.8,
      autoAlpha: 0,
    });

    gsap.to(el, {
      scale: 1,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: el,
        scrub: 1,
        start: "top 90%",
        end: "top 80%",
        once: true
      },
    });
  });
}

const gsapCallout = gsap.utils.toArray(".callout");

if (gsapCallout.length) {
  gsapCallout.forEach((el, i) => {
    gsap.set(el, {
      scale: 0.9,
      rotate: -2,
    });

    gsap.to(el, {
      scale: 1,
      rotate: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "+=200",
      },
    });
  });
}

const gsapBgText = gsap.utils.toArray(".bg-text");
if (gsapBgText.length) {
  gsapBgText.forEach((el, i) => {
    gsap.to(el, {
      backgroundPositionX: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "+=200",
      },
    });
  });
}

const gsapWavy = gsap.utils.toArray(".wavy-underline:not(.no-scroll)");
if (gsapWavy.length) {
  gsapWavy.forEach((el, i) => {
    gsap.to(el, {
      "--wavyRightPos": 0,
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "+=10",
      },
    });
  });
}

const gsapTranslateY = gsap.utils.toArray('[data-gsap="translateY"]');

if (gsapTranslateY.length) {
  gsapTranslateY.forEach((el, i) => {
    gsap.set(el, {
      y: 30,
    });
    gsap.to(el, {
      duration: 0.5,
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });
  });
}

const gsapScreensGrid = gsap.utils.toArray(
  ".screens-grid-2 .grid-item, .mobile-screens .grid-item"
);

if (gsapScreensGrid.length) {
  gsap.set(gsapScreensGrid, {
    opacity: 0,
    y: 40,
  });

  ScrollTrigger.batch(gsapScreensGrid, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.3,
        y: 0,
      }),
  });
}

const gsapBullets = gsap.utils.toArray('[data-gsap-el="bulletedList"] li');

if (gsapBullets.length) {
  gsap.set(gsapBullets, {
    autoAlpha: 0,
    y: 10,
  });

  ScrollTrigger.batch(gsapBullets, {
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.3,
        y: 0,
      }),
  });
}

const gsapGroupTranslateY = gsap.utils.toArray(
  '[data-gsap="groupTranslateY"], .stats-grid__item'
);

if (gsapGroupTranslateY.length) {
  if (document.querySelectorAll(".stats-grid__item").length) {
    gsap.set(".stats-grid__item", {
      autoAlpha: 0,
      y: 20,
    });
  }
  ScrollTrigger.batch(gsapGroupTranslateY, {
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        duration: 0.3,
        stagger: 0.3,
        y: 0,
      }),
  });
}

const gsapTextBlock = gsap.utils.toArray(".text-block > *");

if (gsapTextBlock.length) {
  gsapTextBlock.forEach((el, i) => {
    gsap.set(el, {
      autoAlpha: 0,
      y: 20,
    });
  });

  ScrollTrigger.batch(gsapTextBlock, {
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        duration: 0.3,
        stagger: 0.3,
        y: 0,
      }),
  });
}

// coverTimeline start

if (isLandscape && document.querySelector('[data-gsap-el="pageCover"]')) {
  var coverTimeline = gsap.timeline({
    /*     onComplete: () => {}, */
  });

  ScrollTrigger.create({
    trigger: '[data-gsap-el="pageCover"]',
    start: "top top",
    end: "bottom 40%",
    // markers: true,
    onLeave: ({}) => coverTimeline.timeScale(5),
  });

  coverTimeline.to('[data-gsap-el="coverTitle"]', {
    autoAlpha: 1,
    delay: 0.2,
    fontWeight: 600,
    duration: 1.2,
  });

  coverTimeline.to(
    '[data-gsap-el="coverDesc"]',
    {
      duration: 0.3,
      autoAlpha: 1,
    },
    ">-0.5"
  );

  if (document.querySelectorAll('[data-gsap-el="tagList"]').length) {
    coverTimeline.set('[data-gsap-el="tagList"] li', {
      opacity: 0,
      scale: 0.9,
    });

    coverTimeline.set('[data-gsap-el="tagList"]', {
      autoAlpha: 1,
    });

    coverTimeline.to(
      '[data-gsap-el="tagList"] li',
      {
        autoAlpha: 1,
        // delay: 0.2,
        duration: 0.2,
        scale: 1,
        stagger: 0.2,
      },
      ">-0.1"
    );
  }

  if (document.querySelectorAll('[data-gsap-el="coverDate"]').length) {
    coverTimeline.to('[data-gsap-el="coverDate"]', {
      autoAlpha: 1,
      duration: 0.3,
      onComplete: function () {
        document
          .querySelector('[data-gsap-el="coverDate"]')
          .classList.add("gsap-complete");
      },
    });
  }

  const gsapCoverMedia = gsap.utils.toArray(
    ".case-cover picture, .case-cover video"
  );

  if (gsapCoverMedia.length) {
    gsapCoverMedia.forEach((el, i) => {
      gsap.set(el, {
        transformOrigin: "top center",
        scale: 0.7,
        y: -20,
      });
      coverTimeline.to(el, {
        autoAlpha: 1,
      });
      gsap.to(el, {
        scale: 1,
        scrollTrigger: {
          trigger: ".case-intro",
          scrub: 0.5,
          start: "top 100",
          end: "bottom 30%",
          // markers: true,
        },
      });
    });
  }
}

// coverTimeline end
