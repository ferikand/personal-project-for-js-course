const heatersContainer = document.querySelector(".heatersContainer")
let applicationsToApply = localStorage.getItem("selectedSolution")
const grayBcg = document.querySelector(".grayBcg")
if (grayBcg)
  grayBcg.addEventListener("click", (e) => {
    if (e.target.closest("#shower")) {
      localStorage.setItem("selectedSolution", "shower")
      applicationsToApply = localStorage.getItem("selectedSolution")
      renderProducts(applicationsToApply)
    }
    if (e.target.closest("#sink")) {
      localStorage.setItem("selectedSolution", "sink")
      applicationsToApply = localStorage.getItem("selectedSolution")
      renderProducts(applicationsToApply)
    }
    if (e.target.closest("#home")) {
      localStorage.setItem("selectedSolution", "home")
      applicationsToApply = localStorage.getItem("selectedSolution")
      renderProducts(applicationsToApply)
    }
    if (e.target.closest("#business")) {
      localStorage.setItem("selectedSolution", "business")
      applicationsToApply = localStorage.getItem("selectedSolution")
      renderProducts(applicationsToApply)
    }
    heatersPage.scrollIntoView({ behavior: "smooth" })
  })

const renderProducts = (applicationsToApply) => {
  fetch("../api/products.json")
    .then((response) => response.json())
    .then((arr) => {
      heatersContainer.innerHTML = ""
      arr
        .filter((obj) => obj.application.includes(applicationsToApply))
        .forEach((obj) => {
          const heaterCardHtml = `
          <a data-id="${
            obj.id
          }" href="product.html" class="heatersLinkToItsPage">
            <div id="${obj.id}" class="heaterCard ${
            obj.id
          } container container-fluid">
              <img class="img-fluid heater-card heaterCardImg" src="${
                obj.imgSrc
              }" alt="${obj.imgAlt}" />
              <p>${obj.productName.replaceAll("_", " ")}</p>
            </div>
          </a>`
          heatersContainer.insertAdjacentHTML("beforeend", heaterCardHtml)
        })
    })
    .catch((error) => {
      heatersContainer.innerHTML = `<p>Помилка при завентаженні товарів: ${error.message}</p>`
    })
}

if (heatersContainer) {
  heatersContainer.addEventListener("click", (e) => {
    const selectedElement = e.target.closest("[data-id]")
    if (selectedElement) {
      localStorage.setItem(
        "selectedElement",
        selectedElement.getAttribute("data-id")
      )
    }
  })
}
if (heatersContainer) renderProducts(applicationsToApply)
