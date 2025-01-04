const cartProductListContainer = document.querySelector(
  ".cart-product-list-container"
)

import { cart } from "./add-to-cart.js"
import { getSelectedObjOfElement } from "./product.js"
const productList = function (cart) {
  cartProductListContainer.innerHTML = ""
  Object.keys(cart).forEach((id) => {
    getSelectedObjOfElement(id).then((obj) => {
      cartProductListContainer.innerHTML += `
    <div class="cart-product">
    

        <div class="cart-product-img-container container container-fluid">
        

            <img src="${obj.imgSrc}" alt="${
        obj.productName
      }" class="cart-product-img img img-fluid">

        </div>
        <div class="cart-product-info container container-fluid">
            <div class="cart-product-info-name container container fluid>
                <h6 class="cart-product-name">${obj.productName.replaceAll(
                  "_",
                  " "
                )}</h6>
            </div>
            <div class="cart-product-info-quantity container container-fluid">  
                <p class="cart-product-quantity">Кількість: ${cart[id]}</p>
            </div>
            <div class="cart-product-info-price container container-fluid">  
                <p class="cart-product-price">Ціна: ${parseInt(
                  obj.price
                ).toFixed(2)} грн</p>
            </div>  
        </div>
    </div>
    `
    })
  })
}
export { productList }
