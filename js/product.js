const selectedElementId = localStorage.getItem("selectedElement")
const productBigImg = document.querySelector(".productBigImg")
const productName = document.querySelector(".productInfoText h2")
const productInfoText_container = document.querySelector(
  ".productInfoText_container"
)

const getSelectedObjOfElement = (id) => {
  return fetch("../products.json")
    .then((response) => response.json())
    .then((data) => data.find((el) => el.id === id))
}
if (selectedElementId)
  getSelectedObjOfElement(selectedElementId)
    .then((obj) => {
      productBigImg.setAttribute("src", obj.imgSrc)
      productName.textContent = obj.productName.replaceAll("_", " ")
      productInfoText_container.innerHtml = obj.productInfo
    })
    .catch((error) => console.log(error.message))
