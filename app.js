import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js";

const page = document.querySelector(".page");
const button = document.querySelector(".button-mask");

const offsetX = 200;
const offsetY = 140;
const bannerAnimationStart = 0;

let animationPlayed = false;

function startAnimations() {
  button.style.setProperty("--mask-x", `-${offsetX}px`);
  button.style.setProperty("--mask-y", `-${offsetY}px`);

  anime.remove(
    ".projects, #myRect, .bg, .icons img, .info img, .info .button-base, .button-mask"
  );

  page.removeEventListener("click", startAnimations);

  const tl = anime.timeline({
    easing: "easeInOutSine",
    autoplay: false,
    complete: mouseTracking,
  });

  tl.add(
    {
      targets: ".projects",
      translateY: [0, 254],
      duration: 800,
      easing: "spring(1, 40, 80, 0)",
    },
    bannerAnimationStart
  )
    .add(
      {
        targets: "#myRect",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1200,
        opacity: {
          value: [0, 1],
          duration: 800,
        },
      },
      bannerAnimationStart
    )
    .add({
      targets: "#myRect",
      opacity: [1, 0.6],
      duration: 600,
      delay: 200,
    })
    .add(
      {
        targets: ".bg",
        opacity: [0, 1],
        translateY: [0, -61],
        translateX: [-60, 0],
        rotate: [-2, 0],
        duration: 2000,
      },
      bannerAnimationStart + 400
    )
    .add(
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
    )
    .add(
      {
        targets: ".icons img, .info img, .info .button-base",
        translateY: [-8, 0],
        opacity: [0, 1],
        delay: anime.stagger(120),
        duration: 400,
      },
      bannerAnimationStart + 800
    )
    .add(
      {
        targets: ".button-mask",
        duration: 1200,
        begin: function (anim) {
          console.log("begin");
        },

        update: function (anim) {
          const progress = anim.progress / 100;
          const valueX =
            progress * (button.offsetWidth + offsetX * 2) - offsetX;
          const valueY =
            progress * (button.offsetHeight + offsetY * 2) - offsetY;

          button.style.setProperty("--mask-x", `${valueX}px`);
          button.style.setProperty("--mask-y", `${valueY}px`);
        },
      },
      bannerAnimationStart + 1400
    );

  if (animationPlayed) {
    tl.seek(0);
    tl.pause();
    animationPlayed = false;
  } else {
    tl.play();
    animationPlayed = true;
  }

  page.addEventListener("click", startAnimations);
}

const mouseTracking = () => {
  page.addEventListener("mousemove", (e) => {
    const buttonRect = button.getBoundingClientRect();
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;
    button.style.setProperty("--mask-x", `${x}px`);
    button.style.setProperty("--mask-y", `${y}px`);
  });
};

page.addEventListener("click", startAnimations);
