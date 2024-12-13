const variantBtns = document.querySelectorAll(".variantBtn");
const showerBtn = document.querySelector(".showerBtn");
const sinkBtn = document.querySelector(".sinkBtn");
const homeBtn = document.querySelector(".homeBtn");
const businessBtn = document.querySelector(".businessBtn");

const heatersPage = document.querySelector("#heatersPage");

const hotapEl = document.querySelector(".hotapEl");
const basicEl = document.querySelector(".basicEl");
const inline5KWEl = document.querySelector(".inline5KWEl");
const inline7KWEl = document.querySelector(".inline7KWEl");

const heatersContaner = document.querySelector(".heatersContaner");

variantBtns.forEach((node) => {
  node.addEventListener("click", (e) => {
    e.preventDefault();

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

if (heatersContaner) {
  heatersContaner.addEventListener("click", (e) => {
    const selectedElement = e.target.closest("[data-id]");

    if (selectedElement) {
      localStorage.setItem(
        "selectedElement",
        selectedElement.getAttribute("data-id")
      );
    }
  });
}
