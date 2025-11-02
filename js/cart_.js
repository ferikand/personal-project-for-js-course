import { getSelectedObjOfElement } from "./product"
import { productCardInCartTemplate } from "./product-card-in-cart-template"

const cartProductListContainer = document.querySelector(
  ".cart-product-list-container"
)

const arrayOfProducts = []

console.log(arrayOfProducts)

export const getArrayofProducts = (cart) => {
  cartProductListContainer.innerHTML = ""
  Object.keys(cart).forEach((id) => {
    getSelectedObjOfElement(id).then((obj) => {
      arrayOfProducts.push(obj)
    })
  })
}
export const renderProductList = (arrayOfProducts) => {
  arrayOfProducts.forEach((obj) => {
    cartProductListContainer.insertAdjacentHTML(
      "beforeend",
      productCardInCartTemplate(obj)
    )
  })
}
