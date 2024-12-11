const setBlockHeights = () => {
  const images = document.querySelectorAll(".bl-box img");
  const upperBlock = document.querySelector(".upper");
  const lowerBlock = document.querySelector(".lower");

  if (images.length >= 4) {
    const imgHeight = images[0].clientHeight;
    const halfHeight = imgHeight / 2;

    upperBlock.style.height = `${halfHeight}px`;
    lowerBlock.style.height = `${halfHeight}px`;
  }
};

setBlockHeights();

window.addEventListener("resize", setBlockHeights);
