const cartProductListContainer = document.querySelector(
  ".cart-product-list-container"
)
import { cart } from "./add-to-cart.js"
import { getSelectedObjOfElement } from "./product.js"
const productList = function (cart) {
  cartProductListContainer.innerHTML = ""
  Object.keys(cart).forEach((id) => {
    getSelectedObjOfElement(id).then((obj) => {
      console.log(id)

      cartProductListContainer.innerHTML += `
    <div class="cart-product">
      <img src="${obj.imgSrc}" alt="${
        obj.productName
      }" class="cart-product-img img img-fluid">
      <div class="cart-product-info">
        <h3 class="cart-product-name">${obj.productName.replaceAll(
          "_",
          " "
        )}</h3>
        <p class="cart-product-quantity">Кількість: ${cart[id]}</p>
        <p class="cart-product-price">Ціна: ${parseInt(obj.price).toFixed(
          2
        )} грн</p>
      </div>
    </div>
    `
      console.log(obj)
    })
  })
}
export { productList }
