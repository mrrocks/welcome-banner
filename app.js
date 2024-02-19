import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js";

let animationPlayed = false;

function startAnimations() {
  const bannerAnimationStart = 0;
  const offsetX = 400;
  const offsetY = 140;
  const button = document.querySelector(".button-mask");

  button.style.setProperty("--mask-x", `-${offsetX}px`);
  button.style.setProperty("--mask-y", `-${offsetY}px`);

  anime.remove(
    ".projects, #myRect, .bg, .icons img, .info img, .info .button-base, .button-mask"
  );

  document.querySelector(".page").removeEventListener("click", startAnimations);

  var tl = anime.timeline({
    easing: "easeInOutSine",
    autoplay: false,
  });

  tl.add({
    targets: ".projects",
    translateY: [0, 254],
    duration: 400,
  });

  tl.add(
    {
      targets: "#myRect",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1200,
      opacity: {
        value: [0, 1],
        duration: 300,
      },
    },
    bannerAnimationStart
  );

  tl.add({
    targets: "#myRect",
    opacity: [1, 0.6],
    duration: 600,
  });

  tl.add(
    {
      targets: ".bg",
      opacity: [0, 1],
      translateY: [0, -61],
      translateX: [-60, 0],
      rotate: [-2, 0],
      duration: 2000,
    },
    bannerAnimationStart + 400
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
    bannerAnimationStart + 400
  );

  tl.add(
    {
      targets: ".icons img, .info img, .info .button-base",
      translateY: [-8, 0],
      opacity: [0, 1],
      delay: anime.stagger(120),
      duration: 400,
    },
    bannerAnimationStart + 800
  );

  tl.add(
    {
      targets: ".button-mask",
      duration: 2400,
      update: function (anim) {
        const button = document.querySelector(".button-mask");
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        const progress = anim.progress / 100;
        const valueX = -offsetX + progress * (buttonWidth + offsetX - -offsetX);
        const valueY =
          -offsetY + progress * (buttonHeight + offsetY - -offsetY);

        button.style.setProperty("--mask-x", `${valueX}px`);
        button.style.setProperty("--mask-y", `${valueY}px`);
      },
      complete: function () {
        document.addEventListener("mousemove", function (e) {
          const button = document.querySelector(".button-mask");
          const buttonRect = button.getBoundingClientRect();
          const x = e.clientX - buttonRect.left;
          const y = e.clientY - buttonRect.top;
          button.style.setProperty("--mask-x", `${x}px`);
          button.style.setProperty("--mask-y", `${y}px`);
        });
      },
    },
    bannerAnimationStart + 800
  );

  if (animationPlayed) {
    tl.seek(0);
    tl.pause();
    animationPlayed = false;
  } else {
    tl.play();
    animationPlayed = true;
  }

  document.querySelector(".page").addEventListener("click", startAnimations);
}

document.querySelector(".page").addEventListener("click", startAnimations);
