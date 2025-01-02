// const { response } = require("express")

const selectedElementId = localStorage.getItem("selectedElement")
const productBigImg = document.querySelector(".productBigImg")
const productName = document.querySelector(".productInfoText h2")
const productInfoText_container = document.querySelector(
  ".productInfoText_container"
)
const price_container = document.querySelector(".price_container")

// fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
//   .then((response) => response.json())
//   .then((data) => {
//     rate.unshift(data[24].rate)
//   })
//   .catch((error) => console.log(error.message))

// console.log(rate, exchangeRate)

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
      productInfoText_container.innerHTML = ""
      productInfoText_container.innerText = obj.productInfo
      price_container.innerHTML = `<p>Ціна ${obj.price.toFixed(2)} грн</p>`
    })
    .catch((error) => console.log(error.message))

export { getSelectedObjOfElement, selectedElementId, price_container }
