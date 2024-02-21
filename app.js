import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js";

const select = (selector) => document.querySelector(selector);

const setProperty = (element, property, value) =>
  element.style.setProperty(property, value);

const createAnimationTimeline = (button, offsetX, offsetY) => {
  const animationStartTime = 0;

  const tl = anime.timeline({
    easing: "easeInOutSine",
    autoplay: false,
  });

  tl.add(
    {
      targets: ".projects",
      translateY: [0, 254],
      duration: 800,
      easing: "spring(1, 40, 80, 0)",
    },
    animationStartTime
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
      animationStartTime
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
      animationStartTime + 400
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
      animationStartTime + 400
    )
    .add(
      {
        targets: ".icons img, .info img, .info .button-base",
        translateY: [-8, 0],
        opacity: [0, 1],
        delay: anime.stagger(120),
        duration: 400,
      },
      animationStartTime + 800
    )
    .add(
      {
        targets: ".button-mask",
        duration: 1200,
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
      animationStartTime + 1400
    );

  return tl;
};

const mouseTracking = (button) => (e) => {
  const buttonRect = button.getBoundingClientRect();
  const x = e.clientX - buttonRect.left;
  const y = e.clientY - buttonRect.top;
  setProperty(button, "--mask-x", `${x}px`);
  setProperty(button, "--mask-y", `${y}px`);
};

const startAnimations = (button, offsetX, offsetY) => {
  let animationPlayed = false;
  const tl = createAnimationTimeline(button, offsetX, offsetY);

  return () => {
    if (animationPlayed) {
      tl.seek(0);
      tl.pause();
    } else {
      tl.play();
    }
    animationPlayed = !animationPlayed;
  };
};

const init = () => {
  const page = select(".page");
  const button = select(".button-mask");
  const offsetX = 200;
  const offsetY = 140;

  const handleStartAnimations = startAnimations(button, offsetX, offsetY);
  page.addEventListener("click", handleStartAnimations);
  page.addEventListener("mousemove", mouseTracking(button));
};

init();
