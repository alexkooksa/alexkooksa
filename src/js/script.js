console.warn('Maybe check out https://github.com/alexkooksa/portfolio instead of console ;)')

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

        // Update the button text to 'Pause'
        this.setAttribute("data-button-state", "play");
        this.setAttribute("data-button-state-reload", "false");
      } else {
        // Pause the video
        video.pause();
        video.setAttribute("data-state", "pause");
        video_wrapper.setAttribute("data-state", "pause");

        // Update the button text to 'Play'
        this.setAttribute("data-button-state", "pause");
      }

      // When video is ended
      video.onended = (event) => {
        // Pause the video
        video.setAttribute("data-state", "pause");
        video.setAttribute("data-state-reload", "true");

        // Update the button text to 'Play'
        this.setAttribute("data-button-state", "pause");
        this.setAttribute("data-button-state-reload", "true");
      };
    };
  }
});

gsap.registerPlugin(ScrollTrigger);

/* gsap.to('[data-gsap="letterspace"]', {
letterSpacing: "0.05em",
  scrollTrigger: {
    trigger: '[data-gsap="letterspace"]',
    start: "top center",
    scrub: 1
  }
}); */
gsap.utils.toArray('[data-gsap="opacity"]').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    scrollTrigger: {
      trigger: el,
      start: "top bottom 85%",
      end: "+=300",
      scrub: 1,
      // markers: true,
    },
  });
});

gsap.utils.toArray('[data-gsap="scale"]').forEach((el, i) => {
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    // stagger: 1,
    // delay: i*2,
    // delay: el.data('delay') !== undefined ? i+100 : 0,
    scrollTrigger: {
      trigger: el,
      start: "top bottom 85%",
      end: "+=100",
      scrub: 1,
      // markers: true,
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
  gsap.to(el, {
    translateY: 0,
    scrollTrigger: {
      trigger: el,
      start: "top bottom 85%",
      end: "+=70",
      scrub: 1,
      // markers: true,
    },
  });
});

gsap.to('[data-gsap="groupTranslateY"]', {
  translateY: 0,
  stagger: 0.5,
  scrollTrigger: {
    trigger: '[data-gsap="groupTranslateY"]',
    start: "top bottom 85%",
    end: "+=70",
    scrub: 1,
    // markers: true,
  },
});

gsap.to('[data-gsap="groupOpacity"]', {
  opacity: 1,
  stagger: 1,
  scrollTrigger: {
    trigger: '[data-gsap="groupOpacity"]',
    start: "top bottom 85%",
    end: "+=70",
    scrub: 1,
    // markers: true,
  },
});

/* gsap.utils.toArray('[data-gsap="section-overlap"]').forEach(section => {
  gsap.fromTo(section, {
      // autoAlpha: 0,
      y: 0
    }, {
    scrollTrigger: {
      trigger: section,
      // once: true,
      markers: true,
      start: "top bottom 90%",
      toggleActions: "play pause reverse reverse"
    },
    duration: .35,
    autoAlpha: 1,
    y: -50
  });
}); */

/* imagesLoaded( document.querySelector('body'), function( instance ) {
  console.log('all images are loaded');
  ScrollTrigger.refresh()
}); */

/* let autoplay_videos = gsap.utils.toArray("[data-gsap-autoplay]");

autoplay_videos.forEach(function (video, i) {
  console.log(video)
  ScrollTrigger.create({
    trigger: video,
    scroller: "body",
    start: "top center",
    end: "bottom center",
    markers: true,
    onEnter: () => video.play(),
    onEnterBack: () => video.play(),
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
}); */

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
  let data = item.querySelector("picture");

  item.append(zoomButton);
  zoomButton.classList.add("btn-zoom");

  item.addEventListener("click", (e) => {
    body.style.overflow = "hidden";
    e.stopPropagation();
    modalPopup.classList.add("is-visible");

    let clonedPicture = data.cloneNode(true);
    modalPopup.querySelector(".wrap").append(clonedPicture);

    document.addEventListener("click", () => {
      body.removeAttribute("style");
      modalPopup.classList.remove("is-visible");
      modalPopup.querySelector("picture").remove();
    });
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
