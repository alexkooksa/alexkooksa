gsap.registerPlugin(TextPlugin);

/* document.scrollingElement.scrollTo(0, 0);
document.body.style.overflow = "hidden"; */

var imgLoad = imagesLoaded(document.querySelector(".homepage-intro"));
imgLoad.on("always", function (instance, image) {
  // var result = image.isLoaded ? "loaded" : "broken";
  // console.log("image is " + result + " for " + image.img.src);

  var introTimeline = gsap.timeline({
    /*   onComplete: () => {
      document.body.style.overflow = "auto";
    }, */
  });

  introTimeline.to('[data-gsap-el="greeting"]', { opacity: 1, duration: 0.75 });
  introTimeline.from('[data-gsap-el="greeting"]', { duration: 1.5, text: "" });
  introTimeline.to('[data-gsap-el="mainline-1"]', {
    opacity: 1,
    duration: 0.5,
    y: 0,
  });
  introTimeline.to('[data-gsap-el="mainline-2"]', {
    opacity: 1,
    duration: 0.5,
    y: 0,
  });

  introTimeline.to('[data-gsap-el="secondline"]', {
    opacity: 1,
    duration: 0.5,
  });
  introTimeline.from('[data-gsap-el="secondline"]', {
    duration: 1.25,
    text: "",
  });
  introTimeline.to('[data-gsap-el="secondline"]', {
    duration: 0.5,
    borderBottomWidth: 3,
  });
  introTimeline.to('[data-gsap-el="bg2"]', { opacity: 1, duration: 1 });
  introTimeline.to('[data-gsap-el="bg3"]', { opacity: 1, duration: 1 });
  introTimeline.to("header .wrap", { opacity: 1, duration: 0.5 }, ">-0.5");
  introTimeline.to('[data-gsap-el="footnote"]', {
    opacity: 1,
    duration: 0.5,
    delay: 0.5,
    y: -30,
  });
});
