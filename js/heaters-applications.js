// import { productBigImgContainer, productInfoText } from "./product";

const variantBtns = document.querySelectorAll(".variantBtn");
const showerBtn = document.querySelector(".showerBtn");
const sinkBtn = document.querySelector(".sinkBtn");
const homeBtn = document.querySelector(".homeBtn");
const businessBtn = document.querySelector(".businessBtn");

const appImg = document.querySelector(".appImg");

const heatersPage = document.querySelector("#heatersPage");

const hotapEl = document.querySelector(".hotapEl");
const basicEl = document.querySelector(".basicEl");
const inline5KWEl = document.querySelector(".inline5KWEl");
const inline7KWEl = document.querySelector(".inline7KWEl");

const applPage = document.querySelector(".applPage");

variantBtns.forEach((node) => {
  node.addEventListener("click", (e) => {
    e.preventDefault();
    // heatersPage.classList.remove("hidden");
    // applPage.classList.toggle("hidden");

    if (e.target === showerBtn) {
      hotapEl.classList.add("hidden");
      basicEl.classList.remove("hidden");
      inline5KWEl.classList.remove("hidden");
      inline7KWEl.classList.remove("hidden");
    }
    if (e.target === sinkBtn) {
      hotapEl.classList.remove("hidden");
      basicEl.classList.add("hidden");
      inline5KWEl.classList.remove("hidden");
      inline7KWEl.classList.remove("hidden");
    }
    if (e.target === homeBtn) {
      hotapEl.classList.remove("hidden");
      basicEl.classList.remove("hidden");
      inline5KWEl.classList.remove("hidden");
      inline7KWEl.classList.remove("hidden");
    }
    if (e.target === businessBtn) {
      hotapEl.classList.remove("hidden");
      basicEl.classList.remove("hidden");
      inline5KWEl.classList.remove("hidden");
      inline7KWEl.classList.remove("hidden");
    }
    heatersPage.scrollIntoView({ behavior: "smooth" });
  });
});

hotapEl.addEventListener("click", (e) => {
  // e.preventDefault();
});
