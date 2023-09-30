// todo "once: true" for batch and scroll trigger

//

gsap.registerPlugin(ScrollTrigger);

console.warn(
  "Maybe check out https://github.com/alexkooksa/portfolio instead of console ;)"
);

// GSAP
gsap.utils.toArray('[data-gsap="opacity"]').forEach((el, i) => {
  gsap.to(el, {
    autoAlpha: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end: "+=100",
      scrub: true,
      // markers: true,
      // toggleClass: "gsap-visible",
      once: true,
      onEnter: () => {
        el.classList.add("gsap-enter");
      },
    },
  });
});

gsap.utils.toArray('[data-gsap-el="section"]').forEach((el, i) => {
  gsap.to(el, {
    y: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      // end: "+=200",
      end: "bottom top",
      // scrub: 1,
      // markers: true,
    },
  });
});

gsap.utils
  .toArray('[data-gsap-el="section-rounded"] section')
  .forEach((el, i) => {
    gsap.to(el, {
      y: 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        // end: "+=200",
        end: "bottom top",
        // scrub: 1,
        // markers: true,
      },
    });
  });

gsap.utils.toArray('[data-gsap="scale"]').forEach((el, i) => {
  gsap.to(el, {
    scale: 1,
    autoAlpha: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      end: "+=100",
      scrub: 1,
      // markers: true,
      once: true,
    },
  });
});

/* gsap.utils.toArray('[data-gsap="bg-reveal"]').forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top bottom 90%",
      toggleClass: "is-visible",
      scrub: 1,
      // markers: true,
    },
  });
}); */

gsap.utils.toArray('[data-gsap="translateY"]').forEach((el, i) => {
  gsap.set(el, {
    y: 30,
  });
  gsap.to(el, {
    y: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end: "+=70",
      scrub: 1,
      // markers: true,
    },
  });
});

ScrollTrigger.batch('[data-gsap="groupTranslateY"] > li', {
  onEnter: (batch) =>
    gsap.to(batch, {
      autoAlpha: 1,
      duration: 0.3,
      stagger: 0.3,
      y: 0,
    }),
  // markers: true,
});

ScrollTrigger.batch('[data-gsap="groupTranslateY"] > div', {
  onEnter: (batch) =>
    gsap.to(batch, {
      autoAlpha: 1,
      duration: 0.3,
      stagger: 0.3,
      y: 0,
    }),
  // markers: true,
});


// coverTimeline start

if (document.querySelector('[data-gsap-el="pageCover"]')) {
  /*   document.scrollingElement.scrollTo(0, 0);
  document.body.style.overflow = "hidden"; */

  var coverTimeline = gsap.timeline({
    /*     onComplete: () => {
      document.body.style.overflow = "auto";
    }, */
  });

  coverTimeline.set('[data-gsap-el="tagList"] li', {
    opacity: 0,
    scale: 0.9,
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
      autoAlpha: 1,
    },
    ">-0.2"
  );

  coverTimeline.set('[data-gsap-el="tagList"]', {
    autoAlpha: 1,
  });

  coverTimeline.to('[data-gsap-el="tagList"] li', {
    autoAlpha: 1,
    delay: 0.2,
    duration: 0.3,
    scale: 1,
    stagger: 0.2,
  });

  coverTimeline.to(
    '[data-gsap-el="coverDate"]',
    {
      autoAlpha: 1,
      duration: 0.3,
      onComplete: function () {
        document
          .querySelector('[data-gsap-el="coverDate"]')
          .classList.add("gsap-complete");
      },
    },
    ">-0.1"
  );

  coverTimeline.to(".case-cover picture", {
    autoAlpha: 1,
  });

  coverTimeline.to(".case-cover video", {
    autoAlpha: 1,
  });
}

// coverTimeline end

// var timeline = gsap.timeline({});

/* timeline.set('[data-gsap="groupTranslateY"] > li', {
  y: 30,
}); */

/* timeline.to('[data-gsap="groupTranslateY"] > li', {
  y: 0,
  stagger: .3,
  duration: 0.5,
 scrollTrigger: {
    trigger: '[data-gsap="groupTranslateY"] > li',
    start: "top center",
    end: "center center",
    markers: true,
  },
}); */

document.addEventListener("DOMContentLoaded", function (event) {
  var videoPlayButtons = document.getElementsByClassName("video__play-button");

  for (var i = 0; i < videoPlayButtons.length; i++) {
    videoPlayButtons[i].onclick = function () {
      video = this.nextElementSibling;
      video_wrapper = this.parentElement;

      // Play video
      if (video.paused == true) {
        // Play the video
        video.play();
        video.setAttribute("data-state", "play");
        video.setAttribute("data-state-reload", "false");
        video_wrapper.setAttribute("data-state", "play");

        setTimeout(() => {
          video_wrapper.classList.add("hide-controls");
        }, 1000);
        video_wrapper.addEventListener("mousemove", (e) => {
          video_wrapper.classList.remove("hide-controls");
        });
        video_wrapper.addEventListener("touchmove", (e) => {
          video_wrapper.classList.remove("hide-controls");
        });

        // Update the button text to 'Pause'
        this.setAttribute("data-button-state", "play");
        this.setAttribute("data-button-state-reload", "false");
      } else {
        // Pause the video
        video.pause();
        video.setAttribute("data-state", "pause");
        video_wrapper.setAttribute("data-state", "pause");
        video_wrapper.classList.remove("hide-controls");

        // Update the button text to 'Play'
        this.setAttribute("data-button-state", "pause");
      }

      // When video is ended
      video.onended = (event) => {
        // Pause the video
        video.setAttribute("data-state", "pause");
        video.setAttribute("data-state-reload", "true");
        video_wrapper.classList.add("hide-controls");

        // Update the button text to 'Play'
        this.setAttribute("data-button-state", "pause");
        this.setAttribute("data-button-state-reload", "true");
      };
    };
  }
});

window.onscroll = function () {
  fixHeader();
};

let body = document.querySelector("body");
let header = document.querySelector(".top-nav");
let firstSectionHeight =
  document.querySelector("header").nextElementSibling.offsetHeight;
let headerHeight = header.offsetHeight;

function fixHeader() {
  if (window.pageYOffset > firstSectionHeight / 2) {
    // so there's no annoying shift caused by the font size changing
    body.style.paddingTop = `${headerHeight}px`;
    header.classList.add("fixed");
  } else {
    body.removeAttribute("style");
    header.classList.remove("fixed");
  }
  if (window.pageYOffset > firstSectionHeight + headerHeight) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
}

// super simple lightbox - for this portfolio purposes only

let lightboxImages = document.querySelectorAll("[data-lightbox]");

let modalElement = (element) => document.querySelector(`.lightbox ${element}`);
let modalPopup = document.querySelector(".lightbox");

lightboxImages.forEach((item) => {
  let zoomButton = document.createElement("button");
  let data = item.querySelector("[data-full-image] picture");

  item.append(zoomButton);
  zoomButton.classList.add("btn-zoom");

  item.addEventListener("click", (e) => {
    body.style.overflow = "hidden";
    e.stopPropagation();
    modalPopup.classList.add("is-visible");

    document.addEventListener("click", () => {
      if (modalPopup.classList.contains("is-visible")) {
        body.removeAttribute("style");
        modalPopup.classList.remove("is-visible");
        modalPopup.querySelector("picture").remove();
      }
    });

    let clonedPicture = data.cloneNode(true);
    modalPopup.querySelector(".wrap").append(clonedPicture);
  });
});

let hiddenJobs = document.querySelectorAll(".timeline-item[hidden]");
if (hiddenJobs.length) {
  document
    .querySelector('[data-btn="show-jobs"]')
    .addEventListener("click", () => {
      hiddenJobs.forEach((el) => {
        el.removeAttribute("hidden");
      });
      document.querySelector('[data-btn="show-jobs"]').remove();
    });
}

// hamburger menu
let menuBtn = document.querySelector('[data-btn="open-menu"]');

let nav = document.querySelector('[data-el="nav"]');
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("is-active");
  nav.classList.toggle("is-visible");
  document.querySelector("body").classList.toggle("blocked");

  document.querySelectorAll(".top-menu__link").forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("is-visible");
      menuBtn.classList.remove("is-active");
      document.querySelector("body").classList.remove("blocked");
    });
  });
});
