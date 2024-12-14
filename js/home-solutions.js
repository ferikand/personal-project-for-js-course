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

document.addEventListener("click", (e) => {
  let selectedSolution = "business";

  let tagetId = e.target.getAttribute("id");
  if (tagetId === "showerImg") selectedSolution = "shower";
  if (tagetId === "sinkImg") selectedSolution = "sink";
  if (tagetId === "homeImg") selectedSolution = "home";
  if (tagetId === "businessImg") selectedSolution = "business";
  localStorage.setItem("selectedSolution", selectedSolution);
  console.log(localStorage.getItem("selectedSolution"));
});
