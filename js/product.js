const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

const selectedElementId = localStorage.getItem("selectedElement")
const productBigImg = document.querySelector(".productBigImg")
const productName = document.querySelector(".productInfoText h2")
const productInfoText_container = document.querySelector(
  ".productInfoText_container"
)
const price_container = document.querySelector(".price_container")

const getSelectedObjOfElement = (id) => {
  return fetch(`${API_BASE}/products`)
    .then((response) => response.json())
    .then((data) => data.find((el) => el.id === id))
}
if (selectedElementId)
  getSelectedObjOfElement(selectedElementId)
    .then((obj) => {
      productBigImg.setAttribute("src", obj.imgSrc)
      productBigImg.setAttribute("alt", obj.productName)
      productName.textContent = obj.productName.replaceAll("_", " ")
      productInfoText_container.innerHTML = ""
      productInfoText_container.innerText = obj.productInfo
      price_container.innerHTML = `<p>Ціна ${parseInt(obj.price).toFixed(
        2
      )} грн</p>`
    })
    .catch((error) => console.log(error.message))

export { getSelectedObjOfElement, selectedElementId, price_container }
