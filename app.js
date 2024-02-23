import anime from "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js";

const select = (selector) => document.querySelector(selector);

const getCSSNumericValue = (element, property) =>
  parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;

const setProperty = (element, property, value) =>
  element.style.setProperty(property, value);

const createAnimationTimeline = (
  button,
  offsetX,
  offsetY,
  handleMouseTracking
) => {
  const animationStartTime = 0;

  const tl = anime.timeline({
    easing: "easeInOutSine",
    autoplay: false,
  });

  tl.add(
    {
      targets: ".projects-image",
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
        targets: ".background-image",
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
        targets: {
          irisRadius: getCSSNumericValue(
            select(".background-image"),
            "--iris-radius"
          ),
        },
        irisRadius: 100,
        duration: 2000,
        update: (anim) =>
          setProperty(
            select(".background-image"),
            "--iris-radius",
            `${anim.animations[0].currentValue}%`
          ),
      },
      animationStartTime + 400
    )
    .add(
      {
        targets:
          ".banner-icons img, .banner-info img, .banner-info .interactive-button",
        translateY: [-8, 0],
        opacity: [0, 1],
        delay: anime.stagger(120),
        duration: 400,
      },
      animationStartTime + 800
    )
    .add(
      {
        targets: ".interactive-button-mask",
        duration: 1200,
        update: (anim) => {
          const progress = anim.progress / 100;
          const valueX =
            progress * (button.offsetWidth + offsetX * 2) - offsetX;
          const valueY =
            progress * (button.offsetHeight + offsetY * 2) - offsetY;

          setProperty(button, "--mask-x", `${valueX}px`);
          setProperty(button, "--mask-y", `${valueY}px`);
        },
        complete: () => {
          window.addEventListener("mousemove", handleMouseTracking);
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

  const maskPosition = {
    maskX: getCSSNumericValue(button, "--mask-x"),
    maskY: getCSSNumericValue(button, "--mask-y"),
  };

  anime({
    targets: maskPosition,
    maskX: x,
    maskY: y,
    easing: "linear",
    duration: 50,
    update: () => {
      setProperty(button, "--mask-x", `${maskPosition.maskX}px`);
      setProperty(button, "--mask-y", `${maskPosition.maskY}px`);
    },
  });
};

const startAnimations = (button, offsetX, offsetY) => {
  let animationPlayed = false;
  const handleMouseTracking = mouseTracking(button);
  const tl = createAnimationTimeline(
    button,
    offsetX,
    offsetY,
    handleMouseTracking
  );

  return () => {
    if (animationPlayed) {
      tl.seek(0);
      tl.pause();
      window.removeEventListener("mousemove", handleMouseTracking);
    } else {
      tl.play();
    }
    animationPlayed = !animationPlayed;
  };
};

const init = () => {
  const page = select(".page");
  const button = select(".interactive-button-mask");
  const offsetX = 200;
  const offsetY = 140;

  const handleStartAnimations = startAnimations(button, offsetX, offsetY);
  page.addEventListener("click", handleStartAnimations);
};

init();
