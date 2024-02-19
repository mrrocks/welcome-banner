import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js";

let animationPlayed = false;

function startAnimations() {
  const bannerAnimationStart = 400;

  anime.remove(
    ".projects, #myRect, .bg, .icons img, .info img, .info .button-base"
  );

  var tl = anime.timeline({
    easing: "easeInOutSine",
    autoplay: false,
  });

  tl.add(
    {
      targets: ".projects",
      translateY: [-254, 0],
      duration: 1000,
      easing: "cubicBezier(0.5, 0, 0, 1)",
    },
    0
  );

  tl.add(
    {
      targets: "#myRect",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1600,
      opacity: {
        value: [0, 1],
        duration: 600,
      },
    },
    bannerAnimationStart
  );

  tl.add(
    {
      targets: ".bg",
      opacity: [0, 1],
      translateY: [0, -61],
      translateX: [-60, 0],
      rotate: [-2, 0],
      duration: 2000,
    },
    bannerAnimationStart
  );

  tl.add(
    {
      targets: { irisRadius: 0 },
      irisRadius: [0, 100],
      duration: 2000,
      update: (anim) =>
        document
          .querySelector(".bg")
          .style.setProperty(
            "--iris-radius",
            `${anim.animations[0].currentValue}%`
          ),
    },
    bannerAnimationStart
  );

  tl.add(
    {
      targets: ".icons img, .info img, .info .button-base",
      translateY: [-8, 0],
      opacity: [0, 1],
      delay: anime.stagger(120),
      duration: 400,
    },
    bannerAnimationStart + 200
  );

  if (animationPlayed) {
    tl.seek(0);
    tl.pause();
    animationPlayed = false;
  } else {
    tl.play();
    animationPlayed = true;
  }
}

document.addEventListener("mousemove", function (e) {
  const button = document.querySelector(".button-mask");
  const buttonRect = button.getBoundingClientRect();

  const x = e.clientX - buttonRect.left;
  const y = e.clientY - buttonRect.top;

  button.style.setProperty("--mask-x", `${x}px`);
  button.style.setProperty("--mask-y", `${y}px`);

  button.style.opacity = 1;
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".page").addEventListener("click", startAnimations);
});
