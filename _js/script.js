console.warn(
  "Maybe check out https://github.com/alexkooksa/kooksa.codes instead of console ;)"
);

document.addEventListener("DOMContentLoaded", function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

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
    header.classList.add("is-visible");
  } else {
    header.classList.remove("is-visible");
  }
}

window.onscroll = function () {
  fixHeader();
};

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
